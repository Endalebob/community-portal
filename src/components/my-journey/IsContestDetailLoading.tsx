import React from "react";

const IsContestDetailLoading = () => {
  return (
    <div className="animate-pulse flex flex-col gap-6">
      <div className="w-36 my-4 mx-auto rounded-md  h-16 bg-slate-200"></div>
      <div className="flex flex-col gap-2">
        <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
        <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
        <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
        <div className="w-72 rounded-sm h-4 bg-slate-200"></div>
      </div>
    </div>
  );
};

export default IsContestDetailLoading;
