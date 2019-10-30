import React, { Component } from "react";
import Update from "./Update";
import "../App.css";
import MyModal  from './Modal/Modal';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { table: [] };
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
        return this.setState({ table: res });
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
          <link
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            rel="stylesheet"
          ></link>

          <div className="mt-7"> 
          <MyModal/>
            <h3 className="head">Employee List</h3>
          
            <div>
            {(this.state.table.length > 0) ? 
            <div>
            <div className="addbtn  d-flex justify-content-end pb-2 pt-2">
              <button
                className="btn btn-primary"
                onClick={() => this.props.history.push("/Add")}
              >
                Add
              </button>
            </div>
          
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Emp Code</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {this.state.table.map((res, index) => {
                  return (
                    <tr key={index}>
                      <td scope="row"> {index}</td>
                      <td scope="row">{res.EmpCode}</td>
                      <td>{res.FirstName}</td>
                      <td>{res.LastName}</td>
                      <td>{res.Email}</td>
                      <td>
                        <a
                          href="#"
                          onClick={() => this.handleUpdate(res.EmpCode)}
                        >
                          <i className="glyphicon glyphicon-pencil  text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table> 
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
