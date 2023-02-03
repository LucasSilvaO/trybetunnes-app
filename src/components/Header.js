import React from 'react';
import { Link } from 'react-router-dom';
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
        <h1>Cabeçalho</h1>
        <h2 data-testid="header-user-name">
          {`Bem vindo ${name}.`}
        </h2>
        <div>
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        </div>
        <div>
          <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
        </div>
        <div>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </div>
      </header>
    );
  }
}

export default Header;
