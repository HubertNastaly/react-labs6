import React from 'react'

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
      selectedEmployee: null
    }
    this.getEmployees = this.getEmployees.bind(this);
    this.selectEmployee = this.selectEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }
  componentDidMount(){
    return this.getEmployees();
  }
  selectEmployee(e){
    this.setState({selectedEmployee: e.target.value});
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
  deleteEmployee(){
    const id = this.state.selectedEmployee;
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
        {this.state.isLoading ? <p>Loading...</p> :
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
              this.state.deletedEmployee == employee.id ? <tr>Deleting...</tr> :
                <tr key={"tr"+employee.id}>
                  <th key={employee.id}>
                    <label>
                      <input key={"radio"+employee.id} type="radio" name="selectEmployee" value={employee.id} onInput={this.selectEmployee}></input>
                      {employee.id}
                    </label>
                  </th>
                  <th key={employee.id + employee.isActive}>{employee.isActive ? 1 : 0}</th>
                  <th key={employee.id + employee.age}>{employee.age}</th>
                  <th key={employee.id + employee.name}>{employee.name}</th>
                  <th key={employee.id + employee.company}>{employee.company}</th>
                  <th key={employee.id + employee.email}>{employee.email}</th>
                </tr>
            )}
          </tbody>
          </table>
          <button onClick={this.deleteEmployee}>Delete selected employee</button>
          <Link to="/new">Create new employee</Link>
          </div>
        }
        
        </div>
    )
  }
}