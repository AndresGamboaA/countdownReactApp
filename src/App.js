import React, { Component } from 'react';
import './App.css';
import AddEventPopUp from './components/AddEventPopUp';
import EventsList from './components/EventsList';
import NextEvent from './components/NextEvent';
import msToHMS from './timeMethods';

class App extends Component {
  constructor() {
    super();
    let events = []
    if(localStorage.getItem('events')) {
      events = JSON.parse(localStorage.getItem('events'))
      events.map(event => {
        event.date = new Date(event.date)
        return event
      })

      let actualDate = new Date()
      for(let i; i<events.length; i++) {
        if(events[i].date.getTime() <= actualDate.getTime()) {
          events.splice(i,1)
        }
      }
      localStorage.setItem('events', JSON.stringify(events))
    }

    this.state = {
      events: events,
      nextEvent: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      popupVisible: false
    }

    this.handleClosePopup = this.handleClosePopup.bind(this)
    this.handleAddEvent = this.handleAddEvent.bind(this)
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this)
  }
 
  componentDidMount() {
    this.interval = setInterval(() => {

      if(this.state.events.length > 0){

        let newState = Object.assign({}, this.state)
        let actualDate = new Date()

        //Update EventItems every minute
        if(this.state.nextEvent.seconds === 0) {
          newState.events = this.state.events.map(event => {
            let timeLeft = event.date.getTime() - actualDate.getTime()
            event.timeleft = msToHMS(timeLeft, "string")
            return event
          })
        }

        //Update NextEvent every second
        let timeLeft = this.state.events[0].date.getTime() - actualDate.getTime()
        if(timeLeft < 0) {
          newState.events.splice(0,1)
          localStorage.setItem('events', JSON.stringify(newState.events))
        }
        newState.nextEvent = msToHMS(timeLeft, "object")
        this.setState(newState)
      }
    }, 1000)
  }

  componentWillUnmount() {
      clearInterval(this.interval)
  }

  handleClosePopup() {
    let newState = Object.assign({}, this.state)
    newState.popupVisible = false;
    this.setState(newState);
  }

  handleAddEvent(name, date, time) {
    
    if(name === "" || date === "" || time === ""){
      return;
    }

    let d = `${date}T${time}:00-06:00`;
    let ed = new Date(d)
    let actualDate = new Date()
    if(ed.getTime() < actualDate.getTime()){
      window.alert('Not a valid date')
      return
    }

    let event = {
      key: name + ed.toString(),
      name: name,
      date: ed,
      timeleft: ""
    }

    let newState = Object.assign({}, this.state)
    newState.events.push(event)
    
    newState.events = newState.events.sort((a, b) => {
      let comparison = 0
      if(a.date.getTime() > b.date.getTime()){
        comparison = 1
      } else if (a.date.getTime() < b.date.getTime()) {
        comparison = -1
      }
      return comparison
    })

    newState.popupVisible = false
    this.setState(newState)
    localStorage.setItem('events', JSON.stringify(newState.events))
  }

  handleDeleteEvent(key) {
    let newState = Object.assign({}, this.state)
    newState.events.forEach(element => {
      if(element.key === key) {
        newState.events.splice(newState.events.indexOf(element),1)
      }
    });
    this.setState(newState)
    localStorage.setItem('events', JSON.stringify(newState.events))
  }

  render() {
    return (
      <div className="App">
        <h1 style={{fontSize: "8px", color: "white", opacity:"0.5"}}>Countdown timer</h1>
        <AddEventPopUp visible={this.state.popupVisible} onSubmit={this.handleAddEvent} onClose={this.handleClosePopup}/>
        {this.state.events.length>0?<NextEvent name={this.state.events[0].name} event={this.state.nextEvent}/>:
        <h1 style={{color: "white"}}>Add a new event</h1>}
        <hr className="hor-line"/>
        {this.state.events.length>0?<p>Next events</p>:null}
        <EventsList events={this.state.events} handleDeleteEvent={this.handleDeleteEvent}/>
        <button id="add-event" onClick={() => {
          let newState = Object.assign({}, this.state)
          newState.popupVisible = !this.state.popupVisible;
          this.setState(newState)
        }}>+ Add a new event</button>
        <p id="info-app">Developed by: Andrés Gamboa Alfaro (2020)</p>
      </div>
    );
  }
}

export default App;