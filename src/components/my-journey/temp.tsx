import React from 'react'
import Connector from './Connector'
import CheckBox from './CheckBox'

function temp() {
  return (
    <div>
        
      <div className="flex w-full">
        <div className="grid grid-rows-2 justify-items-center">
          <div className="flex items-center">
            <CheckBox status="completed" />
          </div>

          <div className="flex flex-col text-center">
            <p className="font-semibold">Step 1</p>
            <p>description</p>
          </div>
        </div>
        <div className="w-full grid grid-rows-2 justify-items-center -mx-6">
          <div className="w-full flex items-center">
            <Connector fill />
          </div>
        </div>
      </div>

      <div className="flex w-full">
        <div className="grid grid-rows-2 justify-items-center">
          <div className="flex items-center">
            <CheckBox status="inprogress" />
          </div>

          <div className="flex flex-col text-center">
            <p className="font-semibold">Step 1</p>
            <p>description</p>
          </div>
        </div>
        <div className="w-full grid grid-rows-2 justify-items-center -mx-6">
          <div className="w-full flex items-center">
            <Connector />
          </div>
        </div>
      </div>

      <div className="flex w-full">
        <div className="grid grid-rows-2 justify-items-center">
          <div className="flex items-center">
            <CheckBox status="notstarted" />
          </div>

          <div className="flex flex-col text-center">
            <p className="font-semibold">Step 1</p>
            <p>description</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default temp