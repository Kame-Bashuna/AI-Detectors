# Backend Integration Guide

This document explains how the frontend and backend are integrated.

## Architecture

- **Frontend**: Next.js 14 application running on `http://localhost:3000`
- **Backend**: Django REST API running on `http://localhost:8000`

## API Endpoints

### Text Detection
- **Endpoint**: `POST /api_text/detect-text/`
- **Request Body**: `{ "text": "your text here" }`
- **Response**: 
  ```json
  {
    "predicted_class": 0,
    "predicted_label": "human",
    "confidence": 0.95,
    "probabilities": [0.95, 0.05]
  }
  ```

### Image Detection
- **Endpoint**: `POST /api_image/classify-image/`
- **Request**: Multipart form data with `image` field
- **Response**: 
  ```json
  {
    "predicted_class": 1,
    "predicted_label": "ai_generated",
    "confidence": 0.87,
    "probabilities": [0.13, 0.87]
  }
  ```

### Video Detection
- **Endpoint**: `POST /api_video/classify-video/`
- **Request**: Multipart form data with `video` field
- **Response**: 
  ```json
  {
    "result": {
      "prediction": "Fake",
      "confidence": 0.92,
      "probabilities": {
        "real": 0.08,
        "fake": 0.92
      }
    }
  }
  ```

## Setup Instructions

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

4. Start the Django server:
   ```bash
   python manage.py runserver 8000
   ```

   Or use the npm script:
   ```bash
   npm run backend
   ```

### Frontend Setup

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file (optional, defaults to `http://localhost:8000`):
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

## Running Both Servers

### Option 1: Separate Terminals
- Terminal 1: `npm run backend` (or `cd backend && python manage.py runserver 8000`)
- Terminal 2: `npm run dev`

### Option 2: Using Scripts
- Terminal 1: `./start-backend.sh`
- Terminal 2: `./start-frontend.sh`

## CORS Configuration

The backend includes a simple CORS middleware (`disprover/cors.py`) that allows requests from the frontend. This is configured for development only.

## File Type Support

- **Text**: `.txt`, `.pdf`, `.docx`
- **Images**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- **Videos**: `.mp4`, `.mov`, `.avi`, `.mkv`, `.webm`

## Troubleshooting

### Backend not responding
- Ensure Django server is running on port 8000
- Check that models are loaded correctly (check Django logs)
- Verify CORS middleware is enabled in `settings.py`

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check browser console for CORS errors
- Ensure backend is running before starting frontend

### File upload errors
- Check file size limits
- Verify file type is supported
- Check backend logs for detailed error messages

