import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import LandingPage from '../../routes/LandingPage/LandingPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import BlessPage from '../../routes/BlessPage/BlessPage'
import UserPage from '../../routes/UserPage/UserPage'
import './App.css'
import { BlessContext } from '../../context'

class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render(){
    return (
      <BlessContext.Provider>
      <div className='App'>
        <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>Sorry there was an error</p>}
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
              path={'/'}
              component={UserPage}
            />
            {/* <Route
              exact
              path={'/'}
              component={BlessPage}
            /> */}
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </div>
      </BlessContext.Provider>
    )
  }
}

export default App;