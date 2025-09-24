# United with Christ through the Holy Spirit Church

A modern, responsive church management application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🏠 **Modern Homepage** - Beautiful hero section with church information
- 📊 **Dashboard** - Manage church posts with Bible verses and sections
- 📖 **Bible Verse Management** - Interactive verse selector with all books of the Bible
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Clean, professional design with smooth animations
- ⚡ **Fast Performance** - Built with Next.js for optimal speed

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx          # Main page component
│   ├── components/            # React components
│   │   ├── Navigation.tsx     # Navigation header
│   │   ├── HeroSection.tsx    # Homepage hero
│   │   ├── Dashboard.tsx      # Dashboard page
│   │   ├── PostModal.tsx      # Post creation/editing modal
│   │   ├── VerseSelector.tsx  # Bible verse selector
│   │   ├── AboutPage.tsx      # About page
│   │   ├── ContactPage.tsx    # Contact page
│   │   └── Footer.tsx         # Footer component
│   └── lib/                   # Utilities and types
│       ├── types.ts           # TypeScript types
│       ├── utils.ts           # Utility functions
│       └── bible-books.ts     # Bible books data
├── info/                      # Original files for reference
└── package.json
```

## Deployment on Vercel

This project is optimized for deployment on Vercel:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and deploy
   - Your site will be live at `https://your-app.vercel.app`

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Hooks** - Modern state management

## Features in Detail

### Dashboard
- Add, edit, and delete church posts
- Interactive Bible verse selector
- Custom sections support
- Date filtering
- Responsive design

### Bible Verse Management
- Complete Bible book database
- Chapter and verse validation
- Support for verse ranges
- Real-time reference preview

### Modern Design
- Professional church aesthetic
- Smooth animations and transitions
- Mobile-first responsive design
- Accessible UI components

## Development

- **Build for production:** `npm run build`
- **Start production server:** `npm start`
- **Lint code:** `npm run lint`

## Contributing

This project was developed for United with Christ through the Holy Spirit Church. For modifications or improvements, please contact the development team.

## Developer

Developed by **Jcohannz Roz Cordoviz**