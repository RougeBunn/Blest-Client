import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import { Redirect } from 'react-router-dom';
import { Section } from '../../components/Utils/Utils';
import { AppContext } from '../../components/App/App';

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = userId => {
    // const { location, history } = this.props;
    // const destination = location.state || {}.from || '/';
    // history.push(destination);
    this.props.history.push(`/userpage/${userId}`);
    localStorage.setItem('userId', userId);
  };

  render() {
    return (
      <AppContext.Consumer>
        {value => (
          <Section className="LoginPage">
            <h2>Login</h2>
            <LoginForm
              onLoginSuccess={this.handleLoginSuccess}
              setLoggedInState={value.setLoggedInState}
            />
          </Section>
        )}
      </AppContext.Consumer>
    );
  }
}
