import React, { Component } from 'react';
import EventItem from './EventItem';
import './EventsListStyles.css'

class EventsList extends Component {

    render() {
        const eventItems = this.props.events.map(event =>
            <EventItem key={event.key} event={event} handleDeleteEvent={this.props.handleDeleteEvent}/>
        );
        return (
            <div className="events-list">
                {eventItems}
            </div>
        );
    }
}

export default EventsList;