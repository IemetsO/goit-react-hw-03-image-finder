import React from 'react';

const ImageGalleryItem = ({id, src}) => {
    return (
        <li className="ImageGalleryItem">
  <img className="ImageGalleryItem-image" src={src} alt="Зображення" />
</li>
    );
  };
  
  
  export default ImageGalleryItem;
