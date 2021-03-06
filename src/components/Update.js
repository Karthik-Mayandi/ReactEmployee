import React, { Component } from 'react';
import { Field, Form, withFormik } from 'formik';
import * as Yup from 'yup';
import '../App.css'
import svg from '../assests/svg/undraw_personalization_triu (1).svg'
import moment from 'moment';
import Modal from './modal'


class Update extends Component {
    
    constructor(props){
        super(props)
        // console.log(this.props.match.params.id, "Update");

        this.state = {
            FirstName: '',
            Email: '',
            EmpCode: this.props.match.params.id,
            LastName: "",
            IsManager: true,
            ManagerCode: "",
            PartitionKey: "",
            RowKey: "",
            Timestamp: "2019-10-23T07:36:33.2792588+00:00",
            ETag: "",
            managerList:[],
            isOpen:false,
            
        }
    }

    setManagerData = (data) =>{

        this.setState({managerList:JSON.stringify(data)})
        
        
        
    }

    setData = (data) => {
   
    this.setState({
            FirstName: data[0].FirstName,
            Email: data[0].Email,
            EmpCode: data[0].EmpCode,
            LastName: data[0].LastName,
            IsManager: data[0].IsManager,
            ManagerCode: data[0].ManagerCode,
            Timestamp: data[0].Timestamp,
           
    }
    )  

    };

     componentDidMount(){
        const that = this;
         fetch(`https://pocemployeeapi.azurewebsites.net/api/Employee/GetItem?EmpCode=${this.state.EmpCode}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          }).then(function(response) {
            return response.json(); // pass the data as promise to next then block
          }).then(function(data) {
            that.setState({
                FirstName: data[0].FirstName,
                Email: data[0].Email,
                EmpCode: data[0].EmpCode,
                LastName: data[0].LastName,
                IsManager: data[0].IsManager,
                ManagerCode: data[0].ManagerCode,
                Timestamp: moment(data[0].Timestamp).format('YYYY-MM-DD')
                // PartitionKey: data[0].PartitionKey,
                // RowKey: data[0].RowKey,                
                // ETag: data[0].ETag
        })
          console.log('Date is :',moment(data[0].Timestamp).format('YYYY-MM-DD'));
            return fetch("https://pocemployeeapi.azurewebsites.net/api/Employee/ManagerList"); // make a 2nd request and return a promise
          }).then(function(response) {
            return response.json(); // pass the data as promise to next then block
          }).then(function(data) {
            //this.setManagerData(JSON.stringify(response))
            that.setState({managerList:data})
          })
          .catch(function(error) {
            console.log('Request failed', error)
          })
     }
     componentWillUnmount(){}
    FirstApi() {
            fetch(`https://pocemployeeapi.azurewebsites.net/api/Employee/GetItem?EmpCode=${this.state.EmpCode}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
          
        }).then(res => res.json())
            .then(data => this.setData(data))
            .then(this.SecondApi())
            .catch(err => console.log(err)); 
    }

    SecondApi()
    {
            let initialManagers = [];
        fetch("https://pocemployeeapi.azurewebsites.net/api/Employee/ManagerList")
            .then(res => { return res.json()})
            .then(data => this.setManagerData(data))

    }
   

    saveData = (e) => {
       
        const that = this;
        console.log('New Data is '+ JSON.stringify(this.state));
        fetch(`https://pocemployeeapi.azurewebsites.net/api/Employee/Update`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json())
            .then(data =>this.props.history.push('/'))//
            .then(function(data){alert("Data Updated SuccessFuly");})
            .catch(err => console.log(err));
        
    }

    
    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    render() {
         let managers = this.state.managerList;
        console.log("xxxxx "+this.state.managerList);
        let optionItems = managers.map((manager,index) =>
                <option key={index} onChange={(e) => {
                        this.setState({ ManagerCode: e.target.value })
                        console.log(this.state.ManagerCode)
                }
                } >{manager.EmpCode}</option>
            );
      return (
    <div>
          
        <div className="-content-center">
          <div className="mt-7">

             <h3 className=" head" >Edit Employee</h3>
         
          <div className="m_form-container">
                <div className="m_form-img-container">
                <img className= "m-form_img" src={svg} />
                </div>
                

        <div className="m_content-form">
            
             <div className="form-group">
             <label className="m-0"> First Name :</label>
                 <input
                     name="FirstName"
                     type="text"
                     value={this.state.FirstName}
                     className="form-control"
                     placeholder="Name"
                     onChange={(e) => this.setState({ FirstName: e.target.value })}
                 />
             </div>
            
           

             <div className="form-group">
             <label className="m-0"> Last Name :</label>
                 <input
                     name="LastName"
                     type="text"
                     value={this.state.LastName}
                     className="form-control"
                     placeholder="LastName"
                     onChange={(e) => this.setState({ LastName: e.target.value })}
                 />
                
             </div>

             <div className="form-group">
            <label className="m-0"> Manager Code :</label>
            <select  className="form-control" value={this.state.ManagerCode} onChange={(e) => this.setState({ ManagerCode: e.target.value })} >
              <option>{this.state.ManagerCode}</option>
              {optionItems}
            </select>     
            </div>

             <div className="form-group">
             <label className="m-0"> Email :</label>
                 <input
                     name="Email"
                     value={this.state.Email}
                     type="text"
                     className="form-control"
                     placeholder="Email"
                     onChange={(e) => this.setState({ Email: e.target.value })}
                 />
               
             </div>
             <div className="form-group">
             <label className="m-0"> Emp Code :</label>
                 <input
                     name="EmpCode"
                     type="text"
                     value={this.state.EmpCode}
                     className="form-control"
                     placeholder="EmpCode"
                     readOnly
                     
                     onChange={(e) => this.setState({ EmpCode: e.target.value })}
                 />
                
             </div>
           
             <div className="form-group">
             <label className="m-0"> Time Stamp :</label>
                 <input
                     name="TimeStamp"
                     type="date"
                     value={this.state.Timestamp}
                     className="form-control"
                     placeholder="ETag"
                     onChange={(e) => this.setState({ Timestamp: e.target.value })}
                 />
                
             </div>

             <div className="form-group">
                <div className="form-check form-check-inline">
                <label className="form-check-label">IsManager : </label>
                 <input className="form-check-input -checkbox" type="checkbox" 
                    id="inlineCheckboxtrue" value={this.state.IsManager} checked={this.state.IsManager}
                    onChange={(e) => this.setState({ IsManager: !this.state.IsManager })} 
                   />
 
                      </div>
                      </div>
         
           
             <div className="text-right mb-3">
                 <button type="submit" className="btn btn-success" onClick={(e) => this.saveData(e)} >Save</button>
                 <button type="submit" className="btn btn-danger ml-3" onClick={ () => this.props.history.push('/')}>Close</button>

             </div>
         </div>  
    
          </div> 
          </div>
          </div>
    </div>
             )
        
    }
}

export default Update;
