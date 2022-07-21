import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from "components/Button/Button";
import { Audio } from  'react-loader-spinner'

class ImageGallery extends React.Component {
  state = {
    image: null,
    error: null,
    status: "idle",
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchImage !== this.props.searchImage){
        this.setState({page: 1})
    }
    if (prevProps.searchImage !== this.props.searchImage || prevState.page !== this.state.page) {
      this.setState({ status: "pending"});
      fetch(
        `https://pixabay.com/api/?key=26992012-e6a459b4fdd9a0e95b25f973a&q=${this.props.searchImage}&per_page=12&page=${this.state.page}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
              new Error(`немає зображень з назвою ${this.props.seachImage}`)
          )
        })
        .then(image => this.setState({ image, status: "resolved" }))
        .catch(error => this.setState({ error, status: "rejected" }))
        
    }
  }
  loadMore=()=> {
      this.setState(prevState=> ({page: prevState.page + 1}))
  }

  render() {
    const { image, error, status} = this.state;

    if (status === "idle") {
        return (<div>Введіть назву зображення</div>)
    }

    if (status === "pending") {
        return (<Audio></Audio>)
    }

    if (status === "rejected") {
        return <div>{error.message}</div>
    }

    if (status === "resolved") {
        return <div>
        <ul className="ImageGallery">{image.hits.map(e => <ImageGalleryItem key = {e.id} src = {e.webformatURL}></ImageGalleryItem>)}</ul>
        <Button onClick={this.loadMore}></Button></div>
    }
  }
}

export default ImageGallery;

