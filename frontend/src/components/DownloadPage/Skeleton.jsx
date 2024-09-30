import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonDownload = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="text-center">
        <Skeleton height={40} width={300} />
        <p className="mt-4">
          <Skeleton height={20} width={400} />
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            <Skeleton height={30} width={200} />
          </h2>
          <Skeleton height={150} width="100%" />
          <Skeleton height={150} width="100%" />
        </div>
        <div className="ml-8">
          <h2 className="text-2xl font-semibold mb-4">
            <Skeleton height={30} width={200} />
          </h2>
          <Skeleton height={150} width="100%" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDownload;
