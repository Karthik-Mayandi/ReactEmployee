import React, { Component } from 'react'
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';

export default class EmployeeMappingList extends Component {

    constructor() {
        super();
        this.state = {
            dataSource: [],

            columns : [
                {
                    title: 'Employee Name',
                    dataIndex: 'EmpCode',
                    key: 'employee',
                  },
                {
                    title: 'Course Name',
                    dataIndex: 'CourseCode',
                    key: 'course',
                   
                  },
                  {
                    title: '',
                    dataIndex: 'CourseCode',
                    key: 'courseCode',
                    render: text =>  <Link to="/courseadd"> Edit </Link>  ,
                      
                  }
              ]
        }
    }

    callme = (result) => {
        console.log(result);
        this.setState({dataSource:result})
        console.log(this.state)
    }
         componentDidMount(){
             fetch('https://pocec.azurewebsites.net/api/EmpCourse/List')
             .then(res => res.json())
             .then(result =>  this.callme(result))
             
         }

    render() {
        return (
            <div className="wrap">
          <div className="-content-center">
            <div className="mt-7"> 
          
              <h3 className="head">Mapping List</h3>
            
              <div>
              {(this.state.dataSource.length > 0) ? 
              <div>
              <div className="addbtn  d-flex justify-content-end pb-2 pt-2">
                <button
                  className="btn btn-primary"
                  onClick={() => this.props.history.push("/AddMapping")}
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
        )
    }
}
