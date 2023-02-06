import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artist: '',
    loading: false,
    filtered: [],
    frase: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  searchArtist = async () => {
    const { artist } = this.state;
    this.setState({
      loading: true,
    });
    const filteredArtist = await searchAlbumsAPI(artist);
    this.setState({
      filtered: [filteredArtist],
      loading: false,
      artist: '',
      frase: `Resultado de álbuns de: ${artist}`,
    });
  };

  render() {
    const { artist, loading, filtered, frase } = this.state;
    const minumum = 2;

    if (loading) {
      return (
        <>
          <Header />
          <div>Carregando...</div>
        </>
      );
    }

    if (filtered.length > 0) {
      return (
        <div>
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
              onClick={ this.searchArtist }
            >
              Pesquisar

            </button>
          </form>
          <div>
            { frase }
          </div>
          {
            filtered[0].length > 0 ? (filtered[0].map((album, index) => (
              <div key={ index }>
                <img src={ album.artworkUrl100 } alt="Arte do Album" />
                <h3>{album.artistName}</h3>
                <p>{album.collectionName}</p>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  Página do Album

                </Link>
              </div>
            ))) : (<p> Nenhum álbum foi encontrado </p>)
          }
        </div>
      );
    }

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
            onClick={ this.searchArtist }
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
