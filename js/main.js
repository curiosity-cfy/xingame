/**
 * main.js — 启动与 UI 装配
 */
import { LEVELS, LEVELS_META } from './levels.js';
import { SokobanGame } from './game.js';
import { Renderer } from './renderer.js';
import * as Sfx from './audio.js';

/* ------------------------------------------------------------ 元素 */
const boardArea = document.querySelector('.board-area');
const boardWrap = document.getElementById('board-wrap');
const canvas = document.getElementById('board');
const levelListEl = document.getElementById('level-list');
const levelTitleEl = document.getElementById('level-title');
const moveCountEl = document.getElementById('move-count');
const pushCountEl = document.getElementById('push-count');
const boxCountEl = document.getElementById('box-count');
const progressBarEl = document.getElementById('progress-bar');
const progressTextEl = document.getElementById('progress-text');
const btnUndo = document.getElementById('btn-undo');
const btnRestart = document.getElementById('btn-restart');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnMute = document.getElementById('btn-mute');
const winOverlay = document.getElementById('win-overlay');
const winStats = document.getElementById('win-stats');
const btnWinNext = document.getElementById('btn-win-next');
const btnWinReplay = document.getElementById('btn-win-replay');
const dpad = document.getElementById('dpad');

/* ------------------------------------------------------------ 状态 */
const STORAGE_KEY = 'xingame.sokoban.progress.v1';
let progress = loadProgress(); // { [levelIndex]: true }
let current = loadCurrent();
let game = null;
let renderer = null;
let winTimer = null;

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch { /* 忽略 */ }
}
function loadCurrent() {
  const n = parseInt(localStorage.getItem(STORAGE_KEY + '.current'), 10);
  return Number.isInteger(n) && n >= 0 && n < LEVELS.length ? n : 0;
}
function saveCurrent() {
  try { localStorage.setItem(STORAGE_KEY + '.current', String(current)); } catch { /* 忽略 */ }
}

/* ------------------------------------------------------------ 关卡加载 */
function loadLevel(index, { silent = false } = {}) {
  clearTimeout(winTimer);
  current = Math.max(0, Math.min(LEVELS.length - 1, index));
  saveCurrent();
  const lv = LEVELS[current];
  game = new SokobanGame(lv.map, onGameChange);
  renderer = new Renderer(canvas, game);
  renderer.resetView();
  renderer.resize(boardArea);
  levelTitleEl.textContent = `${lv.name} · ${LEVELS_META.set}`;
  updateCounters(game.snapshot());
  updateLevelList();
  hideWin();
  if (!silent) Sfx.click();
}

function onGameChange(state) {
  // 注意：SokobanGame 构造期间也会触发一次 onChange，此时 game 尚未赋值，
  // 必须守卫；初始 UI 由 loadLevel 在构造完成后显式更新。
  if (!game) return;
  updateCounters(state);
  if (renderer) renderer.syncFromGame();
}

function updateCounters(state) {
  moveCountEl.textContent = state.moves;
  pushCountEl.textContent = state.pushes;
  const done = state.boxes.filter((k) => game.goals.has(k)).length;
  boxCountEl.textContent = `${done}/${game.goals.size}`;
  btnUndo.disabled = !game.canUndo;
}

/* ------------------------------------------------------------ 操作 */
function doMove(dx, dy) {
  const r = game.move(dx, dy);
  switch (r) {
    case 'moved': Sfx.step(); break;         // 吧唧！
    case 'pushed':
      Sfx.push(); Sfx.step();
      // 箱子推上目标点：入位音效 + 角色发力动作
      if (game.lastPushOnGoal) {
        Sfx.goalIn();
        renderer.celebratePush(700);
      }
      break;
    case 'won':
      Sfx.win();
      // 先看 0.7 秒发力姿势和箱子光晕，再弹过关卡片
      renderer.celebratePush(700);
      clearTimeout(winTimer);
      winTimer = setTimeout(showWin, 650);
      break;
    case 'blocked': Sfx.bump(); break;
  }
}

function doUndo() {
  if (game.undo()) Sfx.click(); // 状态更新由 onGameChange 统一处理
}

function doRestart() {
  clearTimeout(winTimer);
  game.reset();
  renderer.resetView();
  updateCounters(game.snapshot());
  Sfx.click();
  hideWin();
}

function gotoLevel(i) { loadLevel(i); }

/* ------------------------------------------------------------ 过关界面 */
function showWin() {
  progress[current] = true;
  saveProgress();
  updateLevelList();
  updateProgress();
  winStats.textContent = `用时 ${game.moves} 步 · 推动 ${game.pushes} 次`;
  winOverlay.classList.add('show');
  btnWinNext.disabled = current >= LEVELS.length - 1;
}
function hideWin() { winOverlay.classList.remove('show'); }

/* ------------------------------------------------------------ 关卡列表 */
function updateLevelList() {
  const done = Object.keys(progress).length;
  progressTextEl.textContent = `已通关 ${done} / ${LEVELS.length}`;
  progressBarEl.style.width = `${(done / LEVELS.length) * 100}%`;
  // 只重建一次 DOM，之后仅更新 class
  if (levelListEl.childElementCount !== LEVELS.length) {
    const frag = document.createDocumentFragment();
    LEVELS.forEach((lv, i) => {
      const btn = document.createElement('button');
      btn.className = 'level-item';
      btn.dataset.index = String(i);
      btn.innerHTML = `<span class="lv-num">${i + 1}</span><span class="lv-state"></span>`;
      btn.title = lv.name;
      btn.addEventListener('click', () => gotoLevel(i));
      frag.appendChild(btn);
    });
    levelListEl.appendChild(frag);
  }
  [...levelListEl.children].forEach((btn, i) => {
    btn.classList.toggle('done', !!progress[i]);
    btn.classList.toggle('current', i === current);
    btn.querySelector('.lv-state').textContent = progress[i] ? '✓' : (i === current ? '▶' : '');
  });
  // 滚动到当前关
  const cur = levelListEl.children[current];
  if (cur) cur.scrollIntoView({ block: 'nearest' });
}
function updateProgress() { updateLevelList(); }

/* ------------------------------------------------------------ 键盘 */
window.addEventListener('keydown', (e) => {
  if (e.repeat && e.key !== 'z' && e.key !== 'Z') { /* 允许长按连续走 */ }
  Sfx.unlock();
  const k = e.key;
  if (k === 'ArrowUp' || k === 'w' || k === 'W') { doMove(0, -1); e.preventDefault(); }
  else if (k === 'ArrowDown' || k === 's' || k === 'S') { doMove(0, 1); e.preventDefault(); }
  else if (k === 'ArrowLeft' || k === 'a' || k === 'A') { doMove(-1, 0); e.preventDefault(); }
  else if (k === 'ArrowRight' || k === 'd' || k === 'D') { doMove(1, 0); e.preventDefault(); }
  else if (k === 'z' || k === 'Z') { doUndo(); }
  else if (k === 'r' || k === 'R') { doRestart(); }
  else if (k === 'n' || k === 'N') { gotoLevel(current + 1); }
  else if (k === 'p' || k === 'P') { gotoLevel(current - 1); }
  else if (k === 'm' || k === 'M') { toggleMute(); }
});

/* ------------------------------------------------------------ 触屏滑动 */
let touchStart = null;
canvas.addEventListener('touchstart', (e) => {
  Sfx.unlock();
  const t = e.touches[0];
  touchStart = { x: t.clientX, y: t.clientY };
}, { passive: true });
canvas.addEventListener('touchend', (e) => {
  if (!touchStart) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStart.x;
  const dy = t.clientY - touchStart.y;
  touchStart = null;
  if (Math.hypot(dx, dy) < 24) return;
  if (Math.abs(dx) > Math.abs(dy)) doMove(dx > 0 ? 1 : -1, 0);
  else doMove(0, dy > 0 ? 1 : -1);
}, { passive: true });

/* ------------------------------------------------------------ 屏幕方向盘（移动端） */
if (dpad) {
  dpad.querySelectorAll('button[data-dir]').forEach((btn) => {
    btn.addEventListener('click', () => {
      Sfx.unlock();
      const [dx, dy] = btn.dataset.dir.split(',').map(Number);
      doMove(dx, dy);
    });
  });
}

/* ------------------------------------------------------------ 按钮 */
btnUndo.addEventListener('click', () => { Sfx.unlock(); doUndo(); });
btnRestart.addEventListener('click', () => { Sfx.unlock(); doRestart(); });
btnPrev.addEventListener('click', () => { Sfx.unlock(); gotoLevel(current - 1); });
btnNext.addEventListener('click', () => { Sfx.unlock(); gotoLevel(current + 1); });
btnWinNext.addEventListener('click', () => { Sfx.unlock(); gotoLevel(current + 1); });
btnWinReplay.addEventListener('click', () => { Sfx.unlock(); doRestart(); });

function toggleMute() {
  const m = !Sfx.isMuted();
  Sfx.setMuted(m);
  btnMute.textContent = m ? '🔇 音效关' : '🔊 音效开';
  btnMute.classList.toggle('muted', m);
  if (!m) Sfx.click();
}
btnMute.addEventListener('click', () => { Sfx.unlock(); toggleMute(); });

/* ------------------------------------------------------------ 自适应 */
const ro = new ResizeObserver(() => { if (renderer) renderer.resize(boardArea); });
ro.observe(boardWrap);
window.addEventListener('resize', () => { if (renderer) renderer.resize(boardArea); });

/* ------------------------------------------------------------ 启动 */
document.getElementById('meta-set').textContent =
  `${LEVELS_META.set} · ${LEVELS_META.count} 关 · 关卡作者: ${LEVELS_META.author}`;
loadLevel(current, { silent: true });
