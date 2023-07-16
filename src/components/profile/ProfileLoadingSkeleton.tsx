import React from "react";

const ProfileLoadingSkeleton = () => {
  return (
    <section className="bg-[#F6F6FC]">
      <h1 className="ml-28 py-8 text-xl md:text-2xl text-gray-500 font-bold font-sans">
        Profile
      </h1>

      <div className="grid grid-cols-1 items-start md:grid-cols-6 md:p-4 xl:px-20 space-y-6 md:space-y-0 lg:space-x-6 mx-2">
        <div className="flex flex-col gap-5 justify-center items-center  md:col-span-3 xl:col-span-2">
          {/* ProfileCardSkeleton  */}
          <div className="w-96 mx-2 rounded overflow-hidden bg-white shadow-lg p-10 animate-pulse">
            <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 bg-gray-300 h-8 rounded-lg"></div>
            </div>

            <div className="flex ml-2 justify-start items-center space-x-5">
              <div className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-300 animate-pulse"></div>
              <div className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-300 animate-pulse"></div>
            </div>

            <div className="mt-10">
              <div className="w-24 h-8 bg-primary text-white font-bold rounded-full text-center"></div>
            </div>
          </div>
          <div className="w-96 mx-2">
            <h1 className="font-light font-sans uppercase whitespace-nowrap p-6 bg-white">
              Programming site handles
            </h1>
            <div className="space-y-2 max-w-md rounded overflow-hidden shadow-lg p-10 align-top bg-white animate-pulse">
              {/* ProgrammingHandlesSkeleton */}
              <div className="bg-white flex justify-between items-center w-full p-3">
                <div className="flex justify-center items-center space-x-4">
                  <div className="bg-gray-300 p-3 rounded-full animate-pulse"></div>
                  <div>
                    <h4 className="text-gray-700 font-semibold bg-gray-300 h-5 rounded-lg animate-pulse"></h4>
                    <p className="text-xs text-gray-500 bg-gray-300 h-3 rounded-lg animate-pulse"></p>
                  </div>
                </div>
                <div className="bg-gray-300 w-8 h-8 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* <StudentDetailSkeleton */}
        <div className=" bg-white md:col-span-3 xl:col-span-4 p-2 md:p-7 animate-pulse">
          <div className="flex justify-end items-center font-light bg-gray-300 h-6 rounded-lg animate-pulse"></div>

          <div className="px-4 py-6 my-0.5 shadow-sm justify-between  text-gray-500 ">
            <h2 className="font-bold text-xl capitalize mb-3 bg-gray-300 h-7 rounded-lg animate-pulse"></h2>
            <p className="bg-gray-300 h-4 rounded-lg animate-pulse"></p>
          </div>

          <div className="py-4 px-4">
            <div className="flex w-full font-medium text-gray-700 py-2 space-x-10 items-center">
              <h3 className="whitespace-nowrap bg-gray-300 h-5 rounded-lg animate-pulse"></h3>
              <div className="w-full">
                <hr />
              </div>
            </div>

            {/* Basic Info */}
            <div className="my-6">
              <div className="flex w-full font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
                <h3 className="whitespace-nowrap uppercase font-light bg-gray-300 h-5 rounded-lg animate-pulse"></h3>
                <div className="w-full">
                  <hr />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 lg:grid-cols-6 ">
                <div className="col-span-1 grid-rows-4 grid-cols-1 space-y-5">
                  <p className="whitespace-nowrap bg-gray-300 h-4 rounded-lg animate-pulse"></p>
                  <p className="whitespace-nowrap bg-gray-300 h-4 rounded-lg animate-pulse"></p>
                  <p className="whitespace-nowrap bg-gray-300 h-4 rounded-lg animate-pulse"></p>
                  <p className="whitespace-nowrap bg-gray-300 h-4 rounded-lg animate-pulse"></p>
                </div>

                <div className="col-span-1 grid-rows-4 grid-cols-1 space-y-5">
                  <span className="block text-gray-500 bg-gray-300 h-4 rounded-lg animate-pulse"></span>

                  <span className="block text-gray-500 bg-gray-300 h-4 rounded-lg animate-pulse"></span>

                  <span className="block text-gray-500 bg-gray-300 h-4 rounded-lg animate-pulse"></span>

                  <span className="block text-gray-500 bg-gray-300 h-4 rounded-lg animate-pulse"></span>
                </div>
              </div>
            </div>

            {/* Work and Education */}

            <div className="my-6">
              <div className="flex w-full font-medium text-gray-700 py-2 items-center space-x-10 justify-between">
                <h3 className="whitespace-nowrap uppercase font-light bg-gray-300 h-5 rounded-lg animate-pulse"></h3>
                <div className="w-full">
                  <hr />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 lg:grid-cols-6 ">
                <div className="col-span-1 grid-rows-4 grid-cols-1 space-y-5">
                  <p className="whitespace-nowrap bg-gray-300 h-4 rounded-lg animate-pulse"></p>
                  <p className="whitespace-nowrap bg-gray-300 h-4 rounded-lg animate-pulse"></p>
                  <p className="whitespace-nowrap bg-gray-300 h-4 rounded-lg animate-pulse"></p>
                  <p className="whitespace-nowrap bg-gray-300 h-4 rounded-lg animate-pulse"></p>
                </div>

                <div className="col-span-1 grid-rows-4 grid-cols-1 space-y-5">
                  <span className="block text-gray-500 bg-gray-300 h-4 rounded-lg animate-pulse"></span>

                  <span className="block text-gray-500 bg-gray-300 h-4 rounded-lg animate-pulse"></span>

                  <span className="block text-gray-500 bg-gray-300 h-4 rounded-lg animate-pulse"></span>

                  <span className="block text-gray-500 bg-gray-300 h-4 rounded-lg animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileLoadingSkeleton;
