import React from 'react'

const IsResourcesLoading = () => {
  return (
    <div className="flex flex-col animate-pulse p-4 gap-16">
            <div className="flex flex-col gap-4">
              <div className="w-[60%] h-4 bg-gray-200 rounded-sm"></div>
              <div className="w-[80%] h-4 bg-gray-200 rounded-sm"></div>
              <div className="w-[50%] h-4 bg-gray-200 rounded-sm"></div>
              <div className="w-[100%] h-4 bg-gray-200 rounded-sm"></div>
              <div className="w-[80%] h-4 bg-gray-200 rounded-sm"></div>
              <div className="w-[50%] h-4 bg-gray-200 rounded-sm"></div>
            </div>

            <div className="w-[50%] h-12 bg-gray-200 rounded-sm"></div>
          </div>
  )
}

export default IsResourcesLoading
