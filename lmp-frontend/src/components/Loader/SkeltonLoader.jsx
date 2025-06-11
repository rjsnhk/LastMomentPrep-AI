const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-4 max-w-3xl mt-10">
      <div className="bg-gray-200 rounded-md dark:bg-gray-700 h-6 w-9/12"></div>
      <div className="bg-gray-200 rounded-md dark:bg-gray-700 h-4 w-11/12"></div>
      <div className="bg-gray-200 rounded-md dark:bg-gray-700 h-4 w-10/12"></div>
      <div className="bg-gray-200 rounded-md dark:bg-gray-700 h-4 w-9/12"></div>
      <div className="bg-gray-200 rounded-md dark:bg-gray-700 h-4 w-1/2 mt-8"></div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 space-y-2 rounded-md">
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
