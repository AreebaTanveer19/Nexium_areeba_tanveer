# ✨ Quote Generator

A beautiful, dynamic, and responsive Quote Generator Web App built with Next.js, featuring modern UI components, smooth animations, and comprehensive functionality.

## 🎨 Features

### Core Functionality
- **Random Quote Display**: Fetches inspirational quotes from ZenQuotes API
- **Quote Generation**: One-click new quote generation with smooth transitions
- **Copy to Clipboard**: Copy quotes with author attribution
- **Share Functionality**: Share quotes via Twitter or native sharing
- **Shareable Links**: Generate and copy shareable URLs with quote content
- **Favorites System**: Save and manage favorite quotes with localStorage persistence

### Aesthetic Design
- **Multiple Themes**: 25+ DaisyUI themes including Pastel, Cupcake, Dracula, Synthwave, Retro, and more
- **Glassmorphism Effects**: Beautiful backdrop blur and transparency effects
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Responsive Design**: Mobile-first design that works perfectly on all devices
- **Gradient Backgrounds**: Dynamic gradient backgrounds that adapt to themes

### User Experience
- **Theme Switcher**: Easy theme switching with dropdown menu
- **Favorites Modal**: Dedicated modal for managing saved quotes
- **Toast Notifications**: Beautiful feedback for user actions
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Graceful error handling with user-friendly messages

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + DaisyUI
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast)
- **API**: ZenQuotes API
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quote-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Usage

### Basic Features
1. **Get a Quote**: Click "New Quote" to fetch a random inspirational quote
2. **Save Favorites**: Click the star icon to save quotes to your favorites
3. **Copy Quote**: Click "Copy" to copy the quote with author to clipboard
4. **Share Quote**: Click "Share" to share via Twitter or native sharing
5. **Share Link**: Click "Link" to copy a shareable URL

### Theme Customization
1. Click the palette icon in the header
2. Choose from 25+ available themes
3. Your theme preference is automatically saved

### Managing Favorites
1. Click "View Favorites" button when you have saved quotes
2. View all your saved quotes in a beautiful modal
3. Copy, share, or remove individual favorites
4. Favorites are automatically saved to localStorage

## 🎯 Key Components

### Core Components
- **`Header`**: App title and theme switcher
- **`QuoteCard`**: Main quote display with action buttons
- **`FavoritesModal`**: Modal for managing saved quotes
- **`Footer`**: Attribution and credits
- **`Toaster`**: Toast notification system

### Features
- **Responsive Layout**: Adapts to all screen sizes
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized animations and lazy loading
- **SEO**: Proper meta tags and semantic HTML

## 🎨 Available Themes

The app includes 25+ beautiful DaisyUI themes:
- Pastel, Cupcake, Dracula, Forest
- Synthwave, Retro, Cyberpunk, Valentine
- Halloween, Garden, Aqua, Lofi
- Fantasy, Wireframe, Black, Luxury
- Corporate, CMYK, Autumn, Business
- Acid, Lemonade, Night, Coffee, Winter

## 🔧 Customization

### Adding New Themes
1. Edit `tailwind.config.js`
2. Add theme name to the `themes` array
3. Restart the development server

### Modifying Styles
- Global styles: `src/app/globals.css`
- Component styles: Individual component files
- Theme customization: DaisyUI theme variables

### API Integration
The app uses ZenQuotes API. To change the API:
1. Modify `src/app/api/quote/route.ts`
2. Update the fetch URL and response handling
3. Adjust the quote interface if needed

## 📄 API Reference

### Quote API Endpoint
- **URL**: `/api/quote`
- **Method**: GET
- **Response**: Array with quote object containing `q` (quote) and `a` (author)

### Shareable Links
- **Format**: `/?quote=<encoded-quote>&author=<encoded-author>`
- **Example**: `/?quote=Be%20the%20change&author=Gandhi`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **ZenQuotes API** for providing inspirational quotes
- **DaisyUI** for beautiful theme components
- **Framer Motion** for smooth animations
- **shadcn/ui** for excellent UI components
- **Lucide React** for beautiful icons

---

Made with ❤️ using Next.js, Tailwind CSS, and DaisyUI
