import React from "react";

const IsResourceLoading = () => {
  return (
    <div className="w-full p-4  animate-pulse flex flex-col gap-16">
      <div className="flex flex-col w-full gap-2">
        <div className="w-[80%] h-4 bg-slate-200 rounded-sm"></div>
        <div className="w-[30%] h-4 bg-slate-200 rounded-sm"></div>
      </div>

      <div className=" flex flex-col w-full gap-12">
        <div className="flex w-full flex-col gap-4 rounded">
          <div className="h-4 bg-slate-200 w-1/4 "></div>
          <div className="h-4 bg-slate-200 w-1/2"></div>
          <div className="h-4 bg-slate-200 w-3/4"></div>
          <div className="h-4 bg-slate-200 w-1/3"></div>
          <div className="h-4 bg-slate-200 w-3/4"></div>
          <div className="h-4 bg-slate-200 w-1/2"></div>
          <div className="h-4 bg-slate-200 w-1/4"></div>
        </div>
        <div className="w-1/3 h-56 rounded-md bg-slate-200"></div>
        <div className="flex w-full flex-col gap-4 rounded">
          <div className="h-4 bg-slate-200 w-1/4 "></div>
          <div className="h-4 bg-slate-200 w-1/2"></div>
          <div className="h-4 bg-slate-200 w-3/4"></div>
          <div className="h-4 bg-slate-200 w-3/4"></div>
          <div className="h-4 bg-slate-200 w-3/4"></div>
          <div className="h-4 bg-slate-200 w-1/2"></div>
          <div className="h-4 bg-slate-200 w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default IsResourceLoading;
