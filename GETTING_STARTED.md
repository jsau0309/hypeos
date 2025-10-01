# Getting Started with Hype OS

## 🎉 Welcome!

You've successfully set up the Hype OS development environment! The core desktop interface is now running.

## 🖥️ What's Working Now

Visit [http://localhost:5173](http://localhost:5173) to see:

1. **Desktop**: Aqua blue gradient background
2. **Menu Bar**: Apple menu, app menus, and system icons (top)
3. **Dock**: App launcher with three apps (bottom center)
4. **Windows**: Fully functional window system

## 🎮 Try It Out!

### Launch Your First App

1. Click the **Info icon** (ℹ️) in the Dock
2. The "About This Mac" window will appear
3. Try these interactions:
   - **Drag**: Click and hold the title bar to move the window
   - **Resize**: Drag the bottom-right corner
   - **Minimize**: Click the yellow button
   - **Maximize**: Click the green button (toggles full screen)
   - **Close**: Click the red button

### Launch Multiple Apps

- Click other icons in the Dock
- Currently shows placeholder content for Browser and iTunes
- Multiple windows can be open simultaneously
- Click any window to bring it to front

### Menu Bar

- Click the **Apple icon** to see the Apple menu
- System icons show WiFi, Battery, and Time
- Active app name appears after Apple menu

## 🏗️ Next Development Steps

Now that the core UI is working, here's what to build next:

### Phase 2A: Browser Application (Priority)

**File**: `src/apps/Browser/Browser.tsx`

Key features to implement:
1. Tab management system
2. Address bar with archive.org integration
3. Back/forward navigation
4. Iframe for displaying web content
5. Bookmarks bar

**Quick Start**:
```bash
mkdir -p src/apps/Browser/components
touch src/apps/Browser/Browser.tsx
touch src/apps/Browser/components/TabBar.tsx
touch src/apps/Browser/components/AddressBar.tsx
```

### Phase 2B: iTunes Application

**File**: `src/apps/iTunes/iTunes.tsx`

Key features to implement:
1. Three-column layout (source list, tracks, now playing)
2. File upload for music
3. HTML5 Audio API integration
4. Playlist management
5. Podcast RSS parsing

## 🎨 Customization

### Change Desktop Wallpaper

Edit `src/components/Desktop/Desktop.tsx`:
```tsx
backgroundImage: 'linear-gradient(to bottom, #74B0E8, #2E7CBB)',
// Change to your preferred gradient or image URL
```

### Add More Apps

1. Create new app component in `src/apps/YourApp/`
2. Register in `src/App.tsx`:
```tsx
registerApp({
  id: 'yourapp',
  name: 'Your App',
  icon: 'YourLucideIcon', // from lucide-react
  component: YourApp,
  defaultSize: { width: 800, height: 600 },
});
```

### Modify Aqua Colors

Edit `tailwind.config.ts`:
```ts
colors: {
  aqua: {
    blue: '#0A7AFF', // Change this
  },
},
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Restart dev server
bun dev
```

### TypeScript Errors

```bash
# Clear cache and reinstall
rm -rf node_modules bun.lockb
bun install
```

### Window Not Draggable

- Make sure you're dragging from the title bar
- The window content area is not draggable by design

### Dock Icons Not Showing

- Icons use Lucide React icon names
- Check `src/App.tsx` for correct icon names
- Valid examples: 'Info', 'Chrome', 'Music'

## 📚 Key Files to Know

- **src/App.tsx** - Main app, register apps here
- **src/stores/windowStore.ts** - Window state management
- **src/stores/appStore.ts** - App registry
- **src/components/Window/Window.tsx** - Window component
- **tailwind.config.ts** - Aqua theme colors

## 🚀 Build & Deploy

### Build for Production

```bash
bun run build
```

Output goes to `dist/` folder - these are static files ready to deploy.

### Deploy to Vercel (Free)

```bash
# Install Vercel CLI
bun add -g vercel

# Login and deploy
vercel login
vercel deploy

# Production deployment
vercel --prod
```

Your app will be live at: `https://your-project.vercel.app`

### Deploy to Netlify

```bash
# Install Netlify CLI
bun add -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

## 🎯 Development Tips

1. **Hot Reload**: Changes auto-refresh in browser
2. **Console**: Open browser DevTools (F12) to debug
3. **Zustand DevTools**: Install browser extension for state debugging
4. **React DevTools**: Install for component inspection

## 📖 Learning Resources

- **Zustand Docs**: https://github.com/pmndrs/zustand
- **Framer Motion**: https://www.framer.com/motion/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Draggable**: https://github.com/react-grid-layout/react-draggable

## 💡 Feature Ideas

- [ ] Desktop icons (drag-and-drop files)
- [ ] Context menus (right-click)
- [ ] Window snap zones
- [ ] Spotlight search (Cmd+Space)
- [ ] System Preferences app
- [ ] Finder app
- [ ] Calculator app
- [ ] Notes app
- [ ] Custom wallpaper upload
- [ ] Multiple desktops/spaces
- [ ] Notification center
- [ ] Screen saver

## 🤝 Need Help?

- Check the main [README.md](README.md) for architecture details
- Review code comments in component files
- Open an issue on GitHub (if applicable)

---

**Happy Coding! 🎉**

Built with ❤️ using Bun, React, and TypeScript
