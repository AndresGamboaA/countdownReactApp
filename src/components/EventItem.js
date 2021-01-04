import React, { Component } from 'react';
import './EventItemStyles.css';
import msToHMS from '../timeMethods';

class EventItem extends Component {
    constructor(props) {
        super(props)
        let actualDate = new Date()
        let timeLeft = this.props.event.date.getTime() - actualDate.getTime()
        timeLeft = msToHMS(timeLeft, "string")

        this.state = {
            isMouseOver: false,
            timeleft: timeLeft
        }

        this.onMouseOver = this.onMouseOver.bind(this);
    }

    onMouseOver() {
        let newState = Object.assign({}, this.state)
        newState.isMouseOver = true;
        this.setState(newState);
    }

    render() {
        return (
            <div className="event-item" onMouseOver={this.onMouseOver}>
                
                <p className="event-name tooltip">{this.props.event.name}</p>
                <div className="time tooltip">
                    {this.props.event.timeleft!==""?this.props.event.timeleft:this.state.timeleft}
                    <span className="tooltiptext">{this.props.event.date.toUTCString() + this.props.event.date.getHours()}</span></div>
                <button onClick={() => this.props.handleDeleteEvent(this.props.event.key)}><img alt="trash" src={require("./trash.png")}/></button>
            </div>
        );
    }
}

export default EventItem;