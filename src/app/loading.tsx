export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" role="status" aria-live="polite">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-4" aria-hidden="true"></div>
        <div className="text-2xl font-bold text-navy mb-2">
          The School of <span className="text-accent">Options</span>
        </div>
        <span className="sr-only">Loading content, please wait...</span>
      </div>
    </div>
  );
}
