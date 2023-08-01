import React from 'react'

const IsContestFormLoading = () => {
  return (
    <div className="rounded-md p-4 w-3/4 mt-28 mx-auto">
        <div className="animate-pulse flex">
          <div className="flex-1 space-y-6 py-1">
            <div className="space-y-3">
              <div className="pl-12 pr-12">
                <div className="h-6 bg-slate-100 rounded mt-8"></div>
                <div className="h-16 bg-slate-100 rounded mt-8"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="h-6 bg-slate-100 rounded mt-8 col-span-1"></div>
                  <div className="h-6 bg-slate-100 rounded mt-8 col-span-1"></div>
                </div>
                <div className="h-6 bg-slate-100 rounded mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default IsContestFormLoading;
