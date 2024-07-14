package com.anshika.empmanage.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.anshika.empmanage.dto.ApiResponse;
import com.anshika.empmanage.dto.EmployeeDto;
import com.anshika.empmanage.entity.Employee;
import com.anshika.empmanage.exception.ResourceNotFoundException;
import com.anshika.empmanage.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees(){

        List<Employee> employeeList = employeeRepository.findAll();
        return employeeList;
        
    }

    public ApiResponse<Employee> addEmployee(EmployeeDto employeeDto) {
        try{
       Employee employee = new Employee();
       employee.setFirstName(employeeDto.getFirstName());
       employee.setLastName(employeeDto.getLastName());
       employee.setEmailId(employeeDto.getEmailId());

       Employee result = employeeRepository.save(employee);
       System.out.println(result);
    //    return result;
       return new ApiResponse<>(true, "Details Saved Successfully.", result, HttpStatus.OK.value());
        }
        catch(Exception e){
            return new ApiResponse<>(false, "Error", HttpStatus.NOT_FOUND);
        }
    }

	public Optional<Employee> deleteEmployee(long empId) {
       
		Optional<Employee> employee = employeeRepository.findById(empId);

        employeeRepository.deleteById(empId);
        return employee;
	}

    public Employee updateEmployee(long empId, EmployeeDto employeeDto) {

        Employee employee = employeeRepository.findById(empId).orElseThrow(()-> new ResourceNotFoundException("N RECORD"));

      

        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmailId(employeeDto.getEmailId());
        Employee result = employeeRepository.save(employee);
       System.out.println(result);
       return result;
    }

    public Optional<Employee> getEmployeeById(long empId) {

        Optional<Employee> employee = employeeRepository.findById(empId);
        return employee;
        
    }

}
