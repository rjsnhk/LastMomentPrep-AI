import React from 'react'

const DeleteAlertContent = ({content,onDelete}) => {
  return (
    <div className='p-5'>
      <p className="text-[14px]">
        {content}
      </p>
      <div className="flex justify-end mt-6">
        <button className="btn-small" type='button' onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlertContent
