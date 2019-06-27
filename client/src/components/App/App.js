import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import uuidv4 from 'uuid';
import Header from '../Header/Header';
import LandingPage from '../../routes/LandingPage/LandingPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import BlessPage from '../../routes/BlessPage/BlessPage';
import UserPage from '../../routes/UserPage/UserPage';
import ListApiService from '../../services/list-api-service';
import './App.css';

export const AppContext = React.createContext();

class App extends Component {
  state = {
    hasError: false
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
              <Route exact path={'/'} component={LandingPage} />
              <PublicOnlyRoute path={'/login'} component={LoginPage} />
              <PublicOnlyRoute
                path={'/register'}
                component={RegistrationPage}
              />
              <PrivateRoute
                path={'/blesspage/:userid'}
                component={BlessPage}
                // render={() => <BlessPage blessings={this.state.blessings} />}
              />
              <PrivateRoute
                path={'/userpage/:userid'}
                component={UserPage}
                // render={() => <UserPage blessings={this.state.blessings} />}
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
