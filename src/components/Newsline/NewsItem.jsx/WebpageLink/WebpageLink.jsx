import React from 'react'

export const WebpageLink = ({data}) => {

  return (
    <div className='webpage'>
      <a href={data.url} className="webpage__link"></a>
      <div className="webpage__container">
        <a href={`https://${data.caption}`} className='webpage__caption'>{data.caption}</a>
        <h3 className='webpage__title'>{data.title}</h3>
        <p className="webpage__desc">{data.description}</p>
      </div>
    </div>
  )
}
