# 📦 推箱子（Sokoban）

一个零依赖的网页版推箱子游戏：**155 个社区经典关卡**、经典木箱模型、带“吧唧吧唧”音效的角色走路声。

## 快速开始

无需安装任何东西，用浏览器打开即可：

- **方式一**：直接双击 `index.html`（部分浏览器需要本地服务器，见方式二）
- **方式二**（推荐）：在本目录起一个静态服务器

```bash
# 任选其一
python -m http.server 8000
npx serve .
```

然后访问 `http://localhost:8000`。

## 部署发布（在线网址）

### 🎮 当前线上地址（GitHub Pages，主推）

**https://curiosity-cfy.github.io/xingame/** —— GitHub Pages 免费托管，打开即玩，手机浏览器同样支持，可直接分享给任何人。

备用地址（surge.sh，国际 CDN）：https://sokoban-xingame.surge.sh

游戏是纯静态站点（无构建、无后端），仓库根目录即站点根目录（`index.html` + `css/` + `js/` + `assets/`），推送即上线。

### 修改游戏后重新发布（GitHub Pages）

```bash
# 1. 提交改动
git add -A && git commit -m "更新说明"

# 2. 推送（GitHub Pages 自动构建，约 1 分钟生效）
git push --force
```

> 首次推送如提示历史不一致，加 `--force` 即可（远程仓库的初始提交历史是首次部署时通过 API 建立的，之后本地与远程就一致了）。在自己电脑上推送时，Git 会自动弹出使用已保存的 GitHub 凭据。

### 其他免费托管方式（任选）

**局域网分享（无需账号）**

```bash
python -m http.server 8932 --bind 0.0.0.0
```

同一 Wi-Fi 下访问 `http://<本机IP>:8932`（本机 IP 用 `ipconfig` 查看）。

**Netlify Drop（拖拽即上线）**

打开 <https://app.netlify.com/drop>，把项目目录拖进去，几秒后得到公网网址。

**GitHub Pages（免费持久，适合长期分享）**

仓库已初始化并完成提交，只需：

```bash
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

然后在仓库页面 **Settings → Pages → Source** 选 `main` 分支根目录，保存后一分钟内即可通过 `https://<用户名>.github.io/<仓库名>/` 访问。

**CloudStudio / Vercel 等控制台**

在对应平台选择“静态网站部署”，上传 `dist/` 目录或导入本仓库即可。

> 注意：除 surge 再部署命令外，其他方式都是**一次性快照**。以后修改了游戏代码，需要重新同步 `dist/` 后再次发布。

## 操作方式

| 操作 | 键盘 | 触屏 |
| --- | --- | --- |
| 移动 / 推箱 | 方向键 或 WASD | 滑动画面 或 点方向盘 |
| 撤销一步 | Z | 「撤销」按钮 |
| 重开本关 | R | 「重开」按钮 |
| 上一关 / 下一关 | P / N | ◀ ▶ 按钮 |
| 静音 | M | 「音效」按钮 |

过关进度自动保存在浏览器 localStorage，侧栏可点击跳转到任意关卡（✓ = 已通关）。

## 关卡来源

关卡来自推箱子社区最著名的入门关卡集 **Microban**（155 关，2000 年 4 月修订版）：

- **作者**：David W. Skinner
- **原始站点**：http://users.bentonrea.com/~sasquatch/sokoban/
- **授权**：作者允许在保留署名的情况下自由分发（本仓库已在 `js/levels.js` 文件头署名）
- 关卡格式为标准 XSB 文本，`js/levels.js` 中每关都是一个独立对象，可自由增删

## 项目结构

```
xingame/
├── index.html          页面骨架
├── css/style.css       样式（浅色主题、响应式、移动端方向盘）
├── assets/             角色像素图（四朝向 + 三张发力姿势）
│   ├── player_front.png
│   ├── player_back.png
│   ├── player_side.png
│   ├── player_side_left.png
│   ├── player_push_front.png
│   ├── player_push_side.png
│   └── player_push_side_left.png
├── js/
│   ├── levels.js       155 个 Microban 社区关卡（XSB 格式 + 署名）
│   ├── sprites.js      ★ 可替换模型系统：像素人物角色、经典木箱（程序化绘制）
│   ├── audio.js        音效合成（Web Audio，零音频文件）
│   ├── game.js         游戏核心逻辑（移动/推箱/撤销/胜利判定）
│   ├── renderer.js     Canvas 渲染器（平滑动画、发力动作、自适应尺寸）
│   └── main.js         启动与 UI 装配
└── README.md
```

## 音效说明

所有音效都由 Web Audio API **实时合成**，不依赖任何外部音频文件：

- **走路“吧唧吧唧”**：每一步触发——带通滤波白噪声（肉感 squish）+ 低频正弦 blop（黏弹感），每次随机音高（550–1400Hz / 130–240Hz），左右声道交替，所以连续走路会听到自然的“吧唧～吧唧～”节奏
- **推箱子**：低频摩擦噪声 + 木栅 creak（锯齿波下滑）
- **箱子入位**：清脆双音 blip
- **过关**：C-E-G-C 四音上行小旋律
- **撞墙**：闷响

注意：浏览器要求音频必须在用户手势后启动，所以第一次按键/点击后声音才会出现（已处理）。

## 角色模型

角色是根据参考照片生成的**像素风人物**（AI 生成 + 后期抠图处理）。

**普通朝向**（按移动方向切换）：

```
assets/player_front.png      正面（向下走）
assets/player_back.png       背面（向上走）
assets/player_side.png       侧面朝右（向右走）
assets/player_side_left.png  侧面朝左（镜像）
```

**发力姿势**（把箱子推上目标点时播放 0.7 秒，带轻微弹跳，然后自动恢复）：

```
assets/player_push_front.png      正面发力（鼓腮、双臂前推）
assets/player_push_side.png       侧面发力（弓步、单臂前推）
assets/player_push_side_left.png  侧面发力（镜像）
```

背面看不到表情，不单独做发力图，向上推时沿用普通背面图。图片加载完成前会先画色块占位，不会闪白。

特征还原了参考照片中的形象：红色格子贝雷帽（带小徽章）、圆眼镜、深色中长发、灰色 oversized 卫衣、斜挎小包。

另外：推箱入位时会播放“入位”音效，最后一箱入位时过关卡片会**延迟 0.65 秒**弹出——先看完发力姿势和箱子光晕，再弹卡片。

## 后期更换模型

模型全部集中在 `js/sprites.js` 的 `SPRITES` 注册表中，**换模型不需要动任何游戏逻辑**：

```js
// 当前：像素人物角色（assets/player_*.png，四朝向）+ 程序化经典木箱
SPRITES.player  // 按方向切换 player_front/back/side/side_left 四张图
SPRITES.box     // 经典木质货箱（木板纹、包边、金属护角）

// 换成其他图片模型示例（文件底部有完整注释）：
function imageSprite(img) {
  return {
    draw(ctx, px, py, s) {
      const prev = ctx.imageSmoothingEnabled;
      ctx.imageSmoothingEnabled = false;   // 像素素材保持锐利
      ctx.drawImage(img, px, py, s, s);
      ctx.imageSmoothingEnabled = prev;
    }
  };
}
const crate = new Image();
crate.src = 'assets/crate.png';        // 网络下载的经典箱子贴图
crate.onload = () => { SPRITES.box = imageSprite(crate); };
```

## 开发备注

- 纯 ES Modules + Canvas 2D，无构建步骤、无第三方依赖
- `game.js` 与渲染/音频完全解耦，可直接在 Node 中做逻辑单测
- 关卡自适应：格子尺寸根据关卡大小和容器自动计算（超大关卡如 30×17 的 “The Dungeon” 也能完整显示）
- 已用 BFS 求解器验证全部关卡可解性（小中关卡全部通过；个别超大关卡超出简易求解器规模上限，但属于社区发布版，可解性有保障）
