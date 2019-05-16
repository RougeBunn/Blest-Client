import React, { Component } from 'react'
import './BlessPage.css'

export default class BlessPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            notify:  false,
            occurence: '',
            listItems: [{ blessing: ''}],
            time: null
        };
        
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleOccurChange = this.handleOccurChange.bind(this);
        this.handleNotifyChange = this.handleNotifyChange.bind(this);
        this.handleListChange = this.handleListChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleNotifyChange(event) {
        this.setState({notify: event.target.value});
      }
    
    handleOccurChange(event) {
        this.setState({occurence: event.target.value});
        
    }  

    handleListChange(event) {
        this.setState({listItems: event.target.value});
    }
    handleListNameChange = idx => evt => {
        const newBlessing = this.state.listItems.map((listItem, bidx) => {
          if (idx !== bidx) return listItem;
          return { ...listItem, name: evt.target.value };
        });
    
        this.setState({ listItems: newBlessing });
    };
    
    handleAddBlessing = () => {
    this.setState({
        listItems: this.state.listItems.concat([{ blessing: "" }])
        });
    };

    handleRemoveBlessing = idx => () => {
    this.setState({
        listItems: this.state.listItems.filter((b, bidx) => idx !== bidx)
        });
    };

    handleTimeChange(event) {
        this.setState({time: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <>
            <header>
                <h1>Your Reflections</h1>
            </header>
            <section>
                <form id="record-dream">
                <div class="form-section">
                    <input type="text" name="title" className="title" placeholder="~Your Blessings~" value={this.state.title} onChange={this.handleTitleChange} required/>
                </div>
                <div class="form-section">
                    <label for="List"></label>
                    {this.state.listItems.map((listItem, idx) => (
                        <div className="listItem">
                            <input
                            type="text"
                            value={listItem.name}
                            onChange={this.handleListNameChange(idx)}
                            />
                            <button
                            type="button"
                            onClick={this.handleRemoveBlessing(idx)}
                            className="small"
                            >
                            -
                            </button>
                        </div>
                        ))}
                        <button
                        type="button"
                        onClick={this.handleAddBlessing}
                        className="small"
                        >
                        +
                        </button>
                </div>
        
                <div class="form-section">
                    <p class="dream-date-header">Send Reminders?</p>
                    <input type="checkbox" name="yes" value="yes"/>Yes<br/>
                    <input type="checkbox" name="no" value="no"/>No<br/>
                    <input type="radio" name="occurence" value="Daily"/> Daily<br/>
                    <input type="radio" name="occurence" value="Weekly"/> Weekly<br/>
                    <input type="radio" name="occurence" value="Monthly"/> Monthly<br/>
                    <p>At what time:</p><input type="time" name="usr_time"/>
                </div>
        
                <button type="submit">Save List</button>
                </form>
            </section>
          </>
        )
    }
}