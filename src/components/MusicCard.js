import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  state = {
    musics: [],
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

  render() {
    const { musics } = this.state;
    console.log(musics);
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
              <input type="checkbox" />
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
