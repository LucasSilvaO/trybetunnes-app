import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    artistName: '',
    collectionName: '',
  };

  componentDidMount() {
    this.requestApi();
  }

  requestApi = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      artistName: [musics[0].artistName],
      collectionName: [musics[0].collectionName],
    });
  };

  render() {
    const { match: { params: { id } } } = this.props;
    const { artistName, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ artistName }</h2>
        <h3 data-testid="album-name">{ collectionName }</h3>
        <MusicCard id={ id } />
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.string.isRequired,
  params: PropTypes.string.isRequired,
};
