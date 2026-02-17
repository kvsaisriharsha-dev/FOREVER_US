# FOREVER_US


# Forever Us — AI-Powered Memory Journaling App

## Project Overview
A production-ready, emotionally engaging web application for capturing and preserving meaningful memories with AI-generated emotional captions. Features **separate password-protected compartments** for Besties, Family, Couple, Personal, and Adventure memories.

## Tech Stack
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS (glassmorphism, gradients)
- **State**: Zustand with localStorage persistence
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Architecture

### Directory Structure
```
src/
├── types/memory.ts          # Memory interface, CompartmentType, COMPARTMENTS config
├── utils/captions.ts        # AI caption generator utility
├── store/memoryStore.ts     # Zustand store + localStorage (compartment-aware)
├── components/
│   ├── Navbar.tsx            # Floating glass navigation (with Spaces link)
│   ├── MemoryCard.tsx        # Gallery memory card (shows compartment badge)
│   ├── LikeButton.tsx        # Animated heart button
│   ├── PhotoUpload.tsx       # Drag & drop photo upload
│   ├── EmptyState.tsx        # Empty gallery placeholder
│   └── PasswordGate.tsx      # Password lock/setup per compartment
├── pages/
│   ├── Landing.tsx           # Hero landing with compartment preview
│   ├── CompartmentHub.tsx    # All compartments as beautiful cards
│   ├── CompartmentPage.tsx   # Password-gated filtered gallery per category
│   ├── Gallery.tsx           # All memories gallery
│   ├── AddMemory.tsx         # Create memory form with compartment selector
│   └── MemoryDetail.tsx      # Individual memory view with compartment badge
├── App.tsx                   # Router setup
├── index.css                 # Global styles
└── main.tsx                  # Entry point
```

### Key Features
- **5 Password-Protected Compartments**: Besties, Family, Couple, Personal, Adventure
- Each compartment has its own password (set on first visit, stored in localStorage)
- Session-based unlocking (lock resets on browser close)
- Photo upload with drag & drop
- AI-generated emotional captions
- Like/favorite memories
- Search and tag-based filtering per compartment
- Compartment selector when creating memories
- Beautiful gallery with responsive grid
- Full mobile-responsive design
- Glassmorphism + violet/fuchsia gradient theme

### Routes
- `/` — Landing page with compartment preview
- `/compartments` — Compartment Hub (all spaces)
- `/compartment/:compartmentId` — Individual compartment (password-protected)
- `/gallery` — All memories gallery
- `/add` — Create memory (with ?compartment= preset)
- `/memory/:id` — Memory detail view

### Data Persistence
- Memories: localStorage (`forever-us-memories`)
- Passwords: localStorage (`forever-us-passwords`)
- Unlock state: sessionStorage (`forever-us-unlocked`)

### Build
- `npm run build` — Production build via Vite
