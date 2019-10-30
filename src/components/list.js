import React, { Component } from "react";
import Update from "./Update";
import "../App.css";
import MyModal  from './Modal/Modal';
import { Table } from 'antd';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource : [ ],
              
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
};
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    
    fetch(
      "https://cors-anywhere.herokuapp.com/https://pocemployeeapi.azurewebsites.net/api/Employee/List"
    )
      .then(response => {
        return response.json();
      })
      .then(res => {
        console.log(res);
        return this.setState({ dataSource: res });
      });
  }

  componentWillUnmount() {}

  handleUpdate = code => {
    this.props.history.push("/Edit/" + code);
  };

  render() {
    return (
      <div className="wrap">
        <div className="-content-center">
          <div className="mt-7"> 
        
            <h3 className="head">Employee List</h3>
          
            <div>
            {(this.state.dataSource.length > 0) ? 
            <div>
            <div className="addbtn  d-flex justify-content-end pb-2 pt-2">
              <button
                className="btn btn-primary"
                onClick={() => this.props.history.push("/Add")}
              >
                Add
              </button>
            </div>
            <Table dataSource={this.state.dataSource} columns={this.state.columns} />;
            </div>
         : <div className="content-center"><div className="spinner-border text-dark center">

</div>           <p className="spintext center top"> Please wait...</p></div>}
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default List;
