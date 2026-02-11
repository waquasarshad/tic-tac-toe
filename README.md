# 3D Tic Tac Toe

An advanced, visually impressive 3D Tic Tac Toe game built with React, featuring stunning animations, interactive 3D effects, and physics-based motion.

## ✨ Features

### Two Game Modes
- **3×3 Classic Mode**: Traditional Tic Tac Toe with 3D effects
- **4×4×4 Cube Mode**: Advanced 3D cube gameplay with layer-based navigation

### Advanced Effects
- **3D Board Rotation**: Drag the board to rotate it freely in 3D space
- **Inertia Physics**: Smooth momentum-based rotation continues after release
- **Parallax Background**: Subtle depth effect following mouse movement
- **Dynamic Lighting**: Light source changes based on board rotation
- **SVG Stroke Animations**: X and O symbols draw themselves with smooth animations
- **Win Animations**: Winning cells lift up, losing cells drop, with confetti effects
- **Camera Shake**: Subtle shake effect when someone wins
- **Glassmorphism UI**: Modern frosted glass design elements
- **Touch Support**: Full support for mobile touch interactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Layer Navigation**: Switch between cube layers in 4×4×4 mode
- **3D Win Detection**: Checks all possible winning lines in 3D space

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 🎮 How to Play

### 3×3 Classic Mode
1. Select "3×3 Classic" mode
2. Click on any empty cell to make your move
3. Drag the board to rotate it in 3D space
4. The game alternates between X and O players
5. Get three in a row (horizontally, vertically, or diagonally) to win
6. Click "Restart Game" to start a new game

### 4×4×4 Cube Mode
1. Select "4×4×4 Cube" mode
2. Use the layer buttons (1, 2, 3, 4) to navigate between cube layers
3. Click on any empty cell in the current layer to make your move
4. Drag the board to rotate the entire cube
5. Get four in a row to win (can be across layers, diagonals, or any direction)
6. Coordinates (x,y,z) are shown in each cell for reference
7. Click "Restart Game" to start a new game

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Advanced animations and 3D transforms
- **Custom Hooks** - Reusable logic for drag, inertia, and parallax effects

## 📁 Project Structure

```
tic-tac-toe/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── global.css      # Global styles and theme
│   │       ├── board.css       # Board and cell styles
│   │       └── animations.css  # SVG animation styles
│   ├── components/
│   │   ├── Board.jsx           # Main game board
│   │   ├── Cell.jsx            # Individual cell component
│   │   ├── Controls.jsx        # Game controls and status
│   │   ├── Confetti.jsx        # Confetti particle effect
│   │   └── CameraEffects.jsx   # Camera shake effect
│   ├── hooks/
│   │   ├── useDragRotate.js    # Drag rotation logic
│   │   ├── useInertia.js       # Momentum physics
│   │   └── useParallax.js      # Parallax mouse tracking
│   ├── utils/
│   │   ├── gameLogic.js        # Core game logic
│   │   └── winCheck.js         # Win/draw detection
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🌐 Deployment

### Deploy to GitHub Pages

1. Update the `base` path in `vite.config.js` to match your repository name:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
})
```

2. Build and deploy:

```bash
npm run build
npm run deploy
```

3. Enable GitHub Pages in your repository settings (Settings → Pages → Source: gh-pages branch)

## 🎨 Customization

### Colors

Edit the gradient colors in `src/assets/styles/global.css`:

```css
.title {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Board Size

Modify grid dimensions in `src/assets/styles/board.css`:

```css
.board {
  grid-template-columns: repeat(3, 120px);
  grid-template-rows: repeat(3, 120px);
}
```

### Animation Speed

Adjust animation durations in the respective CSS files and component files.

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🏆 Performance

- Optimized for 60fps animations
- Uses `requestAnimationFrame` for smooth motion
- CSS transforms for hardware acceleration
- Minimal re-renders with React hooks

## 📄 License

MIT License - feel free to use this project for your portfolio or learning purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

Built with React and modern web technologies. Perfect for showcasing frontend engineering skills.
