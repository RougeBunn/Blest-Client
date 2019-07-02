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

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = location.state || {}.from || '/';
    history.push(destination);
  };

  render() {
    return (
      // <AppContext.Consumer>
      //   {({ setLoggedInState }) => (
      //     <Section className="LoginPage">
      //       {console.log(setLoggedInState)}
      //       <h2>Login</h2>
      //       <LoginForm
      //         onLoginSuccess={this.handleLoginSuccess}
      //         setLoggedInState={setLoggedInState}
      //       />
      //     </Section>
      //   )}
      // </AppContext.Consumer>
      <AppContext.Consumer>
        {value => (
          <Section className="LoginPage">
            {console.log(value)}
            <h2>Login</h2>
            <LoginForm
              onLoginSuccess={this.handleLoginSuccess}
              // setLoggedInState={setLoggedInState}
            />
          </Section>
        )}
      </AppContext.Consumer>
    );
  }
}
