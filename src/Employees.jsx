import React from 'react'
import AddEmployeeForm from './AddEmployeeForm'

class Employees extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {isLoading: true, employees: null};
    this.showForm = this.showForm.bind(this);
  }
  componentDidMount(){
    return fetch('http://localhost:3000/employees')
      .then(response => response.json())
      .then(e => this.setState({ employees: e, isLoading: false, showForm: false }));
  }
  showForm(){
    this.setState({showForm: true});
  }
  render(){
    if(this.state.isLoading){
      return(
        <p>isLoading...</p>
      )
    }
    console.log(this.state.employees);
    return(
      <div>
        <table style={{fontSize: 12, fontWeight: 'normal'}}>
        <thead>
          <tr>
              <th scope="col">Id</th>
              <th scope="col">is Active</th>
              <th scope="col">Age</th>
              <th scope="col">Name</th>
              <th scope="col">Company</th>
              <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody key="tbody">
          {this.state.employees.map((employee) => 
            <tr key={"tr"+employee._id}>
              <th key={employee._id}>{employee._id}</th>
              <th key={employee._id + employee.isActive}>{employee.isActive ? 1 : 0}</th>
              <th key={employee._id + employee.age}>{employee.age}</th>
              <th key={employee._id + employee.name}>{employee.name}</th>
              <th key={employee._id + employee.company}>{employee.company}</th>
              <th key={employee._id + employee.email}>{employee.email}</th>
            </tr>
          )}
        </tbody>
        </table>
        <button onClick={this.showForm}>Add new employee</button>
        {this.state.showForm ? <AddEmployeeForm/> : null}
      </div>
    )
  }
}

export default Employees
