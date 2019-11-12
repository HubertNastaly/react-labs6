import React from 'react'

export default class AddEmployeeForm extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {};
  }
  render(){
    return (
      <form>
        <label><input type="checkbox" name="isActive"></input>is active</label>
        <br/>
        <input type="number" name="age" placeholder="Age"></input>
        <br/>
        <input type="text" name="name" placeholder="Name"></input>
        <br/>
        <input type="text" name="company" placeholder="Company"></input>
        <br/>
        <input type="text" name="email" placeholder="Email"></input>
      </form>
    )
  }
}