import React from 'react';
import '../styles.css';

class Searchbar extends React.Component {
    state= {
        searchImage: "",
    }

    handleChangeImage=e=>
    {
        this.setState({searchImage: e.currentTarget.value.toLowerCase()})
    }
    handleSubmit=e => {
        e.preventDefault()

        if(this.state.searchImage.trim() === ""){
            alert("Введіть назву зображення")
            return
        }
        this.props.onSubmit(this.state.searchImage)
        this.setState({searchImage: ""})
    }

  render() {
    return (
        <header className="Searchbar">
  <form className="SearchForm" onSubmit={this.handleSubmit}>
    <button type="submit" className="SearchForm-button">
      <span className="SearchForm-button-label">Search</span>
    </button>

    <input
      className="SearchForm-input"
      type="text"
      value={this.state.searchImage}
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
      onChange={this.handleChangeImage}
    />
  </form>
</header>
      
    );
  }
}

export default Searchbar;
