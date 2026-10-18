/**
 * audio.js — Web Audio 实时音效合成（零外部音频文件）
 *
 * 音效清单：
 *   step()    走路“吧唧”声——每走一步触发，带通噪声 + 低频 blop，随机音高，左右脚交替
 *   push()    推箱子——低频摩擦 + 木栅 creak
 *   goalIn()  箱子入位——清脆双音 blip
 *   win()     过关——四音上行小旋律
 *   bump()    撞墙——闷响
 *   click()   UI 点击
 *
 * 浏览器要求 AudioContext 必须在用户手势后启动，因此提供 unlock()。
 */

let ctx = null;
let master = null;
let muted = false;
let noiseBuffer = null;
let stepPanSide = 1; // 左右脚交替

function ensureCtx() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = muted ? 0 : 0.9;
  master.connect(ctx.destination);
  // 1 秒白噪声缓冲区，供所有噪声类音效复用
  noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return ctx;
}

/** 在首次用户手势时调用，恢复/创建 AudioContext */
export function unlock() {
  const c = ensureCtx();
  if (c && c.state === 'suspended') c.resume();
}

export function setMuted(m) {
  muted = m;
  if (master) master.gain.setTargetAtTime(m ? 0 : 0.9, ctx.currentTime, 0.02);
}

export function isMuted() {
  return muted;
}

function env(gainNode, t0, peak, attack, decay) {
  const g = gainNode.gain;
  g.setValueAtTime(0.0001, t0);
  g.exponentialRampToValueAtTime(peak, t0 + attack);
  g.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
}

/* ------------------------------------------------------------ 吧唧踩踏声 */
/**
 * “吧唧吧唧”——一步一声。
 * 构成：带通滤波白噪声（肉感 squish）+ 低频正弦 blop（黏弹感），
 * 每次随机音高与时长，左右声道交替，走起来才有“吧唧吧唧”的节奏。
 */
export function step() {
  const c = ensureCtx();
  if (!c || muted) return;
  const t = c.currentTime;

  // --- squish：带通噪声 ---
  const src = c.createBufferSource();
  src.buffer = noiseBuffer;
  src.playbackRate.value = 0.85 + Math.random() * 0.4;
  const bp = c.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = 550 + Math.random() * 850;   // 550~1400Hz 随机
  bp.Q.value = 1.1 + Math.random() * 0.8;
  const ng = c.createGain();
  env(ng, t, 0.5, 0.006, 0.055 + Math.random() * 0.03);
  src.connect(bp).connect(ng).connect(master);
  src.start(t);
  src.stop(t + 0.14);

  // --- blop：低频黏弹感 ---
  const osc = c.createOscillator();
  osc.type = 'sine';
  const f0 = 130 + Math.random() * 110;             // 130~240Hz 随机
  osc.frequency.setValueAtTime(f0 * 1.6, t);
  osc.frequency.exponentialRampToValueAtTime(f0, t + 0.07);
  const og = c.createGain();
  env(og, t, 0.34, 0.005, 0.06);
  osc.connect(og).connect(master);
  osc.start(t);
  osc.stop(t + 0.12);

  // --- 左右脚交替（StereoPannerNode，不支持时静默降级） ---
  if (c.createStereoPanner) {
    const panner = c.createStereoPanner();
    panner.pan.value = stepPanSide * 0.38;
    stepPanSide *= -1;
    ng.connect(panner);
    og.connect(panner);
    panner.connect(master);
  }
}

/* ------------------------------------------------------------ 推箱声 */
export function push() {
  const c = ensureCtx();
  if (!c || muted) return;
  const t = c.currentTime;

  // 低频摩擦噪声
  const src = c.createBufferSource();
  src.buffer = noiseBuffer;
  src.playbackRate.value = 0.5;
  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 320 + Math.random() * 140;
  const g = c.createGain();
  env(g, t, 0.42, 0.02, 0.16);
  src.connect(lp).connect(g).connect(master);
  src.start(t);
  src.stop(t + 0.24);

  // 木栅 creak：锯齿波下滑
  const osc = c.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150 + Math.random() * 60, t);
  osc.frequency.exponentialRampToValueAtTime(85, t + 0.18);
  const og = c.createGain();
  env(og, t, 0.10, 0.03, 0.15);
  const olp = c.createBiquadFilter();
  olp.type = 'lowpass';
  olp.frequency.value = 700;
  osc.connect(olp).connect(og).connect(master);
  osc.start(t);
  osc.stop(t + 0.22);
}

/* ------------------------------------------------------------ 箱子入位 */
export function goalIn() {
  const c = ensureCtx();
  if (!c || muted) return;
  const t = c.currentTime;
  [[660, 0], [880, 0.09]].forEach(([freq, dt]) => {
    const osc = c.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const g = c.createGain();
    env(g, t + dt, 0.28, 0.008, 0.14);
    osc.connect(g).connect(master);
    osc.start(t + dt);
    osc.stop(t + dt + 0.2);
  });
}

/* ------------------------------------------------------------ 过关旋律 */
export function win() {
  const c = ensureCtx();
  if (!c || muted) return;
  const t = c.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    const dt = i * 0.11;
    const osc = c.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const g = c.createGain();
    env(g, t + dt, 0.3, 0.01, 0.32);
    osc.connect(g).connect(master);
    osc.start(t + dt);
    osc.stop(t + dt + 0.5);
  });
}

/* ------------------------------------------------------------ 撞墙闷响 */
export function bump() {
  const c = ensureCtx();
  if (!c || muted) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(120, t);
  osc.frequency.exponentialRampToValueAtTime(60, t + 0.09);
  const g = c.createGain();
  env(g, t, 0.32, 0.004, 0.09);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + 0.12);
}

/* ------------------------------------------------------------ UI 点击 */
export function click() {
  const c = ensureCtx();
  if (!c || muted) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  osc.type = 'square';
  osc.frequency.value = 880;
  const g = c.createGain();
  env(g, t, 0.06, 0.002, 0.045);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + 0.06);
}
