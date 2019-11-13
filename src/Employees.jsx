import React from 'react'
import AddEmployeeForm from './AddEmployeeForm'

class Employees extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, 
      employees: null,
      showForm: false,
      isSaving: false,
      deletedEmployee: null,
      selectedEmployee: null
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.getEmployees = this.getEmployees.bind(this);
    this.selectEmployee = this.selectEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }
  componentDidMount(){
    return this.getEmployees();
  }
  getEmployees(){
    return fetch('http://localhost:3000/employees')
      .then(response => response.json())
      .then(e => this.setState({ 
        employees: e, 
        isLoading: false, 
        showForm: false,
        selectedEmployee: null }));
  }
  showForm(){
    this.setState({showForm: true});
  }
  hideForm(){
    this.setState({showForm: false});
  }
  selectEmployee(e){
    this.setState({selectedEmployee: e.target.value});
  }
  saveEmployee(e){
    console.log(e.target);
    e.preventDefault();
    
    this.setState({isSaving: true});

    //new id is max id from all employees + 1
    // const startingVal = this.state.employees[0]._id;
    // const id = this.state.employees.reduce((max,curr) => curr._id > max ? curr._id : max, startingVal);

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

    //some hash function from internet
    const generateId = () => {
      var str = newEmployeeStringified;
      var hash = 0;
      if (str.length == 0) return hash;
      for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash<<5)-hash)+char;
          hash = hash & hash; 
      }
      return Math.abs(hash);
    }
    newEmployee.id = parseInt(generateId());
    fetch('http://localhost:3000/employees', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newEmployee)
    })
    .then(resp => {
      if (resp.ok) {
          return resp.json()
      } else {
          throw new Error("Connection error!")
      }
    })
    .catch(error => console.dir("Error: ", error));

    this.setState({isSaving: false, isLoading: true});

    this.getEmployees();
  }

  deleteEmployee(){
    const id = this.state.selectedEmployee;
    if(!id)
    {
      return;
    }

    this.setState({deletedEmployee: id});
    fetch('http://localhost:3000/employees/:'+id, {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
    });

    this.setState({deletedEmployee: null});

    this.getEmployees();
  }

  render(){
    return(
      <div>
        {this.state.isLoading ? <p>Loading...</p> :
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
              
              this.state.deletedEmployee ? <tr>Deleting...</tr> :

                <tr key={"tr"+employee._id}>
                  <th key={employee._id}>
                    <label>
                      <input key={"radio"+employee._id} type="radio" name="selectEmployee" value={employee._id} onInput={this.selectEmployee}></input>
                      {employee._id}
                    </label>
                  </th>
                  <th key={employee._id + employee.isActive}>{employee.isActive ? 1 : 0}</th>
                  <th key={employee._id + employee.age}>{employee.age}</th>
                  <th key={employee._id + employee.name}>{employee.name}</th>
                  <th key={employee._id + employee.company}>{employee.company}</th>
                  <th key={employee._id + employee.email}>{employee.email}</th>
                </tr>
              
            )}
          </tbody>
          </table>
        }
        <button onClick={this.deleteEmployee}>Delete selected employee</button>
        <button onClick={this.showForm}>Add new employee</button>
        {this.state.showForm ? this.state.isSaving ? <p>Saving ...</p> : <AddEmployeeForm saveEmployee={this.saveEmployee} hideForm={this.hideForm}/> : null}
      </div>
    )
  }
}

export default Employees
