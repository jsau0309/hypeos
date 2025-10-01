# Hype OS X

A web-based Mac OS X 10.1 emulation built with React, TypeScript, and Tailwind CSS. Experience the classic Aqua interface right in your browser!

## 🚀 Features

- **Authentic Aqua Design**: Faithful recreation of Mac OS X 10.1's iconic interface
- **Window Management**: Full drag, resize, minimize, maximize, and close functionality
- **Dock**: App launcher with magnification effects and running indicators
- **Menu Bar**: Apple menu with system icons and time display
- **100% Web-Based**: No installation required - just visit the URL
- **Guest Mode**: Full functionality without requiring login

## 🛠️ Tech Stack

- **Runtime**: Bun
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Window System**: react-draggable + react-resizable
- **Icons**: Lucide React

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd hypeos

# Install dependencies with Bun
bun install

# Start development server
bun dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

## 🏗️ Project Structure

```
hypeos/
├── src/
│   ├── apps/              # Application components
│   │   ├── About/         # About This Mac
│   │   ├── Browser/       # Safari browser (coming soon)
│   │   └── iTunes/        # Music player (coming soon)
│   ├── components/
│   │   ├── Desktop/       # Desktop workspace
│   │   ├── MenuBar/       # Top menu bar
│   │   ├── Dock/          # Bottom app dock
│   │   └── Window/        # Window management
│   ├── stores/            # Zustand state stores
│   │   ├── windowStore.ts # Window management state
│   │   └── appStore.ts    # App registry state
│   ├── types/             # TypeScript definitions
│   ├── lib/               # Utility functions
│   └── App.tsx            # Main app component
├── public/                # Static assets
└── package.json
```

## 🎯 Current Status

### ✅ Completed (Phase 1)
- Desktop environment with Aqua styling
- Menu bar with Apple menu and system icons
- Dock with app icons and hover effects
- Window management (drag, resize, minimize, maximize, close)
- "About This Mac" application
- Zustand stores for state management

### 🚧 Next Steps (Phase 2-3)
- Browser app with archive.org integration
- iTunes music player with local file support
- Podcast support
- Enhanced animations
- Keyboard shortcuts

## 🎨 Design Philosophy

Hype OS aims to recreate the authentic Mac OS X 10.1 experience with:
- **Aqua Blue**: Classic gradient backgrounds and translucent elements
- **Window Chrome**: Authentic title bars with red, yellow, green buttons
- **Dock Effects**: Magnification on hover
- **Smooth Animations**: Framer Motion for fluid interactions

## 🌐 Deployment

### Build for Production

```bash
bun run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel deploy
```

The app will be instantly accessible at your Vercel URL (e.g., `hypeos.vercel.app`)

## 📝 Development Roadmap

### Phase 1: Core Desktop ✅
- [x] Desktop shell
- [x] Menu bar
- [x] Dock
- [x] Window management
- [x] About This Mac app

### Phase 2: Browser (Weeks 2-3)
- [ ] Multi-tab interface
- [ ] Archive.org integration
- [ ] Bookmarks bar
- [ ] Navigation controls
- [ ] History tracking

### Phase 3: iTunes (Weeks 3-4)
- [ ] Music library
- [ ] File upload (MP3, M4A)
- [ ] Playlist management
- [ ] Audio playback
- [ ] Podcast support

### Phase 4: Polish (Week 4-5)
- [ ] Performance optimization
- [ ] Responsive design
- [ ] PWA support
- [ ] Keyboard shortcuts
- [ ] Cross-browser testing

### Phase 5: Authentication (Week 5+)
- [ ] User accounts (optional)
- [ ] Cloud sync
- [ ] Cross-device features

## 🎮 Usage

1. **Launch Apps**: Click on icons in the Dock
2. **Move Windows**: Drag the title bar
3. **Resize Windows**: Drag the bottom-right corner
4. **Window Controls**:
   - Red button: Close
   - Yellow button: Minimize
   - Green button: Maximize/Restore
5. **Apple Menu**: Click the Apple icon for system options

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or personal projects.

## 🙏 Acknowledgments

- Inspired by Mac OS X 10.1 (Puma)
- Built with modern web technologies
- Designed for nostalgic computing enthusiasts

---

**Note**: This is a web-based emulation for educational and nostalgic purposes. Mac OS X is a trademark of Apple Inc.
