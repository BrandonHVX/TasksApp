import React, { Component } from 'react';
import Searchbar from './Searchbar';
import Table from './Table';
import Pagination from './Pagination';
import axios from 'axios';

export default class Tasks extends Component {
  state = {
    term:       this.props.term,
    page:       this.props.page,
    totalPages: this.props.totalPages,
    tasks:      []
  }

  fetchTasks = (term, completed, page) => {
    axios.get(`tasks.json?completed=${completed}&term=${term}&page=${page}`)
      .then((response) => {
        this.setState({
          term,
          page:       response.data.page,
          tasks:      response.data.tasks,
          totalPages: response.data.total_pages
        })
      })
  }

  handleTermChange = event => {
    const { completed } = this.props;
    const page = 1;
    const term = event.target.value;
    this.fetchTasks(term, completed, page);
  }

  updateTask = task => {
    const { completed, page } = this.props;
    const { term } = this.state;
    axios.put(`/tasks/${task.id}`,
      { task: { completed: !task.completed } })
      .then((response) => {
        this.reload(completed, term, page);
      })
  }

  deleteTask = task => {
    const { completed, page } = this.props;
    const { term } = this.state;
    axios.delete(`/tasks/${task.id}`)
      .then((response) => {
        this.reload(completed, term, page);
      })
  }

  changePage = page => {
    const { completed } = this.props;
    const { term } = this.state;
    this.reload(completed, term, page);
  }

  reload = (completed, term, page) => {
    Turbolinks.visit(`/tasks?completed=${completed}&term=${term}&page=${page}`)
  }

  render(){
    const { tasks, term, page, totalPages } = this.state;
    return(
      <div>
        <Searchbar
          handleTermChange={this.handleTermChange}
          term={term}
        />
        <Table
          tasks={tasks}
          updateTask={this.updateTask}
          deleteTask={this.deleteTask}
        />
        <Pagination
          changePage={this.changePage}
          page={page}
          totalPages={totalPages}
        />
      </div>
    )
  }

  componentDidMount(){
    const { completed } = this.props;
    const { term, page } = this.state;
    this.fetchTasks(term, completed, page);
  }
}
