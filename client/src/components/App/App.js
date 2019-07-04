import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
//import uuidv4 from 'uuid';
import Header from '../Header/Header';
import LandingPage from '../../routes/LandingPage/LandingPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import BlessPage from '../../routes/BlessPage/BlessPage';
import UserPage from '../../routes/UserPage/UserPage';
import TokenService from '../../services/token-service';
//import ListApiService from '../../services/list-api-service';
import './App.css';

// export const AppContext = React.createContext({
//   isLoggedIn: false,
//   setLoggedInState: () => {}
// });
export const AppContext = React.createContext();

class App extends Component {
  state = {
    hasError: false,
    isLoggedIn: false
    //setLoggedInState: this.setLoggedInState

    //blessings: [],
    // handleAddBlessing: blessing => {
    //   const newBlessings = [
    //     ...this.state.blessings,
    //     {
    //       id: uuidv4(),
    //       blessing
    //     }
    //   ];
    //   this.setState({
    //     blessings: newBlessings
    //   });
    // },
    // handleRemoveBlessing: id => {
    //   const newBlessings = this.state.blessings.filter(
    //     blessing => id !== blessing.id
    //   );
    //   this.setState({
    //     blessings: newBlessings
    //   });
    // },

    // listItems: []
  };

  setLoggedInState = isLoggedIn => {
    this.setState({
      isLoggedIn
    });
  };

  componentDidMount() {
    const userToken = TokenService.getAuthToken();
    if (userToken) {
      this.setLoggedInState(true);
    }
    // fetch.get("/blessings").then(data => {
    //   this.setState({
    //     blessings: data.blessings
    //   });
    // });
    // Login page will take you userpage which will have basic functionality.
    //  Authentication and notifications aren't built yet.
  }
  render() {
    console.log('current state', this.state);
    return (
      <AppContext.Provider
        value={{ state: this.state, setLoggedInState: this.setLoggedInState }}
      >
        <div className="App">
          <h1>test 1</h1>
          <header className="App__header">
            <Header setLoggedInState={this.setLoggedInState} />
          </header>
          <h2>test</h2>
          <main className="App__main">
            {this.state.hasError && (
              <p className="red">Sorry there was an error</p>
            )}
            <Switch>
              <Route exact path={'/'} component={LandingPage} />
              <PublicOnlyRoute path={'/login'} component={LoginPage} />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationPage}
              />
              <PrivateRoute
                path={'/blesspage/:userid'}
                render={() => <BlessPage blessings={this.state.blessings} />}
              />
              <PrivateRoute
                path={'/userpage/:userid'}
                render={() => <UserPage blessings={this.state.blessings} />}
              />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
