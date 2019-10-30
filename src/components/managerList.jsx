import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';

class ManagerList extends Component {

    constructor(props){
        super(props);
            this.state = {
              dataSource : [ ],
              
              columns : [
               {
                   title: 'Employee Code',
                   dataIndex: 'EmpCode',
                   key: 'empCode',
                 },
               {
                   title: 'First Name',
                   dataIndex: 'FirstName',
                   key: 'firstName',
                  
                 },
               {
                 title: 'Last Name',
                 dataIndex: 'LastName',
                 key: 'lastName',
               },
               {
                   title: 'Email',
                   dataIndex: 'Email',
                   key: 'email',
                 },
             ]

            }
      
      }
      
callme = (result) => {
  console.log(result);
  
  this.setState({dataSource:result})
  console.log(this.state)
}
   componentDidMount(){
       fetch('https://pocemployeeapi.azurewebsites.net/api/Employee/ManagerList')
       .then(res => res.json())
       .then(result =>  this.callme(result))
       
   }

  
  render() {
      return (
        <div className="wrap">
        <div className="-content-center"> 
          <div className="mt-7">
              <h3 className="head">Manager List</h3>
              <div>
            {(this.state.dataSource.length > 0) ? 
            <div>
              <Table dataSource={this.state.dataSource} columns={this.state.columns} />
              </div>
              : <div className="content-center"><div className="spinner-border text-dark center"> </div>
               <p className="spintext center top"> Please wait...</p></div> } 
</div>
          </div>
          </div>
          </div>
      )
  }
 }

export default ManagerList;
