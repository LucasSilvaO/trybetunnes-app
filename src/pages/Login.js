import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    nome: '',
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { nome } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: nome });
    history.push('/search');
  };

  render() {
    const { nome, loading } = this.state;
    const nameMinimum = 3;

    if (loading) {
      return (<div>Carregando...</div>);
    }
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              name="nome"
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            disabled={ nome.length < nameMinimum }
            onClick={ this.handleClick }
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
};

export default Login;
