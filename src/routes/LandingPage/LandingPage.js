import React, { Component } from 'react'
import './LandingPage.css'

export default class LandingPage extends Component {
    render() {
        return (
            <main role="main">
            <section>
              <header>
                  <h3>Be Thankful!</h3>
              </header>
              <p>To often people forget they have been given and focus on what they don't have. With Blest you can learn to focus on eveything you have to be thankful in your life. </p>
            </section>
            <section>
              <header>
                  <h3>Write it, Remember it!</h3>
              </header>
              <p>It's as simple as a shopping list, but a list of things you already have. Writing it down makes them easier to remeber the people and things in your life that you are privileged to have. Re:flect can provide you the space to meditate on your blessings.</p>
            </section>
            <section>
              <header>
                  <h3>Set notifications</h3>
              </header>
              <p>If you would like you can also turn on Reflect notify to email or send phone notifications of one thing from your list at any time.</p>
            </section>
          </main>
        );
      }

}