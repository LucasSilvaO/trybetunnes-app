import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

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
  };

  favoriteSong = async (event) => {
    const { musics, favoriteSongs } = this.state;
    this.setState({
      loading: true,
    });
    const { target: { name, checked } } = event;
    console.log(checked);
    localStorage.setItem(name, JSON.stringify(true));
    const favorite = musics[0].filter((track) => track.trackId === parseInt(name, 10));
    await addSong(favorite);
    this.setState({
      favoriteSongs: [...favoriteSongs, favorite],
      loading: false,
    });
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
              <label htmlFor="favorite-songs">
                Favorita
                <input
                  id="favorite-songs"
                  name={ `${music.trackId}` }
                  onChange={ this.favoriteSong }
                  type="checkbox"
                  data-testid={ `checkbox-music-${music.trackId}` }
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
