/**
 * renderer.js — Canvas 渲染器
 *
 * 职责：把 SokobanGame 的状态画到 canvas 上，带平滑移动动画。
 * 模型全部来自 sprites.js 的 SPRITES 注册表——换模型只改那里。
 */
import { SPRITES } from './sprites.js';

const MOVE_MS = 130; // 单格移动动画时长
const PUSH_GLORY_MS = 700; // 推箱入位后发力姿势持续时间

export class Renderer {
  constructor(canvas, game) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.game = game;
    this.tile = 48;
    this.playerVis = { x: game.player.x, y: game.player.y };
    this.playerFrom = { x: game.player.x, y: game.player.y };
    this.moveT0 = 0;
    this.moving = false;
    this.boxVis = new Map(); // boxKey -> {x, y, fromX, fromY, t0}
    this.pushUntil = 0;      // 发力动作展示截止时间（performance.now 毫秒）
    this._syncBoxesInstant();
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
  }

  /** 触发一次“发力”动作展示（推箱入位时调用） */
  celebratePush(ms = 700) {
    this.pushUntil = performance.now() + ms;
  }

  _syncBoxesInstant() {
    this.boxVis.clear();
    for (const k of this.game.boxes) {
      const x = k % this.game.w;
      const y = Math.floor(k / this.game.w);
      this.boxVis.set(k, { x, y, fromX: x, fromY: y, t0: 0 });
    }
  }

  /** 关卡切换/重开时调用：立即对齐到新状态 */
  resetView() {
    this.playerVis = { x: this.game.player.x, y: this.game.player.y };
    this.playerFrom = { ...this.playerVis };
    this.moving = false;
    this.pushUntil = 0;
    this._syncBoxesInstant();
  }

  /** 游戏状态变化后调用：启动补间动画 */
  syncFromGame() {
    const g = this.game;
    // 玩家补间
    if (g.player.x !== this.playerVis.x || g.player.y !== this.playerVis.y) {
      this.playerFrom = { ...this.playerVis };
      this.playerVis = { x: g.player.x, y: g.player.y };
      this.moveT0 = performance.now();
      this.moving = true;
    }
    // 箱子补间：找出新旧差集（每步最多一次推箱）
    const oldKeys = new Set(this.boxVis.keys());
    const newKeys = new Set(g.boxes);
    for (const k of newKeys) {
      if (!oldKeys.has(k)) {
        // 新箱子：找来源格（旧有、新无）
        let src = null;
        for (const ok of oldKeys) if (!newKeys.has(ok)) src = ok;
        const x = k % g.w, y = Math.floor(k / g.w);
        if (src != null) {
          const sx = src % g.w, sy = Math.floor(src / g.w);
          this.boxVis.delete(src);
          this.boxVis.set(k, { x, y, fromX: sx, fromY: sy, t0: performance.now() });
        } else {
          this.boxVis.set(k, { x, y, fromX: x, fromY: y, t0: 0 });
        }
      }
    }
    for (const ok of oldKeys) {
      if (!newKeys.has(ok) && !this.boxVis.has(ok)) {
        // 来源格已被删除（上面已处理），无需操作
      }
    }
  }

  /** 根据关卡尺寸和可用区域计算格子边长并调整画布 */
  resize(container) {
    const g = this.game;
    const cs = getComputedStyle(container);
    const availW = container.clientWidth - parseFloat(cs.paddingLeft || 0) - parseFloat(cs.paddingRight || 0);
    const availH = container.clientHeight - parseFloat(cs.paddingTop || 0) - parseFloat(cs.paddingBottom || 0);
    if (availW <= 0 || availH <= 0) return;
    // tile 下限 6px：超宽关卡（如 30 格的 Dungeon）在小屏上自动缩小而不是溢出
    const tile = Math.max(6, Math.floor(Math.min(availW / g.w, availH / g.h)));
    this.tile = tile;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.round(tile * g.w * dpr);
    this.canvas.height = Math.round(tile * g.h * dpr);
    this.canvas.style.width = tile * g.w + 'px';
    this.canvas.style.height = tile * g.h + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  _ease(t) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; }

  _loop(now) {
    const g = this.game;
    const s = this.tile;
    const ctx = this.ctx;

    if (this.moving && now - this.moveT0 > MOVE_MS) this.moving = false;
    const tp = this.moving ? this._ease(Math.min(1, (now - this.moveT0) / MOVE_MS)) : 1;

    // ---- 地板 ----
    for (let y = 0; y < g.h; y++) {
      for (let x = 0; x < g.w; x++) {
        const k = key2(x, y, g.w);
        if (g.walls.has(k)) SPRITES.wall.draw(ctx, x * s, y * s, s);
        else if (g.goals.has(k)) SPRITES.goal.draw(ctx, x * s, y * s, s);
        else SPRITES.floor.draw(ctx, x * s, y * s, s);
      }
    }

    // ---- 箱子 ----
    for (const [k, v] of this.boxVis) {
      const tb = this.moving ? this._ease(Math.min(1, (now - v.t0) / MOVE_MS)) : 1;
      const bx = (v.fromX + (v.x - v.fromX) * tb) * s;
      const by = (v.fromY + (v.y - v.fromY) * tb) * s;
      const onGoal = g.goals.has(k);
      const sprite = onGoal ? SPRITES.boxOnGoal : SPRITES.box;
      if (g.won) {
        // 过关庆祝：箱子轻轻脉动
        const pulse = 1 + Math.sin(now / 180 + k) * 0.05;
        ctx.save();
        ctx.translate(bx + s / 2, by + s / 2);
        ctx.scale(pulse, pulse);
        ctx.translate(-(bx + s / 2), -(by + s / 2));
        sprite.draw(ctx, bx, by, s);
        ctx.restore();
      } else {
        sprite.draw(ctx, bx, by, s);
      }
    }

    // ---- 玩家 ----
    const px = (this.playerFrom.x + (this.playerVis.x - this.playerFrom.x) * tp) * s;
    const py = (this.playerFrom.y + (this.playerVis.y - this.playerFrom.y) * tp) * s;
    // 发力窗口内：切换发力姿势 + 轻微弹跳
    const glory = now < this.pushUntil;
    let scale = 1;
    if (glory) {
      const k = (this.pushUntil - now) / PUSH_GLORY_MS; // 1 -> 0
      scale = 1 + 0.07 * Math.sin(k * Math.PI);
    }
    ctx.save();
    ctx.translate(px + s / 2, py + s / 2);
    ctx.scale(scale, scale);
    ctx.translate(-(px + s / 2), -(py + s / 2));
    SPRITES.player.draw(ctx, px, py, s, now, g.dir, glory);
    ctx.restore();

    requestAnimationFrame(this._loop);
  }
}

function key2(x, y, w) { return x + y * w; }
