import React, { Component } from 'react';
import dateFns from 'date-fns';
import Header from './Header';
import Days from './Days';
import Cells from './Cells';
import axios from 'axios';
import CalendarModal from './CalendarModal'

class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    currentDate:  new Date(),
    selectedDate: new Date(),
    tasks: {},
    modalOpen: false
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day,
      modalOpen:    true
    });
  };

  fetchTasks = currentMonth => {
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    let startDate = dateFns.startOfWeek(monthStart);
    let endDate = dateFns.endOfWeek(monthEnd);
    startDate = dateFns.format(startDate, 'YYYY-MM-DD');
    endDate = dateFns.format(endDate, 'YYYY-MM-DD');
    axios.get(`/calendar.json?start_date=${startDate}&end_date=${endDate}`)
      .then((response) => {
        this.setState({ currentMonth, tasks: response.data.tasks })
      })
  }

  nextMonth = () => {
    const currentMonth = dateFns.addMonths(this.state.currentMonth, 1)
    this.fetchTasks(currentMonth);
  };

  prevMonth = () => {
    const currentMonth = dateFns.subMonths(this.state.currentMonth, 1)
    this.fetchTasks(currentMonth);
  };

  render() {
    const { currentMonth, currentDate, selectedDate, tasks, modalOpen } = this.state;
    return (
      <div className="calendar">
        <Header
          currentMonth={currentMonth}
          prevMonth={this.prevMonth}
          nextMonth={this.nextMonth}
        />
        <Days />
        <Cells
          currentMonth={currentMonth}
          currentDate={currentDate}
          onDateClick={this.onDateClick}
          tasks={tasks}
        />
        <CalendarModal
          toggleModal={this.toggleModal}
          modalOpen={modalOpen}
          selectedDate={selectedDate}
          tasks={tasks}
         />
      </div>
    );
  }

  componentDidMount(){
    const { currentMonth } = this.state;
    this.fetchTasks(currentMonth);
  }

}

export default Calendar;
