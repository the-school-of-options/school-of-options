export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green mx-auto mb-4"></div>
        <div className="text-2xl font-bold text-navy mb-2">
          The School of <span className="text-green">Options</span>
        </div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
