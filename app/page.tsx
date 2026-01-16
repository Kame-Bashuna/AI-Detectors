import UploadArea from '@/components/UploadArea'

export default function Home() {
  return (
    <>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="max-w-3xl mx-auto mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-3">
            AI Disproval System
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-body">
            Upload any media file to verify authenticity. Our engine now detects AI patterns across text, images, and video in a single, streamlined interface.
          </p>
        </div>
        <UploadArea />
      </main>
    </>
  )
}

