import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Table } from 'antd';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom';

import '../../App.css'


 class Courselist extends Component {
     constructor(){
         super()
         this.state = {
         
             dataSource : [ ],
              
               columns : [
                {
                    title: 'Course Code',
                    dataIndex: 'CourseCode',
                    key: 'category',
                  },
                {
                    title: 'Title',
                    dataIndex: 'Title',
                    key: 'title',
                   
                  },
                {
                  title: 'Category',
                  dataIndex: 'Category',
                  key: 'category',
                },
                {
                    title: 'Recommend',
                    dataIndex: 'Recommend',
                    key: 'recommend',
                  },
                  {
                    title: '',
                    dataIndex: 'Recommend',
                    key: 'recommend',
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
         fetch('https://poccourseapi.azurewebsites.net/api/Course/List')
         .then(res => res.json())
         .then(result =>  this.callme(result))
         
     }

    
    render() {
        return (
            <div className="mt-7">
            <div className="-content-center"> 
                <h3 className="head">Course List</h3>
                <div className="addbtn  d-flex justify-content-end pb-2 pt-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => this.props.history.push("/AddCourse")}
                  >
                    Add
                  </button>
                </div>
          </div>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />;
            </div>
        )
    }
}

export default Courselist;


