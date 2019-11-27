import React from 'react'
import './PageEmployeesList.css'

import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      isLoading: true, 
      employees: null,
      deletedEmployee: null,
    }
    this.getEmployees = this.getEmployees.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }
  componentDidMount(){
    return this.getEmployees();
  }
  getEmployees(){
    return fetch('http://localhost:3004/employees')
      .then(response => response.json())
      .then(e => this.setState({ 
        employees: e, 
        isLoading: false, 
        showForm: false,
        selectedEmployee: null }));
  }
  deleteEmployee(id){
    console.log(id);
    if(!id)
    {
      return;
    }
    console.log("deleting " + id.toString());
    this.setState({deletedEmployee: id});
    fetch('http://localhost:3004/employees/'+id, {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
    })
    .then(() => this.getEmployees())
    .then(() => this.setState({deletedEmployee: null}))
  }
  render(){
    return(
      <div>
        {this.state.isLoading ? <h3 class="col-1 offset-6 my-4"><i class="fas fa-spinner fa-spin"></i></h3> :
          <div>
          <h4 class="text-dark offset-1 my-4">Employees</h4>
          <Link class="btn btn-primary offset-1 mb-4" to="/new"><i class="fas fa-plus text-white pr-2"></i>Create new employee</Link>
          <table class="table col-10 offset-1">
          <thead class="bg-primary text-white">
            <tr>
                <th scope="col" class="col-3">Id</th>
                <th scope="col" class="col-1 text-center">Active</th>
                <th scope="col" class="col-1 text-center">Age</th>
                <th scope="col" class="col-3">Name</th>
                <th scope="col" class="col-2">Company</th>
                <th scope="col" class="col-2">Email</th>
                <th scope="col"></th>
            </tr>
          </thead>
          <tbody key="tbody" class="text-secondary">
            {this.state.employees.map((employee) => 
              this.state.deletedEmployee == employee.id ? <h3 col-10><i class="fas fa-spinner fa-spin"></i></h3> :
                <tr key={"tr"+employee.id}>
                  <th key={employee.id} class="col-3">
                      {employee.id}
                  </th>
                  <th key={employee.id + employee.isActive} class="col-1 text-center">{employee.isActive ? <i class="fas fa-circle text-primary"></i> : <i class="far fa-circle text-primary"></i>}</th>
                  <th key={employee.id + employee.age} class="col-1 text-center">{employee.age}</th>
                  <th key={employee.id + employee.name} class="col-2">{employee.name}</th>
                  <th key={employee.id + employee.company} class="col-2">{employee.company}</th>
                  <th key={employee.id + employee.email} class="col-2">{employee.email}</th>
                  <th key={employee.id + "trash"}><button class="btn btn-link" onClick={() => {this.deleteEmployee(employee.id)}}><i class="fas fa-trash text-danger"></i></button></th>
                </tr>
            )}
          </tbody>
          </table>
          </div>
        }
        </div>
    )
  }
}