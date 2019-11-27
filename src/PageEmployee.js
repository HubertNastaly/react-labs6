import React from 'react'
import AddEmployeeForm from './AddEmployeeForm'
import {withRouter} from 'react-router-dom'

class PageEmployee extends React.Component
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
  redirectToHome()
  {
    console.log()
    const{history} = this.props;
    if(history)
    {
      history.push('/');
    }
  }
  saveEmployee(e)
  {
    e.preventDefault();
    
    this.setState({isSaving: true});

    const form = e.target;
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const company = form.elements['company'].value;
    const age = form.elements['age'].value;
    const isActive = form.elements['isActive'].checked;
    const newEmployee = 
    {
      isActive: isActive,
      age: age,
      name: name,
      company: company,
      email: email
    }
    const newEmployeeStringified = JSON.stringify(newEmployee);

    fetch('http://localhost:3004/employees', 
    {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newEmployee)
    })
    .then(resp => 
      {
      this.setState({isSaving: false, isLoading: true});
      if (resp.ok) 
      {
          return resp.json()
      } else 
      {
          throw new Error("Connection error!")
      }
    })
    .catch(error => console.dir("Error: ", error))
    .then(() => this.redirectToHome());
  }
  render()
  {
    return(
      <div>
        {
        this.state.isSaving ? 
        <h3 class="col-1 offset-6 my-4"><i class="fas fa-spinner fa-spin"></i></h3> 
        : 
        <AddEmployeeForm saveEmployee={this.saveEmployee}/> 
        }
      </div>
    )
  }
}

export default withRouter(PageEmployee);

