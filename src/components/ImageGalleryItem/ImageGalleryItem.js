import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

const ImageGalleryItem = ({ src, onClick}) => {
    return (
        <li className="ImageGalleryItem" onClick={onClick}>
  <img className="ImageGalleryItem-image" src={src} alt="Зображення" />
</li>
    );
  };
  
  
  export default ImageGalleryItem;

  ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }