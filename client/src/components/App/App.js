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
import ListApiService from '../../services/list-api-service';
import './App.css';
import '../../index.css';

export const AppContext = React.createContext();

class App extends Component {
  state = {
    hasError: false,
    isLoggedIn: false,
    blessingsFetched: false,
    blessings: []
    // listItems: []
  };

  /**
   * @param isUserLoggedIn boolean
   */
  setLoggedInState = isUserLoggedIn => {
    this.setState({
      isLoggedIn: isUserLoggedIn
    });
  };

  /**
   * @param userId number
   */
  fetchBlessings = userId => {
    console.log('user Id:', userId);
    if (this.state.blessingsFetched === false) {
      ListApiService.getUserWithBlessings(userId).then(
        blessingsFetchedFromAPI => {
          this.setState({
            blessings: blessingsFetchedFromAPI,
            blessingsFetched: true
          });
        }
      );
    }
  };

  /**
   * @param blessing { id: number, blessing: string }
   */
  updateBlessing = blessing => {
    const blessingWithoutModified = this.state.blessings.filter(
      b => b.id !== blessing.id
    );
    this.setState({
      blessings: [...blessingWithoutModified, blessing]
    });
  };

  saveBlessing = id => {
    const blessingToSave = this.state.blessings.find(b => b.id === id);
    console.log(blessingToSave, 'SAVE THIS');
  };

  deleteBlessing = id => {
    const leftOverBlessings = this.state.blessings.filter(b => b.id !== id);
    ListApiService.deleteBlessing(id).then(() => {
      this.setState({
        blessings: leftOverBlessings
      });
    });
    // TODO: catch block that would handle API errors and such
  };

  addBlessing = blessing => {
    ListApiService.addBlessing(blessing).then(responseFromAPI => {
      this.setState({
        blessings: [...this.state.blessings, responseFromAPI.blessing[0]]
      });
    });
  };

  componentDidMount() {
    const userToken = TokenService.getAuthToken();
    if (userToken) {
      this.setLoggedInState(true);
    }
  }
  render() {
    console.log('current state', this.state);
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          // setIsUserLogedIn
          // setAuth
          setLoggedInState: this.setLoggedInState,
          blessings: this.state.blessings
        }}
      >
        <div className="App">
          <header className="App__header">
            <Route
              path={'/'}
              component={props => (
                <Header {...props} setLoggedInState={this.setLoggedInState} />
              )}
            />
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
              {/* <PrivateRoute
                path={'/blesspage/:userid'}
                render={() => <BlessPage blessings={this.state.blessings} />}
              /> */}
              {/* <PrivateRoute path={'/userpage/:userId'} component={UserPage} /> */}
              <PrivateRoute
                path={`/userpage/:userId`}
                component={props => (
                  <UserPage
                    {...props}
                    blessings={this.state.blessings}
                    fetchBlessings={this.fetchBlessings}
                  />
                )}
              />
              <PrivateRoute
                path={`/blesspage/:userId`}
                component={props => (
                  <BlessPage
                    {...props}
                    fetchBlessings={this.fetchBlessings}
                    blessings={this.state.blessings}
                    updateBlessing={this.updateBlessing}
                    saveBlessing={this.saveBlessing}
                    addBlessing={this.addBlessing}
                    deleteBlessing={this.deleteBlessing}
                  />
                )}
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
