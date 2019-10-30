import React, { Component } from 'react';
import { Field, Form, withFormik} from 'formik';
import * as Yup from 'yup';
import svg from '../../assests/svg/course.svg'

class CourseAdd extends Component {
    render() {

        let {
            isSubmitting,
            errors,
            
        } = this.props;

        return (
            <div>
                <div className="-content-center mt-7">
                <h3 className="head" >Add Course</h3>
                <div className="m_form-container">
                <div className="m_form-img-container">
                <img className= "m-form_img" src={svg} />
                </div>
                <div className="m_content-form">
                <Form>
                <div className="form-group">
                    <label className="m-0"> Course Code :</label>
                    <Field
                        name="CourseCode"
                        type="text"
                        className="form-control"
                        placeholder="Course Code"
                        />
                        {errors.CourseCode && <div className="text-danger">{errors.CourseCode}</div>}
                </div>
                <div className="form-group">
                    <label className="m-0"> Title :</label>
                    <Field
                        name="Title"
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        />
                        {errors.Title && <div className="text-danger">{errors.Title}</div>}
                </div>
                <div className="form-group">
                    <label className="m-0"> Category :</label>
                    <Field
                        name="Category"
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        />
                        {errors.Category && <div className="text-danger">{errors.Category}</div>}
                </div>
                <div className="form-group">
                    <label className="m-0"> Recommended :</label>
                    <Field
                        name="Recommended"
                        type="text"
                        className="form-control"
                        placeholder="Recommended"
                        />
                        {errors.Recommended && <div className="text-danger">{errors.Recommended}</div>}
                </div>
                <div className="text-right mb-3">
                                <button className="btn btn-danger" onClick={() => this.props.history.push('/CourseList') }> Cancel </button>
                                <button type="submit" className="btn btn-primary ml-3">
                                {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                </div>
                </Form>
            </div>
            </div>

          
            </div>
            </div>
             
        )
    }   
}

const EnhancedForm = withFormik({
    validationSchema: Yup.object().shape({
        CourseCode: Yup.string().required("Course Code is required"),
        Title: Yup.string().required("Title is reqiured"),
        Category: Yup.string().required("Category is required"),
        Recommended: Yup.string().required("Recommended is required"),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: (values) => {
        console.log(values);

        fetch('https://poccourseapi.azurewebsites.net/api/Course/Add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify( {
                CourseCode: values.CourseCode,
                Title: values.Title,
                Category: values.Category,
                Recommend: values.Recommended,
                PartitionKey: "sample string 5",
                RowKey: "sample string 6",
                Timestamp: "2019-10-29T04:01:04.9908277+00:00",
                ETag: "sample string 8"
            })
                }).then(res => res.json())
                .then(data => values.history.push("/CourseList"))
                .then(data => alert("Data saved successfully.."))
                .catch(err => console.log(err));
    },
    displayName: "CourseForm"
})(CourseAdd);

export default EnhancedForm;