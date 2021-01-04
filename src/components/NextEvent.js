import React, { Component } from 'react';
import './NextEventStyles.css'
class NextEvent extends Component {

    render() {
        return (
            <div className="next-event">
                <p id="p1">Next event</p>
                <p id="p2">{this.props.name}</p>
                <p id="p3">Start in</p>
                <div className="time-container">
                    <div style={{display: this.props.event.days>0?'block':'none'}}>
                        <p>{this.props.event.days}</p> 
                        <p className="info">Days</p>
                    </div>
                    {this.props.event.days>0?<p className="colon">:</p>:null}
                    
                    <div style={{display: this.props.event.hours>0?'block':'none'}}>
                        <p>{this.props.event.hours}</p> 
                        <p className="info">Hours</p>
                    </div>
                    {this.props.event.hours>0?<p className="colon">:</p>:null}
                    <div style={{display: this.props.event.minutes}}>
                        <p>{this.props.event.minutes}</p> 
                        <p className="info">Minutes</p>
                    </div>
                    {this.props.event.minutes>0?<p className="colon">:</p>:null}
                    <div>
                        <p>{this.props.event.seconds}</p> 
                        <p className="info">Seconds</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default NextEvent;