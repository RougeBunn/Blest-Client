import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import uuidv4 from 'uuid';
import Header from '../Header/Header';
import LandingPage from '../../routes/LandingPage/LandingPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicRoute from '../Utils/PublicRoute';
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
    // Login page will take you userpage which will have basic functionality.
    //  Authentication and notifications aren't built yet.
  }
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
                path={'/blesspage/:userid'}
                render={() => <BlessPage blessings={this.state.blessings} />}
              />
              <PrivateRoute
                path={'/userpage/:userid'}
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
