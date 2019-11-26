import React from 'react'
import AddEmployeeForm from './AddEmployeeForm'

export default class PageEmployee extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      isSaving: false,
    }
    this.saveEmployee = this.saveEmployee.bind(this);
  }
  saveEmployee(e){
    console.log(e.target);
    e.preventDefault();
    
    this.setState({isSaving: true});

    const form = e.target;
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const company = form.elements['company'].value;
    const age = form.elements['age'].value;
    const isActive = form.elements['isActive'].value == "on" ? true : false;
    const newEmployee = {
      isActive: isActive,
      age: age,
      name: name,
      company: company,
      email: email
    }
    const newEmployeeStringified = JSON.stringify(newEmployee);

    fetch('http://localhost:3004/employees', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newEmployee)
    })
    .then(resp => {
      this.setState({isSaving: false, isLoading: true});
      if (resp.ok) {
          return resp.json()
      } else {
          throw new Error("Connection error!")
      }
    })
    .catch(error => console.dir("Error: ", error))
    .then(() => this.getEmployees());
  }
  render()
  {
    return(
      <div>
        {this.state.isSaving ? <p>Saving...</p> : <AddEmployeeForm saveEmployee={this.saveEmployee}/> }
      </div>
    )
  }
}
