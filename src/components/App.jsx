import React from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends React.Component {
  state = {
    searchImage: "",
  };


handleFormSubmit = searchImage => {
 this.setState({searchImage})
}

 

  render() {

    return (
      <div className="App">
        <Searchbar onSubmit = {this.handleFormSubmit}></Searchbar>
        <ImageGallery searchImage = {this.state.searchImage}></ImageGallery>
        
      </div>
    );
  }
}

export default App;
