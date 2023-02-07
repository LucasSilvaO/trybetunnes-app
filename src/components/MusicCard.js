import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    musics: [],
    favoriteSongs: [],
    loading: false,
  };

  componentDidMount() {
    this.atualizaEstado();
  }

  atualizaEstado = async () => {
    const { id } = this.props;
    const musics = await getMusics(id);
    const tracks = await musics.filter((element) => element.kind === 'song');
    this.setState({
      musics: [tracks],
    });
    this.setState({
      loading: true,
    });
    const favoriteStoraged = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs: favoriteStoraged,
    });
  };

  favoriteSong = async (event) => {
    const { musics, favoriteSongs } = this.state;
    this.setState({
      loading: true,
    });
    const { target: { name, checked } } = event;
    if (checked) {
      const favorite = musics[0].filter((track) => track.trackId === parseInt(name, 10));
      await addSong(favorite);
      this.setState({
        favoriteSongs: [...favoriteSongs, favorite],
      });
    } else {
      const excMusic = musics[0].find((track) => track.trackId === parseInt(name, 10));
      const filteredSongs = favoriteSongs.filter((track) => (
        track[0].trackId !== excMusic.trackId));
      this.setState({
        loading: false,
        favoriteSongs: filteredSongs,
      }, localStorage.setItem('favorite_songs', JSON.stringify(filteredSongs)));
    }
    this.setState({
      loading: false,
    });

    if (JSON.parse(localStorage.getItem(name))) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, JSON.stringify(true));
    }
  };

  render() {
    const { musics, loading } = this.state;
    if (loading) {
      return (
        <div>Carregando...</div>
      );
    }
    return (
      <div>
        {
          musics.length > 0 && (musics[0].map((music, index) => (
            <div key={ index }>
              <h4>
                {music.trackName}
              </h4>
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor={ `${music.trackName}` }>
                Favorita
                <input
                  data-testid={ `checkbox-music-${music.trackId}` }
                  id={ `${music.trackName}` }
                  name={ `${music.trackId}` }
                  onChange={ this.favoriteSong }
                  type="checkbox"
                  checked={ JSON.parse(localStorage.getItem(music.trackId)) }
                />
              </label>

            </div>
          )))

        }
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  id: PropTypes.string.isRequired,
};
