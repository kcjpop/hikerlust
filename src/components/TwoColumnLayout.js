import React from 'react'

export default function(props) {
  return (
    <div className="flex flex-column flex-row-ns mt4">
      <div className="w-70-ns pr4">{props.main()}</div>

      <div className="w-30-ns">{props.sidebar()}</div>
    </div>
  )
}
