import React from 'react'

const IsOverviewLoading = () => {
  return (
      <div className="rounded-md p-4 w-full mx-auto m-12">
        <div className="animate-pulse flex flex-row flex-wrap">
          <div className="h-20 bg-slate-200 mt-8 w-64 rounded-xl ml-4 sm:ml-6"></div>
          <div className="h-20 bg-slate-200 rounded-xl mt-8 w-64 ml-4 sm:ml-6"></div>
          <div className="h-20 bg-slate-200 rounded mt-8 w-64 ml-4 sm:ml-6"></div>
        </div>
      </div>
  )
}

export default IsOverviewLoading
