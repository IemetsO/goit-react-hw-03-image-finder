import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import { Audio } from 'react-loader-spinner';
import '../styles.css';
import PropTypes from 'prop-types';

class ImageGallery extends React.Component {
  state = {
    image: null,
    hits: [],
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
    largeImageURL: null,
    total: 0
    
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchImage !== this.props.searchImage) {
      this.setState({ page: 1, hits: [], total: 0});
    }
    if (
      prevProps.searchImage !== this.props.searchImage ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      fetch(
        `https://pixabay.com/api/?key=26992012-e6a459b4fdd9a0e95b25f973a&q=${this.props.searchImage}&per_page=12&page=${this.state.page}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error());
        })
        .then(image =>
          this.setState(prevState => ({
            image,
            total: image.totalHits,
            hits: [...prevState.hits, ...image.hits],
            status: 'resolved',
          }))
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = imageID => {
    this.state.hits.forEach(e => {
      if (e.id === imageID) {
        this.setState({ largeImageURL: e.largeImageURL });
      }
    });
    this.setState({ showModal: !this.state.showModal });
  };

  closeModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { hits, status, showModal, largeImageURL, total, page } = this.state;

    return (
      <div>
        {hits.length !== 0 &&
        <div>
        <ul className="ImageGallery">
          {hits.map(e => (
            <ImageGalleryItem
              key={e.id}
              src={e.webformatURL}
              onClick={() => this.openModal(e.id)}
            ></ImageGalleryItem>
          ))}
        </ul>
      { total !== page * hits.length && 
        <Button onClick={this.loadMore}></Button>}
        {showModal && (
          <Modal src={largeImageURL} onClose={this.closeModal}></Modal>
        )} </div>
        }
    {status === 'pending' &&  <Audio></Audio> }
    {status === 'idle' &&  <div>Введіть назву зображення</div> }
    {hits.length === 0 && status !== 'idle' && <div>немає зображень з такою назвою</div> }
    </div>
    )   
}}

export default ImageGallery;

ImageGallery.propTypes = {
  searchImage: PropTypes.string.isRequired,
};
