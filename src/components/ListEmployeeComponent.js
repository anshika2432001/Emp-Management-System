import React, { useState, useEffect } from "react";
import axios from "../services/EmployeeService";
import { Link } from "react-router-dom";
import FooterComponent from "./FooterComponent";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const getAllEmployees = async () => {
    try {
      const res = await axios.get(`/getAllEmployees`);
      console.log(res);
      if (res.data.statusCode == 200) {
        //alternative
        // res.data.result.forEach((item) => {
        //     let obj = {
        //         "id": item.id,
        //         "firstName": item.firstName,
        //         "lastName": item.lastName,
        //         "email": item.emailId
        //     }
        //     arr.push(obj);

        // })
        setEmployees(res.data.result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log(employees);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const handleDelete = async (value) => {
    try {
      const res = await axios.delete(`/deleteEmployee/` + value);

      console.log(res);
      if (res.data.statusCode == 200 && res.data.status == true) {
        getAllEmployees();
      }
      alert(res.data.message);
    } catch (error) {
      //   showSnackbar("Error", "error")
      console.error("Error ", error);
    }
  };

  const updateOrAddEmployee = async (value) => {
    navigate("/add-employee", {
      state: {
        id: value,
      },
    });
  };

  return (
    <div className="app-container">
      <h2 className="text-center mt-4">List Employees</h2>
      <div className="content">
        <button
          className="btn btn-primary mb-2"
          onClick={() => {
            updateOrAddEmployee();
          }}
        >
          Add Employee
        </button>
        <table className="table table-bordered table-striped mb-100">
          <thead>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {employees.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.emailId}</td>
                <td>
                  <button
                    className="btn btn-info m-2"
                    onClick={() => {
                      updateOrAddEmployee(item.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-info "
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FooterComponent />
    </div>
  );
};

export default ListEmployeeComponent;
