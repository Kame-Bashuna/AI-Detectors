'use client'

import { useState, useRef } from 'react'
import { detectText, detectImage, detectVideo, getFileType, extractTextFromFile, TextDetectionResult, ImageDetectionResult, VideoDetectionResult } from '@/lib/api'
import ResultDisplay from './ResultDisplay'

export default function UploadArea() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TextDetectionResult | ImageDetectionResult | VideoDetectionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [fileType, setFileType] = useState<'text' | 'image' | 'video' | 'unknown'>('text')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setLoading(true)
    setError(null)
    setResult(null)
    setFileName(file.name)

    try {
      const type = getFileType(file.name)
      setFileType(type)

      if (type === 'unknown') {
        throw new Error('Unsupported file type. Please upload a text, image, or video file.')
      }

      if (type === 'text') {
        const text = await extractTextFromFile(file)
        if (!text || text.trim().length === 0) {
          throw new Error('File appears to be empty or could not be read.')
        }
        const detectionResult = await detectText(text)
        setResult(detectionResult)
      } else if (type === 'image') {
        const detectionResult = await detectImage(file)
        setResult(detectionResult)
      } else if (type === 'video') {
        const detectionResult = await detectVideo(file)
        setResult(detectionResult)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the file.')
      console.error('Error processing file:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  return (
    <div className="mb-10 w-full">
      <div
        className={`group relative w-full bg-white dark:bg-card-dark rounded-3xl border-2 border-dashed transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden ${
          isDragging
            ? 'border-primary dark:border-primary bg-primary/5'
            : 'border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-primary'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
          type="file"
          onChange={handleFileSelect}
          accept=".txt,.pdf,.docx,.jpg,.jpeg,.png,.webp,.gif,.mp4,.mov,.avi,.mkv,.webm"
        />
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center relative pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex items-center justify-center mb-8 relative">
            <div className="flex -space-x-4 relative z-10">
              <div className="size-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-lg flex items-center justify-center border-2 border-white dark:border-card-dark transform -rotate-12 group-hover:-translate-x-4 group-hover:-rotate-12 transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">description</span>
              </div>
              <div className="size-20 rounded-2xl bg-white dark:bg-gray-800 text-primary shadow-xl flex items-center justify-center border-4 border-white dark:border-card-dark z-20 relative transform group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-4xl">cloud_upload</span>
              </div>
              <div className="size-16 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 shadow-lg flex items-center justify-center border-2 border-white dark:border-card-dark transform rotate-12 group-hover:translate-x-4 group-hover:rotate-12 transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">perm_media</span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            Drag &amp; Drop or Click to Upload
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-lg mx-auto mb-8 font-body">
            One place for all your files. We support automatic detection for{' '}
            <span className="text-gray-700 dark:text-gray-200 font-medium">Text, Image, and Video</span> formats.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors">
              <span className="material-symbols-outlined text-lg">description</span>
              Text Documents
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 group-hover:border-purple-200 dark:group-hover:border-purple-800 transition-colors">
              <span className="material-symbols-outlined text-lg">image</span>
              Images
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20 group-hover:border-rose-200 dark:group-hover:border-rose-800 transition-colors">
              <span className="material-symbols-outlined text-lg">movie</span>
              Video
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400 dark:text-gray-500 font-mono uppercase tracking-wide">
            <span>.txt / .pdf / .docx</span>
            <span className="size-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
            <span>.jpg / .png / .webp</span>
            <span className="size-1 rounded-full bg-gray-300 dark:bg-gray-700"></span>
            <span>.mp4 / .mov / .avi</span>
          </div>
          <div className="mt-8">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 font-bold text-sm transform transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined">folder_open</span>
              Select Files
            </span>
          </div>
        </div>
      </div>
      
      <ResultDisplay
        result={result}
        fileName={fileName}
        fileType={fileType}
        loading={loading}
        error={error}
      />
    </div>
  )
}

