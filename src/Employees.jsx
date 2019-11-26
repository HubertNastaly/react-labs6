import React from 'react'
import AddEmployeeForm from './AddEmployeeForm'
import PageEmployeesList from './PageEmployeesList';
import PageEmployee from './PageEmployee';

class Employees extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      
      
    };
    
  }
  
  render(){
    return(
      <div>
        <PageEmployeesList employees={this.state.employees} deletedEmployee={this.state.deletedEmployee} isLoading={this.state.isLoading} 
        selectEmployee={this.selectEmployee} deleteEmployee={this.deleteEmployee}/>
        <PageEmployee isSaving={this.state.isSaving} saveEmployee={this.saveEmployee} />
      </div>

    )
  }
}

export default Employees
