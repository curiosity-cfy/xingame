/**
 * game.js — 推箱子核心逻辑（与渲染、音频完全解耦）
 *
 * 对外暴露：
 *   parseLevel(xsbText)     解析关卡
 *   class SokobanGame       游戏实例：move/tryMove/undo/restart/isSolved/...
 *
 * 坐标约定：x 向右，y 向下；格子为逻辑单位。
 */

export function parseLevel(text) {
  const rows = text.replace(/\r/g, '').split('\n');
  const w = Math.max(...rows.map((r) => r.length));
  const walls = new Set();
  const goals = new Set();
  const boxes = new Set();
  let player = null;
  for (let y = 0; y < rows.length; y++) {
    const row = rows[y].padEnd(w, ' ');
    for (let x = 0; x < w; x++) {
      switch (row[x]) {
        case '#': walls.add(x + y * w); break;
        case '.': goals.add(x + y * w); break;
        case '$': boxes.add(x + y * w); break;
        case '*': boxes.add(x + y * w); goals.add(x + y * w); break;
        case '@': player = { x, y }; break;
        case '+': player = { x, y }; goals.add(x + y * w); break;
        default: break; // 空格 = 地板
      }
    }
  }
  return { w, h: rows.length, walls, goals, boxes, player };
}

const key = (x, y, w) => x + y * w;

export class SokobanGame {
  /**
   * @param {string} mapText XSB 关卡文本
   * @param {(state) => void} onChange 每次状态变化后回调（用于音效/UI）
   */
  constructor(mapText, onChange = () => {}) {
    this.onChange = onChange;
    this.load(mapText);
  }

  load(mapText) {
    const lv = parseLevel(mapText);
    this.w = lv.w;
    this.h = lv.h;
    this.walls = lv.walls;
    this.goals = lv.goals;
    this.startBoxes = [...lv.boxes];
    this.startPlayer = { ...lv.player };
    this.reset();
  }

  reset() {
    this.boxes = new Set(this.startBoxes);
    this.player = { ...this.startPlayer };
    this.dir = { x: 0, y: 1 };
    this.moves = 0;
    this.pushes = 0;
    this.history = [];
    this.won = false;
    this.lastPushOnGoal = false;
    this.onChange(this.snapshot());
  }

  snapshot() {
    return {
      player: { ...this.player },
      boxes: [...this.boxes],
      moves: this.moves,
      pushes: this.pushes,
      won: this.won,
    };
  }

  isWall(x, y) { return this.walls.has(key(x, y, this.w)); }
  isBox(x, y) { return this.boxes.has(key(x, y, this.w)); }
  isGoal(x, y) { return this.goals.has(key(x, y, this.w)); }

  isSolved() {
    for (const g of this.goals) {
      if (!this.boxes.has(g)) return false;
    }
    return true;
  }

  /**
   * 尝试向 (dx,dy) 方向移动/推箱。
   * @returns {'moved'|'pushed'|'blocked'|'won'} 本次操作结果
   */
  move(dx, dy) {
    if (this.won) return 'blocked';
    this.dir = { x: dx, y: dy };
    const nx = this.player.x + dx;
    const ny = this.player.y + dy;

    if (this.isWall(nx, ny)) return 'blocked';

    let result = 'moved';
    if (this.isBox(nx, ny)) {
      const bx = nx + dx;
      const by = ny + dy;
      if (this.isWall(bx, by) || this.isBox(bx, by)) return 'blocked';
      // 记录历史用于撤销
      this.history.push({
        player: { ...this.player },
        boxes: [...this.boxes],
        moves: this.moves,
        pushes: this.pushes,
      });
      this.boxes.delete(key(nx, ny, this.w));
      this.boxes.add(key(bx, by, this.w));
      this.pushes++;
      result = 'pushed';
      // 本次推箱是否把箱子送上了目标点（用于角色发力动画与入位音效）
      this.lastPushOnGoal = this.goals.has(key(bx, by, this.w));
    } else {
      this.history.push({
        player: { ...this.player },
        boxes: [...this.boxes],
        moves: this.moves,
        pushes: this.pushes,
      });
    }

    this.player = { x: nx, y: ny };
    this.moves++;

    if (this.isSolved()) {
      this.won = true;
      result = 'won';
    }
    this.onChange(this.snapshot());
    return result;
  }

  /** 撤销一步 */
  undo() {
    const prev = this.history.pop();
    if (!prev) return false;
    this.player = prev.player;
    this.boxes = new Set(prev.boxes);
    this.moves = prev.moves;
    this.pushes = prev.pushes;
    this.won = false;
    this.onChange(this.snapshot());
    return true;
  }

  get canUndo() { return this.history.length > 0; }
}
