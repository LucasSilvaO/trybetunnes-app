import React from 'react';
import { Link } from 'react-router-dom';
import trybetunnesLogo from '../trybetunnes.svg';
import searchIcon from '../searchIcon.svg';
import favIcon from '../favIcon.svg';
import perfilIcon from '../perfilIcon.svg';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    name: '',
    loading: true,
  };

  componentDidMount() {
    this.user();
  }

  user = async () => {
    const usuario = await getUser();
    this.setState({
      name: usuario.name,
      loading: false,
    });
  };

  render() {
    const { name, loading } = this.state;
    if (loading) {
      return (
        <div>Carregando...</div>
      );
    }
    return (
      <header data-testid="header-component">
        <img src={ trybetunnesLogo } alt="logo" id="logo" />
        <h2 data-testid="header-user-name">
          {`Bem vindo ${name}.`}
        </h2>
        <div className="menu_container">
          <div>
            <img src={ searchIcon } alt="search icon" />
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          </div>
          <div>
            <img src={ favIcon } alt="favorite icon" />
            <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
          </div>
          <div>
            <img src={ perfilIcon } alt="perfil icon" />
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
