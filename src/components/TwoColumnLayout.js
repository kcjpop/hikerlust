import React from 'react'

export default function(props) {
  return (
    <div className="flex flex-column flex-row-ns mt4-ns ph3 pt3 pa0-ns">
      <div className="w-70-ns pr4-ns">{props.main()}</div>

      <div className="w-30-ns">{props.sidebar()}</div>
    </div>
  )
}
