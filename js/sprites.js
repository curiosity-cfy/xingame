/**
 * sprites.js — 可替换的模型/精灵系统
 *
 * 所有游戏元素的绘制都集中在这里。每个精灵是一个普通对象：
 *   { draw(ctx, px, py, size, t) }  —— px/py 为像素坐标，size 为格子边长，t 为动画时间(ms)
 *
 * 后期更换模型的方式：
 *   1. 图片替换：把对应精灵改成 { image: 'assets/box.png', draw: drawImageSprite }
 *      或直接在 SPRITES.box.draw 里用 drawImage 画贴图（见文件底部示例）。
 *   2. 程序化绘制：修改下面的 draw 函数即可，不影响任何游戏逻辑。
 *
 * 当前配置：
 *   - 角色：像素风人物（根据参考照片生成，assets/player_*.png，四朝向，见下方“角色”节）
 *   - 箱子：经典木质货箱（程序化绘制：木板、包边、金属护角）
 *   - 墙壁 / 地板 / 目标点：程序化绘制
 */

const TAU = Math.PI * 2;

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ---------------------------------------------------------------- 地板 */
const floorSprite = {
  draw(ctx, px, py, s) {
    // 温暖的仓库地板：底色 + 细噪点纹理（用确定性伪随机保证不闪烁）
    ctx.fillStyle = '#c9a06b';
    ctx.fillRect(px, py, s, s);
    ctx.fillStyle = 'rgba(120, 80, 40, 0.10)';
    const cell = s / 8;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        // 基于格子坐标的稳定伪随机
        const h = ((px * 7 + i * 13 + py * 3 + j * 29) * 2654435761 >>> 0) % 100;
        if (h < 26) ctx.fillRect(px + i * cell, py + j * cell, cell * 0.55, cell * 0.55);
      }
    }
    // 板块分隔线
    ctx.strokeStyle = 'rgba(90, 58, 26, 0.16)';
    ctx.lineWidth = Math.max(1, s * 0.02);
    ctx.strokeRect(px + 0.5, py + 0.5, s - 1, s - 1);
  },
};

/* ---------------------------------------------------------------- 墙壁 */
const wallSprite = {
  draw(ctx, px, py, s) {
    // 深色石砖墙：主体 + 顶部高光 + 底部暗部 + 砖缝
    const g = ctx.createLinearGradient(px, py, px, py + s);
    g.addColorStop(0, '#7d8698');
    g.addColorStop(0.12, '#68738a');
    g.addColorStop(1, '#454e63');
    ctx.fillStyle = g;
    ctx.fillRect(px, py, s, s);
    // 砖缝
    ctx.strokeStyle = 'rgba(20, 26, 40, 0.35)';
    ctx.lineWidth = Math.max(1, s * 0.03);
    const bh = s / 2;
    ctx.beginPath();
    ctx.moveTo(px, py + bh);
    ctx.lineTo(px + s, py + bh);
    ctx.moveTo(px + s * 0.28, py);
    ctx.lineTo(px + s * 0.28, py + bh);
    ctx.moveTo(px + s * 0.72, py + bh);
    ctx.lineTo(px + s * 0.72, py + s);
    ctx.stroke();
    // 顶部高光
    ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.fillRect(px, py, s, s * 0.07);
    // 底部暗影
    ctx.fillStyle = 'rgba(0, 0, 0, 0.18)';
    ctx.fillRect(px, py + s * 0.92, s, s * 0.08);
  },
};

/* ---------------------------------------------------------------- 目标点 */
const goalSprite = {
  draw(ctx, px, py, s) {
    // 先画地板，再画目标标记（暖琥珀色菱形 + 圆环）
    floorSprite.draw(ctx, px, py, s);
    const cx = px + s / 2, cy = py + s / 2;
    const r = s * 0.30;
    ctx.save();
    ctx.strokeStyle = '#e8a33d';
    ctx.fillStyle = 'rgba(232, 163, 61, 0.30)';
    ctx.lineWidth = Math.max(1.5, s * 0.045);
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.72, 0, TAU);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.lineTo(cx + r, cy);
    ctx.lineTo(cx, cy + r);
    ctx.lineTo(cx - r, cy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  },
};

/* ---------------------------------------------------------------- 木箱（经典箱子） */
function drawCrate(ctx, px, py, s, opts = {}) {
  const onGoal = !!opts.onGoal;
  const pad = s * 0.055;
  const x = px + pad, y = py + pad, w = s - pad * 2, h = s - pad * 2;

  // 投影
  ctx.fillStyle = 'rgba(40, 24, 10, 0.30)';
  roundRect(ctx, x + s * 0.03, y + s * 0.05, w, h, s * 0.10);
  ctx.fill();

  // 箱体木质渐变
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  if (onGoal) {
    g.addColorStop(0, '#f7c873');
    g.addColorStop(0.5, '#e5a344');
    g.addColorStop(1, '#c9822a');
  } else {
    g.addColorStop(0, '#c98f4e');
    g.addColorStop(0.5, '#b07a3a');
    g.addColorStop(1, '#8f5f27');
  }
  ctx.fillStyle = g;
  roundRect(ctx, x, y, w, h, s * 0.09);
  ctx.fill();

  // 木纹（横向条纹）
  ctx.save();
  roundRect(ctx, x, y, w, h, s * 0.09);
  ctx.clip();
  ctx.strokeStyle = 'rgba(80, 48, 16, 0.20)';
  ctx.lineWidth = Math.max(1, s * 0.018);
  for (let i = 1; i <= 3; i++) {
    const ly = y + (h * i) / 4;
    ctx.beginPath();
    ctx.moveTo(x, ly);
    ctx.bezierCurveTo(x + w * 0.3, ly - s * 0.012, x + w * 0.6, ly + s * 0.012, x + w, ly);
    ctx.stroke();
  }
  ctx.restore();

  // 对角线包边（经典木箱的 X 或 H 形框架）
  ctx.strokeStyle = onGoal ? '#9c6412' : '#6e4517';
  ctx.lineWidth = Math.max(1.5, s * 0.045);
  ctx.beginPath();
  ctx.moveTo(x + w * 0.08, y + h * 0.08);
  ctx.lineTo(x + w * 0.92, y + h * 0.08);
  ctx.moveTo(x + w * 0.08, y + h * 0.92);
  ctx.lineTo(x + w * 0.92, y + h * 0.92);
  ctx.moveTo(x + w * 0.08, y + h * 0.08);
  ctx.lineTo(x + w * 0.08, y + h * 0.92);
  ctx.moveTo(x + w * 0.92, y + h * 0.08);
  ctx.lineTo(x + w * 0.92, y + h * 0.92);
  ctx.stroke();

  // 金属护角（四角）
  const corner = s * 0.16;
  ctx.fillStyle = onGoal ? '#d8b45a' : '#9aa2ad';
  ctx.strokeStyle = 'rgba(30, 34, 42, 0.55)';
  ctx.lineWidth = Math.max(1, s * 0.02);
  for (const [cx, cy, sx, sy] of [
    [x, y, 1, 1], [x + w, y, -1, 1],
    [x, y + h, 1, -1], [x + w, y + h, -1, -1],
  ]) {
    ctx.beginPath();
    ctx.moveTo(cx, cy + sy * corner);
    ctx.lineTo(cx + sx * corner * 0.45, cy);
    ctx.lineTo(cx + sx * corner, cy + sy * corner * 0.45);
    ctx.lineTo(cx + sx * corner, cy);
    ctx.lineTo(cx, cy);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // 顶部高光
  ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
  roundRect(ctx, x + w * 0.1, y + h * 0.06, w * 0.8, h * 0.12, s * 0.04);
  ctx.fill();

  // 入位时的柔和光晕
  if (onGoal) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const rg = ctx.createRadialGradient(x + w / 2, y + h / 2, s * 0.1, x + w / 2, y + h / 2, s * 0.62);
    rg.addColorStop(0, 'rgba(255, 214, 120, 0.35)');
    rg.addColorStop(1, 'rgba(255, 214, 120, 0)');
    ctx.fillStyle = rg;
    ctx.fillRect(px, py, s, s);
    ctx.restore();
  }
}

const boxSprite = {
  draw(ctx, px, py, s) { drawCrate(ctx, px, py, s, { onGoal: false }); },
};
const boxOnGoalSprite = {
  draw(ctx, px, py, s) { drawCrate(ctx, px, py, s, { onGoal: true }); },
};

/* ---------------------------------------------------------------- 角色（像素人物） */
/**
 * 角色模型：根据参考照片生成的像素风人物（红格子贝雷帽 + 圆眼镜 + 灰卫衣 + 斜挎包）。
 * 素材在 assets/ 下：
 *   普通朝向：
 *     player_front.png      正面（向下走）
 *     player_back.png       背面（向上走）
 *     player_side.png       侧面朝右（向右走）
 *     player_side_left.png  侧面朝左（镜像，向左走）
 *   发力朝向（把箱子推上目标点时播放约 0.7 秒）：
 *     player_push_front.png       正面发力（鼓腮、双臂前推）
 *     player_push_side.png        侧面发力（弓步、单臂前推）
 *     player_push_side_left.png   侧面发力（镜像）
 *   （背面看不到表情，不单独做发力图，向上推时沿用普通背面图）
 * 图片加载完成前先画色块占位，避免闪白。
 */
function loadImg(src) {
  const img = new Image();
  img.src = src;
  return img;
}

function imgReady(img) {
  return img.complete && img.naturalWidth > 0;
}

const playerImages = {
  front: loadImg('assets/player_front.png'),
  back: loadImg('assets/player_back.png'),
  sideRight: loadImg('assets/player_side.png'),
  sideLeft: loadImg('assets/player_side_left.png'),
};

const playerPushImages = {
  front: loadImg('assets/player_push_front.png'),
  sideRight: loadImg('assets/player_push_side.png'),
  sideLeft: loadImg('assets/player_push_side_left.png'),
};

/** 按朝向（及是否发力）挑选角色图 */
function pickPlayerImage(dir, glory) {
  if (dir.y < 0) return playerImages.back; // 背面无发力图
  if (dir.x > 0) {
    return glory && imgReady(playerPushImages.sideRight) ? playerPushImages.sideRight : playerImages.sideRight;
  }
  if (dir.x < 0) {
    return glory && imgReady(playerPushImages.sideLeft) ? playerPushImages.sideLeft : playerImages.sideLeft;
  }
  return glory && imgReady(playerPushImages.front) ? playerPushImages.front : playerImages.front;
}

const playerSprite = {
  draw(ctx, px, py, s, t, dir = { x: 0, y: 1 }, glory = false) {
    const img = pickPlayerImage(dir, glory);

    if (imgReady(img)) {
      // 像素素材：关闭平滑，保持像素颗粒清晰
      const prev = ctx.imageSmoothingEnabled;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, px, py, s, s);
      ctx.imageSmoothingEnabled = prev;
      return;
    }

    // ---- 回退：色块占位（图片未加载完成时）----
    const pad = s * 0.14;
    const x = px + pad, y = py + pad, w = s - pad * 2, h = s - pad * 2;
    const cx = x + w / 2, cy = y + h / 2;
    ctx.fillStyle = 'rgba(40, 24, 10, 0.28)';
    ctx.beginPath();
    ctx.ellipse(cx + s * 0.03, y + h + s * 0.02, w * 0.42, h * 0.12, 0, 0, TAU);
    ctx.fill();
    const g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, '#ff8a7a');
    g.addColorStop(0.55, '#e85d4e');
    g.addColorStop(1, '#c9402f');
    ctx.fillStyle = g;
    roundRect(ctx, x, y, w, h, s * 0.26);
    ctx.fill();
    ctx.strokeStyle = 'rgba(110, 30, 20, 0.55)';
    ctx.lineWidth = Math.max(1.5, s * 0.035);
    ctx.stroke();
    // 按朝向偏移的眼睛，让占位块也有方向感
    const ex = dir.x * w * 0.10, ey = dir.y * h * 0.10;
    const er = w * 0.085;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx - w * 0.17 + ex, cy - h * 0.08 + ey, er, 0, TAU);
    ctx.arc(cx + w * 0.17 + ex, cy - h * 0.08 + ey, er, 0, TAU);
    ctx.fill();
    ctx.fillStyle = '#2a2f3a';
    const pr = er * 0.52;
    ctx.beginPath();
    ctx.arc(cx - w * 0.17 + ex * 1.6, cy - h * 0.08 + ey * 1.6, pr, 0, TAU);
    ctx.arc(cx + w * 0.17 + ex * 1.6, cy - h * 0.08 + ey * 1.6, pr, 0, TAU);
    ctx.fill();
  },
};

/* ---------------------------------------------------------------- 注册表 */
export const SPRITES = {
  floor: floorSprite,
  wall: wallSprite,
  goal: goalSprite,
  box: boxSprite,
  boxOnGoal: boxOnGoalSprite,
  player: playerSprite,
};

/**
 * 更换模型的方式（角色已换成图片模型，此示例供换箱子/其他元素参考）：
 *
 *   function imageSprite(img) {
 *     return {
 *       draw(ctx, px, py, s) {
 *         const prev = ctx.imageSmoothingEnabled;
 *         ctx.imageSmoothingEnabled = false;   // 像素素材保持锐利
 *         ctx.drawImage(img, px, py, s, s);
 *         ctx.imageSmoothingEnabled = prev;
 *       }
 *     };
 *   }
 *   const crateImg = new Image();
 *   crateImg.src = 'assets/crate.png';
 *   crateImg.onload = () => { SPRITES.box = imageSprite(crateImg); };
 */
