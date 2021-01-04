import React, { Component } from 'react';
import './AddEventPopUpStyle.css'
class AddEventPopUp extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            date: "",
            time: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    fullDate(date, time) {
        return `${date}T${time}:00-06:00`;
    }

    render() {
        return (
            <div className={`add-event-popup${this.props.visible?" active":""}`}>
                
                <div className="glass"></div>
                <div className={`container${this.props.visible?" container-active":""}`}>
                    <form onSubmit={(e) => {e.preventDefault()}}>
                        <label>Event Name</label>
                        <input id="event-name" name="name" type="text" maxLength="30" onChange={this.handleChange} value={this.state.name}></input>
                        <label>Date</label>
                        <input id="date" name="date" type="date" onChange={this.handleChange} value={this.state.date}></input>
                        <label>Time</label>
                        <input id="time" name="time" type="time" onChange={this.handleChange} value={this.state.time}></input>
                        <hr />
                        <div id="buttons">
                            <button id="add" onClick={(e)=>{
                                this.props.onSubmit(this.state.name, this.state.date, this.state.time)
                                this.setState({
                                    name: "",
                                    date: "",
                                    time: ""
                                })
                            }}>Add</button>
                            <button id="cancel" onClick={this.props.onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddEventPopUp;