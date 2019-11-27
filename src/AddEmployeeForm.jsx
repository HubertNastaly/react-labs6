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
        <form class="col-4 offset-1 mt-4" onSubmit={event => {this.props.saveEmployee(event)}}>
        <h3 class="text-dark">Create new employee</h3>
        <div class="custom-control custom-switch mt-4">
          <input type="checkbox" class="custom-control-input" id="switch1" name="isActive"/>
          <label class="custom-control-label" for="switch1">Active</label>
        </div>
        <br/>
        <input class="form-control mb-1" type="number" name="age" placeholder="Age"></input>
        <br/>
        <input class="form-control mb-1" type="text" name="name" placeholder="Name"></input>
        <br/>
        <input class="form-control mb-1" type="text" name="company" placeholder="Company"></input>
        <br/>
        <input class="form-control mb-1" type="text" name="email" placeholder="Email"></input>
        <br/>
        <Link to="/" class="btn btn-secondary mr-2 mb-2" onClick={this.props.hideForm}>Cancel</Link>
        <button class="btn btn-primary col-2 mb-2" type="submit">Add</button>
        <br/>
        </form>
      </div>
        
    )
  }
}