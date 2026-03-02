export default function DashboardPage() {
  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
        {/* Placeholder for Add Task Button */}
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2 shadow-sm"
        >
          <span className="mr-2 text-lg leading-none">+</span>
          New Task
        </button>
      </div>

      {/* Task List Skeleton Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Skeleton Card 1 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-pulse flex flex-col justify-between h-48">
          <div>
            <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Skeleton Card 2 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-pulse flex flex-col justify-between h-48">
          <div>
            <div className="h-5 bg-gray-200 rounded-md w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-4/6"></div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>

        {/* Skeleton Card 3 */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-pulse flex flex-col justify-between h-48">
          <div>
            <div className="h-5 bg-gray-200 rounded-md w-4/5 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
