import React, { Component } from 'react'

class ManagerList extends Component {

    constructor(props){
        super(props)
        this.state = { table : [] }
        this.handleUpdate = this.handleUpdate.bind(this);
      
      }
      
    componentWillMount(){
        console.log(this.props, "app");
        console.log("I am mount");
        fetch("https://pocemployeeapi.azurewebsites.net/api/Employee/ManagerList")
        .then(response => {  return response.json() }).then(res =>
          {console.log(res)  
         return this.setState({table : res}) }
          );
      }

      componentWillUnmount(){
        console.log("i am dying");
      }

      handleUpdate = (code) =>{
        console.log(code)
        fetch(`https://pocemployeeapi.azurewebsites.net/api/Employee/GetItem?EmpCode=${code}`, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          //body: JSON.stringify()
      }).then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(err));
      }

    render() {
        return (
   
            <div>
             <div className="wrap mt-7">
        <div className="-content-center">
           
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"></link>
           
            
            <h3 className="head">Manager List</h3><br />
         
              
         
            
           
            {(this.state.table.length > 0) ?
                <table className="table table-hover">
                 <thead>
                    <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Emp Code</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                  {this.state.table.map((res, index) => {
                    return    <tr key={index}>
                    <td scope="row"> {index}</td>
                        <td scope="row" >{res.EmpCode}</td>
                        <td >{res.FirstName}</td>
                        <td >{res.LastName}</td>
                        <td >{res.Email}</td>
                        </tr>
                    })}
                </tbody>
                </table> : <div className="content-center"><div className="spinner-border text-dark center">

</div>           <p className="spintext center top"> Please wait...</p></div>}
           
                </div>
                </div>
                </div>
                
                
                )
            }
        }

export default ManagerList;
