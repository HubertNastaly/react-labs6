import React from 'react'

import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class AddEmployeeForm extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(){
    return (
      <div>
        <form onSubmit={event => { event.persist(); this.props.saveEmployee(event)}}>
        <label><input type="checkbox" name="isActive"></input>is active</label>
        <br/>
        <input type="number" name="age" placeholder="Age"></input>
        <br/>
        <input type="text" name="name" placeholder="Name"></input>
        <br/>
        <input type="text" name="company" placeholder="Company"></input>
        <br/>
        <input type="text" name="email" placeholder="Email"></input>
        <br/>
        <button onClick={this.props.hideForm}>Cancel</button>
        <button type="submit">Add</button>
        </form>
        <Link to="/">Back to list</Link>
      </div>
        
    )
  }
}