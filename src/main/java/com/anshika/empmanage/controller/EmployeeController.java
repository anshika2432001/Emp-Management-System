package com.anshika.empmanage.controller;

import org.springframework.web.bind.annotation.RestController;

import com.anshika.empmanage.dto.EmployeeDto;
import com.anshika.empmanage.entity.Employee;
import com.anshika.empmanage.services.EmployeeService;
import com.anshika.empmanage.dto.ApiResponse;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/employeeManagement")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // getAllEmployees
    @GetMapping("/getAllEmployees")
    public ApiResponse<List<Employee>> getAllEmployees() {

        try {
            List<Employee> employeeList = employeeService.getAllEmployees();

            return new ApiResponse<>(true, "Details Fetched Successfully.", employeeList, HttpStatus.OK.value());

        } catch (Exception e) {
            System.out.println(e);
            return new ApiResponse<>(false, "Error", HttpStatus.NOT_FOUND);

        }

    }

    //get employee by id
    @GetMapping("/getEmployeeById/{empId}")
    public ApiResponse<Optional<Employee>> getEmployeeById(@PathVariable("empId") long empId) {

        try {
            Optional<Employee> employee = employeeService.getEmployeeById(empId);

            return new ApiResponse<>(true, "Details Fetched Successfully.", employee, HttpStatus.OK.value());

        } catch (Exception e) {
            System.out.println(e);
            return new ApiResponse<>(false, "Error", HttpStatus.NOT_FOUND);

        }

    }


    // add a employee
    @PostMapping("/addEmployee")
    public ApiResponse<Employee> addEmployee(@RequestBody EmployeeDto employeeDto) {

        // try {
        //     Employee employee = employeeService.addEmployee(employeeDto);
        //     return new ApiResponse<>(true, "Details Saved Successfully.", employee, HttpStatus.OK.value());
        // } catch (Exception e) {
        //     return new ApiResponse<>(false, "Error", HttpStatus.NOT_FOUND);

        // }
        return employeeService.addEmployee(employeeDto);
    }

    // delete a employee
    @DeleteMapping("/deleteEmployee/{empId}")
    public ApiResponse<Optional<Employee>> deleteEmployee(@PathVariable("empId") long empId) {

        

        try {
            Optional<Employee> employee = employeeService.deleteEmployee(empId);
            return new ApiResponse<>(true, "Details deleted Successfully.", employee, HttpStatus.OK.value());
        } catch (Exception e) {
            return new ApiResponse<>(false, "Error", HttpStatus.NOT_FOUND);

        }



    }


    //update a employee
    @PutMapping("updateEmployee/{empId}")
    public ApiResponse<Employee> updateEmployee(@PathVariable long empId , @RequestBody EmployeeDto employeeDto) {
        
        
        try {
            Employee employee = employeeService.updateEmployee(empId,employeeDto);
            return new ApiResponse<>(true, "Details Updated Successfully.", employee, HttpStatus.OK.value());
        } catch (Exception e) {
            return new ApiResponse<>(false, "Error", HttpStatus.NOT_FOUND);

        }
    }

}
