import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artist: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artist } = this.state;
    const minumum = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            value={ artist }
            type="text"
            data-testid="search-artist-input"
            name="artist"
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ artist.length < minumum }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
