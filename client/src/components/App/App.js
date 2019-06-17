import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import uuidv4 from 'uuid';
import Header from '../Header/Header';
import LandingPage from '../../routes/LandingPage/LandingPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicRoute from '../Utils/PublicRoute';
//import IdleService from '../../services/idle-service';
import BlessPage from '../../routes/BlessPage/BlessPage';
import UserPage from '../../routes/UserPage/UserPage';
import ListApiService from '../../services/list-api-service';
import './App.css';

export const AppContext = React.createContext();

class App extends Component {
  state = {
    blessings: [],
    handleAddBlessing: blessing => {
      const newBlessings = [
        ...this.state.blessings,
        {
          id: uuidv4(),
          blessing
        }
      ];
      this.setState({
        blessings: newBlessings
      });
    },
    handleRemoveBlessing: id => {
      const newBlessings = this.state.blessings.filter(
        blessing => id !== blessing.id
      );
      this.setState({
        blessings: newBlessings
      });
    },
    hasError: false,
    listItems: []
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }
  componentDidMount() {
    // fetch.get("/blessings").then(data => {
    //   this.setState({
    //     blessings: data.blessings
    //   });
    // });
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    //IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      //IdleService.regiserIdleTimerResets();

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    //IdleService.unRegisterIdleResets();
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    //IdleService.unRegisterIdleResets();
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
  };
  // Login page will take you userpage which will have basic functionality.
  //  Authentication and notifications aren't built yet.

  render() {
    return (
      <AppContext.Provider value={this.state}>
        <div className="App">
          <header className="App__header">
            <Header />
          </header>
          <main className="App__main">
            {this.state.hasError && (
              <p className="red">Sorry there was an error</p>
            )}
            <Switch>
              <PublicRoute path={'/login'} component={LoginPage} />
              <PublicRoute path={'/register'} component={RegistrationPage} />
              <PrivateRoute
                exact
                path={'/blesspage/:userId'}
                render={() => <BlessPage blessings={this.state.blessings} />}
              />
              <PrivateRoute
                path={'/userpage/:userId'}
                render={() => <UserPage blessings={this.state.blessings} />}
              />
              <Route path={'/'} component={LandingPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
        )}
      </AppContext.Provider>
    );
  }
}

export default App;
