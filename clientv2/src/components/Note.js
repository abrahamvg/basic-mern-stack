import React from 'react'

export default function Note({id,title,note}) {
  return (
    <>
        <div key={id} className="w-fit md:w-full h-48 flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 bg-yellow-500 w-96 mr-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {title}
                </h3>
                <p className="mt-2 text-gray-800 dark:text-white">
                    {note}
                </p>
        </div>
    </>
  )
}
