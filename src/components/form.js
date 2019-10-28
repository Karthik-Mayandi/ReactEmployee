import React, { Component } from 'react';
import { Field, Form, withFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import svg from '../assests/svg/undraw_personalization_triu (1).svg'

class Forms extends Component {
constructor(props)
{
    super(props);
            this.state = {
                managerList: []
            }
}

componentDidMount() {
    let initialManagers = [];
    fetch("https://pocemployeeapi.azurewebsites.net/api/Employee/ManagerList")
    .then(res => { return res.json()})
    .then(data => {
        initialManagers = data.map((managers) => {
            return managers
        });
        console.log(initialManagers);
         this.setState({
            managerList: initialManagers,
});
})

}


        render() {
         
            let managers = this.state.managerList;
            let optionItems = managers.map((manager, index) =>
                <option key={index}>{manager.EmpCode}</option>
            );
            let {
                isSubmitting,
                errors,
                handleSubmit
            } = this.props;
            return (
                <div className="-content-center mt-7">
                <h3 className="head" >Add Employee</h3>
                <div className="m_form-container">
                <div className="m_form-img-container">
                <img className= "m-form_img" src={svg} />
                </div>
                

     

                <div className="m_content-form">

                    <Form className="" onSubmit={handleSubmit}>
                    
               
                        <div className="form-group">
                            <label className="m-0"> First Name :</label>
                                <Field
                                name="firstName"
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                
                                />
                               
                                {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                            </div>
                            <div className="form-group">
                            <label className="m-0"> Last Name :</label>
                                <Field
                                name="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                />
                              
                                {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                            </div>
                            <div className="form-group">
                            <label className="m-0"> Email :</label>
                                <Field
                                name="email"
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                />
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </div>
                            <div className="form-group">
                            <label className="m-0"> Emp code :</label>
                                <Field
                                name="empCode"
                                type="text"
                                className="form-control"
                                placeholder="Employee Code"
                                />
                                {errors.empCode && <div className="text-danger">{errors.empCode}</div>}
                            </div>
                            <div className="form-group">
                           

                            <label className="form-check-label">Manager Code : </label><br />
                            <Field component="select" className="form-control" name="managerCode">
                                <option>--Select--</option>
                                {optionItems}
                            </Field>
                                {errors.managerCode && <div className="text-danger">{errors.managerCode}</div>}
                            </div>
                            <div className="form-group">
                                <div className="form-check form-check-inline">
                                <label className="form-check-label">Manager : </label>
                                    <Field className="form-check-input checkbox" name="IsManager" type="checkbox" id="inlineCheckbox1" value="" />
                                    
                                </div>
                                {/* {errors.IsManager && <div className="text-danger">{errors.IsManager}</div>} */}
                            </div>
                            <div className="form-group">
                            <label className="m-0"> TimeStamp :</label>
                                <Field
                                    name="TimeStamp"
                                    type="date"
                                    className="form-control"
                                    placeholder="TimeStamp"
                                />
                                {errors.TimeStamp && <div className="text-danger">{errors.TimeStamp}</div>}
                            </div>
                                    
                            <div className="text-right mb-3">
                                <button className="btn btn-danger" onClick={() => this.props.history.push('/') }> Cancel </button>
                                <button type="submit" className="btn btn-primary ml-3">
                                {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </Form>
                        </div>
                        </div>
                </div>
            );
            }
        }
        
        const EnhansedDemoForm = withFormik({
            validationSchema: Yup.object().shape({
            empCode: Yup.string().required("Employee Code is required"),
            firstName: Yup.string().required("First Name is required"),
            lastName: Yup.string().required("Last Name is required"),
            email: Yup.string().email("Please enter valid email").required("Email is required"),
            managerCode: Yup.string().required("Manager Code is required"),
            Timestamp:Yup.string().required("Select Date"),
            }),
            validateOnChange:false,
            validateOnBlur:false,
            handleSubmit: (values) => {
                console.log(values.history, "handle");

                fetch('https://pocemployeeapi.azurewebsites.net/api/Employee/Add', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                   body: JSON.stringify( {
                            EmpCode: values.empCode,
                            FirstName: values.firstName,
                            LastName: values.lastName,
                            Email: values.email,
                            IsManager: values.IsManager,
                            ManagerCode: values.managerCode,
                            PartitionKey: values.email,
                            RowKey: values.empCode,
                            Timestamp: values.TimeStamp,
                            ETag: values.TimeStamp
                        })
                            }).then(res => res.json())
                            .then(data =>  values.history.push('/'))
                            .catch(err => console.log(err));
                            },
                            
            displayName: "BaseRateForm"
        })(Forms);

export default EnhansedDemoForm;