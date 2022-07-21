import Modal from './Modal/Modal';
import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends React.Component {
  state = {
    showModal: false,
    searchImage: "",
  };


handleFormSubmit = searchImage => {
 this.setState({searchImage})
}

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { showModal } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit = {this.handleFormSubmit}></Searchbar>
        <ImageGallery searchImage = {this.state.searchImage}></ImageGallery>
        <button type="button" onClick={this.toggleModal}>
          open
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <button type="button" onClick={this.toggleModal}>
              close
            </button>
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
