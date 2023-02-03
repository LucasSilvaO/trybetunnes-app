import React from 'react';
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
        <h2 data-testid="header-user-name">{ name }</h2>
      </header>
    );
  }
}

export default Header;
