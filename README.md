# AI Content Detector

A modern Next.js application for detecting AI-generated content across text, images, and video files. Integrated with a Django backend for AI model inference.

## Features

- Unified upload interface for multiple file types
- Support for Text (.txt, .pdf, .docx), Images (.jpg, .png, .webp), and Video (.mp4, .mov, .avi)
- Real-time AI detection with confidence scores
- Dark mode support
- Responsive design
- Recent scans history

## Architecture

- **Frontend**: Next.js 14 with TypeScript
- **Backend**: Django REST API with PyTorch models
- **AI Models**: Custom trained models for text, image, and video detection

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+ and pip
- (Optional) CUDA-enabled GPU for faster inference

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run database migrations:
   ```bash
   python manage.py migrate
   ```

4. Start the Django server (in a separate terminal):
   ```bash
   npm run backend
   # or
   cd backend && python manage.py runserver 8000
   ```

### Frontend Setup

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. (Optional) Create a `.env.local` file to configure the API URL:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run backend` - Start Django backend server
- `npm run backend:install` - Install Python dependencies
- `npm run backend:migrate` - Run Django migrations
- `npm run build` - Build for production
- `npm start` - Start production server

## Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Material Symbols** - Icons

### Backend
- **Django 6.0** - Web framework
- **PyTorch** - Deep learning framework
- **Transformers** - Hugging Face transformers for text models
- **Torchvision** - Computer vision models
- **OpenCV** - Video processing

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── Header.tsx          # Header component
│   ├── UploadArea.tsx      # File upload area with API integration
│   ├── ResultDisplay.tsx   # Results display component
│   └── RecentScans.tsx     # Recent scans table
├── lib/                    # Utility functions
│   └── api.ts              # API client functions
├── backend/                # Django backend
│   ├── disprover/          # Django project settings
│   ├── text_classifier/    # Text detection app
│   ├── image_classifier/   # Image detection app
│   └── video_classifier/   # Video detection app
└── public/                 # Static assets
```

For detailed integration information, see [INTEGRATION.md](./INTEGRATION.md).

## Build for Production

```bash
npm run build
npm start
```

