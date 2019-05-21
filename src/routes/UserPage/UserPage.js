import React, { Component } from 'react'
import './UserPage.css'
import BlessPage from '../BlessPage/BlessPage';
import Context from '../../context'

export default class UserPage extends Component {
    
    render() {
        return (
            <>
                <header role="banner">
                <h1>Blest Dashboard</h1>
                </header>
                <section>
                <header><h2>I'm thankful for: (you can title this whatever you want)</h2></header>
                <Context.Consumer></Context.Consumer>
                <button>Edit</button>
                <button>Delete</button>                       
                <div class="form-section">
                    <p class="dream-date-header">Send Reminders?</p>
                    <input type="checkbox" name="yes" value="yes"/>Yes<br/>
                    <input type="checkbox" name="no" value="no"/>No<br/>
                    <input type="radio" name="occurence" value="Daily"/> Daily<br/>
                    <input type="radio" name="occurence" value="Weekly"/> Weekly<br/>
                    <input type="radio" name="occurence" value="Monthly"/> Monthly<br/>
                    <p>At what time:</p><input type="time" name="usr_time"/>
                </div>
                </section>
            </>
        )
    }
}