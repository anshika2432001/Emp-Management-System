package com.anshika.empmanage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anshika.empmanage.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {

}
