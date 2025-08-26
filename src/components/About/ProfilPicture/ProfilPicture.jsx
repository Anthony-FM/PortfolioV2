import React from 'react'

export default function ProfilPicture({image, alt}) {
  return (
    <aside
      className='leftSideContainer'
    >
      <h1 
        className="aboutTitle">
        À Propos
      </h1>

      <div
        className='PictureContainer'
      >
        <div
          className='pictureHider'>          
        </div>

          <img 
              src={image} 
              alt={alt} />
      </div>
    </aside>
  )
}