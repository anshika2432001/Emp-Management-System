import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Field, Form, useFormik } from "formik";
import axios from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AddEmployeeComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const employeeId = location.state.id;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    emailId: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      emailId: "",
    },

    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  const getEmployeeInfo = async (employeeId) => {
    try {
      const res = await axios.get(`/getEmployeeById/${employeeId}`);
      console.log(res);
      if (res.data.status == true && res.data.statusCode == 200) {
        formik.setFieldValue("firstName", res.data.result.firstName);
        formik.setFieldValue("lastName", res.data.result.lastName);
        formik.setFieldValue("emailId", res.data.result.emailId);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    if (employeeId) {
      getEmployeeInfo(employeeId);
    }
  }, []);

  const SaveData = async (values) => {
    // event.preventDefault();
    const touched = Object.keys(formik.initialValues).reduce((result, item) => {
      result[item] = true;
      return result;
    }, {});
    // Touch all fields without running validations
    formik.setTouched(touched, false);
    formik.setSubmitting(true);

    formik
      .validateForm()
      .then((formErrors) => {
        if (Object.keys(formErrors).length > 0) {
          alert("Please enter all required fields", "error");
        } else {
          if (employeeId) {
            updateFormData(values);
          } else {
            saveFormData(values);
          }
        }
      })
      .catch((err) => {
        formik.setSubmitting(false);
      });
  };

  const updateFormData = async (values) => {
    console.log(values);

    let payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      emailId: values.emailId,
    };

    console.log(payload);
    try {
      const res = await axios.put(`/updateEmployee/${employeeId}`, payload);
      console.log(res);

      if (res.data.status == true && res.data.statusCode == 200) {
        navigate("/employees");
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const saveFormData = async (values) => {
    console.log(values);

    let payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      emailId: values.emailId,
    };

    console.log(payload);
    try {
      const res = await axios.post("/addEmployee", payload);
      console.log(res);

      if (res.data.status == true && res.data.statusCode == 200) {
        navigate("/employees");
      }
    } catch (error) {
      console.error("Error ", error);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 style={{ textAlign: "center" }}>
                <u>Add Employee</u>
              </h3>
              <div className="card-body">
                <div className="form-group mb-2">
                  <label className="form-label"> First Name :</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    className="form-control"
                    value={formik.values.firstName}
                    // onChange = {(e) => setFirstName(e.target.value)}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Last Name :</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    name="lastName"
                    className="form-control"
                    value={formik.values.lastName}
                    // onChange = {(e) => setLastName(e.target.value)}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Email Id :</label>
                  <input
                    type="email"
                    placeholder="Enter email Id"
                    name="emailId"
                    className="form-control"
                    value={formik.values.emailId}
                    error={
                      formik.touched.emailId && Boolean(formik.errors.emailId)
                    }
                    helperText={formik.touched.emailId && formik.errors.emailId}
                    // onChange = {(e) => setEmailId(e.target.value)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></input>
                </div>
                {employeeId ? (
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      SaveData(formik.values);
                    }}
                  >
                    Update{" "}
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      SaveData(formik.values);
                    }}
                  >
                    Submit{" "}
                  </button>
                )}

                <Link to="/employees" className="btn btn-danger">
                  {" "}
                  Cancel{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddEmployeeComponent;
