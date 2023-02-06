import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    artistName: '',
    collectionName: '',
    musics: [],
  };

  componentDidMount() {
    this.requestApi();
  }

  requestApi = async () => {
    const { id } = this.props.match.params;
    const musics = await getMusics(id);
    const tracks = await musics.filter((element) => element.wrapperType === 'track');
    this.setState({
      artistName: [musics[0].artistName],
      collectionName: [musics[0].collectionName],
      musics: [tracks],
    });
  };

  render() {
    const { id } = this.props.match.params;
    const { artistName, collectionName, musics } = this.state;
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
