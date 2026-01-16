const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface TextDetectionResult {
  predicted_class: number;
  predicted_label: string;
  confidence: number;
  probabilities: number[];
}

export interface ImageDetectionResult {
  predicted_class: number;
  predicted_label: string;
  confidence: number;
  probabilities: number[];
}

export interface VideoDetectionResult {
  result: {
    prediction: 'Real' | 'Fake';
    confidence: number;
    probabilities: {
      real: number;
      fake: number;
    };
  };
}

export async function detectText(text: string): Promise<TextDetectionResult> {
  const response = await fetch(`${API_BASE_URL}/api_text/detect-text/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Text detection failed: ${errorText}`);
  }

  return response.json();
}

export async function detectImage(file: File): Promise<ImageDetectionResult> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_BASE_URL}/api_image/classify-image/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Image detection failed: ${errorText}`);
  }

  return response.json();
}

export async function detectVideo(file: File): Promise<VideoDetectionResult> {
  const formData = new FormData();
  formData.append('video', file);

  const response = await fetch(`${API_BASE_URL}/api_video/classify-video/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Video detection failed: ${errorText}`);
  }

  return response.json();
}

export function getFileType(fileName: string): 'text' | 'image' | 'video' | 'unknown' {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  const textExtensions = ['txt', 'pdf', 'docx', 'doc'];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm'];

  if (extension && textExtensions.includes(extension)) {
    return 'text';
  }
  if (extension && imageExtensions.includes(extension)) {
    return 'image';
  }
  if (extension && videoExtensions.includes(extension)) {
    return 'video';
  }
  
  return 'unknown';
}

export async function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    if (file.type === 'application/pdf') {
      // For PDF files, we'll need a library or just return a placeholder
      // For now, we'll show an error message
      reject(new Error('PDF text extraction not implemented. Please use .txt or .docx files.'));
    } else {
      reader.readAsText(file);
    }
  });
}

