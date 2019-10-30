import React, { Component } from 'react'
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import List from './list';
import Forms from './form';
import Edit from './Update';
import '../App.css';
import ManagerList from './managerList';
import logo from '../assests/images/TP.png'
import CourseAdd from '../components/Course/Course-add';
import  AddMapping  from '../components/EmployeeCourseMapping/AddMapping';
import EmployeeMappingList from './EmployeeCourseMapping/EmployeeMappingList';
import Courselist from './Course/Course-list';

class Header extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
    }



    render() {
        return (
            <Router>
            <div className="bg-light fixed-top shadow">

     <div className="nav-container -content-center flex">
            <div className="nav-brand">
            <Link to='/'> <img className="logo ngtvml5"
            src={logo} /> </Link>
            </div>
            <div className="nav-links">
            <ul>
                <li className="navlist">
                <Link to='/'> Employee </Link>
                </li>
                <li className="navlist"> 
                <Link to='/ManagerList'> Manager </Link>
                </li>
                <li className="navlist">
                    <Link to='/CourseList'> Course </Link>
                </li>
                <li className="navlist">
                    <Link to='/MappingList'> Mapping </Link>
                </li>
            </ul>
            </div>
     </div>
            </div>
            <Route exact path = '/' component = { List } />
            <Route exact path = '/ManagerList' component = { ManagerList } />
            <Route exact path = '/Add' component = { Forms } />
            <Route exact path = '/Edit/:id' component = { Edit } />
            <Route exact path = '/AddCourse' component = { CourseAdd } />
            <Route exact path = '/AddMapping' component = { AddMapping } />
            <Route exact path = '/MappingList' component = { EmployeeMappingList } />
            <Route exact path = '/CourseList' component = { Courselist } />

            </Router>
        )
    }
}


export default Header;