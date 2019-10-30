import React, { Component } from "react";
import { Field, Form, withFormik } from "formik";
import * as Yup from "yup";
import "../../App.css";
import svg from "../../assests/svg/maping.svg";

class AddMapping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeList: [],
      courseList: []
    };
  }

  componentDidMount() {
    let initialEmployees = [];
    fetch(
      "https://cors-anywhere.herokuapp.com/https://pocemployeeapi.azurewebsites.net/api/Employee/List"
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        initialEmployees = data.map(employees => {
          return employees;
        });
        console.log(initialEmployees);
        this.setState({
          employeeList: initialEmployees
        });
      });

    let initialCourses = [];
    fetch("https://poccourseapi.azurewebsites.net/api/Course/List")
      .then(res => {
        return res.json();
      })
      .then(data => {
        initialCourses = data.map(courses => {
          return courses;
        });
        console.log(initialCourses);
        this.setState({
          courseList: initialCourses
        });
      });
  }

  render() {
    let employees = this.state.employeeList;
    let employeesOptionItems = employees.map((employee, index) => (
      <option key={index}>{employee.FirstName}</option>
    ));

    let courses = this.state.courseList;
    let courseOptionItems = courses.map((course, index) => (
      <option key={index}>{course.Title}</option>
    ));

    let { isSubmitting, errors } = this.props;

    return (
      <div className="-content-center mt-7">
        <h3 className="head">Employee - Course Mapping</h3>
        <div className="m_form-container">
          <div className="m_form-img-container">
            <img className="m-form_img" src={svg} />
          </div>

          <div className="m_content-form m_center">
          <div > 
            <Form>
              <div className="mb-3">
                <label className="form-check-label">Employee : </label>
                <br />
                <Field
                  component="select"
                  className="form-control"
                  name="employeeCode"
                >
                  <option>--Select--</option>
                  {employeesOptionItems}
                </Field>
                {errors.employeeCode && (
                  <div className="text-danger">{errors.employeeCode}</div>
                )}
              </div>
              <div>
                <label className="form-check-label">Course : </label>
                <br />
                <Field
                  component="select"
                  className="form-control"
                  name="courseCode"
                >
                  <option>--Select--</option>
                  {courseOptionItems}
                </Field>
                {errors.courseCode && (
                  <div className="text-danger">{errors.courseCode}</div>
                )}
              </div>
              <br />
              <div className="text-right mb-3">
                <button
                  className="btn btn-danger"
                  onClick={() => this.props.history.push("/MappingList")}
                >
                  {" "}
                  Cancel{" "}
                </button>
                <button type="submit" className="btn btn-primary ml-3">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const EnhansedForm = withFormik({
  validationSchema: Yup.object().shape({
    employeeCode: Yup.string().required("Select an Employee"),
    courseCode: Yup.string().required("Select a Course")
  }),
  validateOnChange: false,
  validateOnBlur: false,
  handleSubmit: values => {
    console.log(values, "loo");

    fetch("https://pocec.azurewebsites.net/api/EmpCourse/Add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        EmpCode: values.employeeCode,
        CourseCode: values.courseCode,
        PartitionKey: "sample string 3",
        RowKey: "sample string 4",
        Timestamp: "2019-10-29T06:48:37.3227744+00:00",
        ETag: "sample string 6"
      })
    })
      .then(res => res.json())
      .then(data => values.history.push("/MappingList"))
      .catch(err => console.log(err));
  },

  displayName: "BaseRateForm"
})(AddMapping);

export default EnhansedForm;
