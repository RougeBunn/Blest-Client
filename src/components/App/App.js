import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import uuidv4 from "uuid";
import Header from "../Header/Header";
import LandingPage from "../../routes/LandingPage/LandingPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";
import NotFoundPage from "../../routes/NotFoundPage/NotFoundPage";
import BlessPage from "../../routes/BlessPage/BlessPage";
import UserPage from "../../routes/UserPage/UserPage";
import "./App.css";

class App extends Component {
  state = { hasError: false, listItems: [] };

  componentDidMount() {
    // fetch.get("/blessings").then(data => {
    //   this.setState({
    //     blessings: data.blessings
    //   });
    // });
    this.setState({
      blessings: [
        {
          id: uuidv4(),
          blessing: "football"
        },
        {
          id: uuidv4(),
          blessing: "basketball"
        },
        {
          id: uuidv4(),
          blessing: "water"
        }
      ]
    });
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <Header />
        </header>
        <main className="App__main">
          {this.state.hasError && (
            <p className="red">Sorry there was an error</p>
          )}
          <Switch>
            {/* {/* <Route
              exact
              path={'/'}
              component={LandingPage}
            />  
            <Route
              path={'/login'}
              component={LoginPage}
            />
            <Route
              path={'/register'}
              component={RegistrationPage}
            /> */}
            <Route
              path={"/"}
              component={() => <UserPage blessings={this.state.blessings} />}
            />
            {/* <Route
              exact
              path={"/"}
              component={() => <BlessPage blessings={this.state.blessings} />}
            /> */}
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
