export function About() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center">
            <img src="/icons/hype-logo.jpeg" alt="Hype OS Logo" className="w-20 h-20 rounded-2xl" />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Hype OS X
            </h1>
            <p className="text-sm text-gray-600">
              Version 10.1 (Build 2025.10.01)
            </p>
          </div>

          <div className="w-full border-t border-gray-200 pt-4 mt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Processor:</span>
              <span>Web Browser</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Memory:</span>
              <span>Unlimited</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Graphics:</span>
              <span>WebGL 2.0</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center pt-4">
            © 2025 HypeOS. You are one connection away of your breakthrough. Mac OS X 10.1
          </p>
        </div>
      </div>
    </div>
  );
}
