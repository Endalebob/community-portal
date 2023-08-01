import React from "react";

const IsContestLoading = () => {
  return (
    <div className="rounded-md p-4 w-full mx-auto m-12">
      <div className="animate-pulse flex flex-row flex-wrap">
        <div className="h-20 bg-slate-200 mt-8 w-64 rounded-xl ml-4 sm:ml-6"></div>
        <div className="h-20 bg-slate-200 rounded-xl mt-8 w-64 ml-4 sm:ml-6"></div>
        <div className="h-20 bg-slate-200 rounded mt-8 w-64 ml-4 sm:ml-6"></div>
      </div>
      <div className="animate-pulse flex space-x-4 space-y-8">
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="pl-8 pr-8">
              <div className="h-8 bg-slate-200 rounded mt-8"></div>
              <div className="h-8 bg-slate-200 rounded mt-8"></div>
              <div className="h-8 bg-slate-200 rounded mt-8"></div>
              <div className="h-8 bg-slate-200 rounded mt-8"></div>
              <div className="h-8 bg-slate-200 rounded mt-8"></div>
              <div className="h-8 bg-slate-200 rounded mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsContestLoading;
