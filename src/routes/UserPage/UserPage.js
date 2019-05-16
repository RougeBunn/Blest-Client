import React, { Component } from 'react'
import './UserPage.css'

export default class UserPage extends Component {
    render() {
        return (
            <>
                <header role="banner">
                <h1>Blest Dashboard</h1>
                </header>
                <section>
                <header><h2>I'm thankful for: (you can title this whatever you want)</h2></header>
                    <ul>
                        <li>My cute dog Lewis</li>
                        <li>My job that pays for my bills and food</li>
                        <li>My parents who are proud of me</li>
                    </ul>
                        <p>Last edited: 03/04/2019</p>
                <button>Edit</button>
                <button>Delete</button>
                </section>
            </>
        )
    }
}