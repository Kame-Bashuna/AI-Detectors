'use client'

import { TextDetectionResult, ImageDetectionResult, VideoDetectionResult } from '@/lib/api'

interface ResultDisplayProps {
  result: TextDetectionResult | ImageDetectionResult | VideoDetectionResult | null
  fileName: string
  fileType: 'text' | 'image' | 'video' | 'unknown'
  loading: boolean
  error: string | null
}

export default function ResultDisplay({ result, fileName, fileType, loading, error }: ResultDisplayProps) {
  if (loading) {
    return (
      <div className="mt-8 p-6 bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <p className="text-gray-600 dark:text-gray-400">Analyzing file...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-red-600 dark:text-red-400">error</span>
          <h3 className="text-lg font-bold text-red-900 dark:text-red-400">Error</h3>
        </div>
        <p className="text-red-700 dark:text-red-300">{error}</p>
      </div>
    )
  }

  if (!result) {
    return null
  }

  const getLabel = () => {
    if ('result' in result) {
      // Video result
      return result.result.prediction
    } else {
      // Text or Image result
      return result.predicted_label
    }
  }

  const getConfidence = () => {
    if ('result' in result) {
      // Video result
      return result.result.confidence
    } else {
      // Text or Image result
      return result.confidence
    }
  }

  const isAI = () => {
    if ('result' in result) {
      return result.result.prediction === 'Fake'
    } else {
      return result.predicted_label.toLowerCase().includes('ai') || result.predicted_class === 1
    }
  }

  const label = getLabel()
  const confidence = getConfidence()
  const aiGenerated = isAI()

  return (
    <div className="mt-8 p-6 bg-white dark:bg-card-dark rounded-2xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-primary">analytics</span>
        <h3 className="text-lg font-bold">Analysis Result</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">File</p>
          <p className="font-medium text-gray-900 dark:text-white">{fileName}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Type</p>
          <p className="font-medium text-gray-900 dark:text-white capitalize">{fileType}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Result</p>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                aiGenerated
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
              }`}
            >
              <span
                className={`size-2 rounded-full ${
                  aiGenerated ? 'bg-red-500' : 'bg-green-500'
                }`}
              ></span>
              {label} ({(confidence * 100).toFixed(1)}%)
            </span>
          </div>
        </div>

        {!('result' in result) && (
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Probabilities</p>
            <div className="space-y-2">
              {result.probabilities.map((prob, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400 w-24">
                    {result.predicted_class === idx ? '→ ' : ''}
                    {idx === 0 ? 'Human' : 'AI'}
                  </span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        idx === 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${prob * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-300 w-12 text-right">
                    {(prob * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {'result' in result && (
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Probabilities</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 dark:text-gray-400 w-24">Real</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: `${result.result.probabilities.real * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300 w-12 text-right">
                  {(result.result.probabilities.real * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 dark:text-gray-400 w-24">Fake</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-red-500"
                    style={{ width: `${result.result.probabilities.fake * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300 w-12 text-right">
                  {(result.result.probabilities.fake * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

