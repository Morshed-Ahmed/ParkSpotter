import styled from "styled-components";
import EmployeeCard from "./EmployeeCard";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
  color: #202123;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #202123;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  color: #202123;
  margin-right: 10px;
`;

const Select = styled.select`
  padding: 12px;
  font-size: 14px;
  border: 2px solid #202123;
  border-radius: 8px;
  margin-right: 10px;
  outline: none;
  flex: 1;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover,
  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const Input = styled.input`
  padding: 12px;
  font-size: 14px;
  border: 2px solid #202123;
  border-radius: 8px;
  outline: none;
  flex: 2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover,
  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const SalaryFilterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SalaryFilterHeader = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #202123;
  margin-bottom: 10px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #202123;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  align-self: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const employeesData = [
  {
    mobile_no: "123-456-7890",
    username: "Rahat Khan",
    confirm_password: "password123",
    password: "password123",
    first_name: "Rahat",
    last_name: "Bhai",
    joined_date: "2022-01-15",
    qualification: "Bachelor's Degree",
    nid_card_no: "9876543210",
    address: "123 Main St",
    salary: 50000,
    profile_image: "https://via.placeholder.com/100", // Sample image URL
  },
  {
    mobile_no: "987-654-3210",
    username: "Rakib Bhai",
    confirm_password: "password456",
    password: "password456",
    first_name: "Rakib",
    last_name: "Bhai",
    joined_date: "2023-03-20",
    qualification: "Master's Degree",
    nid_card_no: "1234567890",
    address: "456 Elm St",
    salary: 60000,
    profile_image: "https://via.placeholder.com/100", // Sample image URL
  },
  {
    mobile_no: "987-654-3210",
    username: "Morshed Bhai",
    confirm_password: "password456",
    password: "password456",
    first_name: "Morshed",
    last_name: "Bhai",
    joined_date: "2023-03-20",
    qualification: "Master's Degree",
    nid_card_no: "1234567890",
    address: "456 Elm St",
    salary: 60000,
    profile_image: "https://via.placeholder.com/100", // Sample image URL
  },
  {
    mobile_no: "987-654-3210",
    username: "Jafor Bhai",
    confirm_password: "password456",
    password: "password456",
    first_name: "Jafor",
    last_name: "Bhai",
    joined_date: "2023-03-20",
    qualification: "Master's Degree",
    nid_card_no: "1234567890",
    address: "456 Elm St",
    salary: 60000,
    profile_image: "https://via.placeholder.com/100",
  },
];

const EmployeeList = () => {
  const [employees, setEmployees] = useState();
  const [filteredEmployees, setFilteredEmployees] = useState();
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFilterFieldChange = (e) => {
    setFilterField(e.target.value);
    setFilterValue("");
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
    filterEmployees(e.target.value, filterField, minSalary, maxSalary);
  };

  const handleMinSalaryChange = (e) => {
    setMinSalary(e.target.value);
    filterEmployees(filterValue, filterField, e.target.value, maxSalary);
  };

  const handleMaxSalaryChange = (e) => {
    setMaxSalary(e.target.value);
    filterEmployees(filterValue, filterField, minSalary, e.target.value);
  };

  const filterEmployees = (value, field, minSal, maxSal) => {
    let filtered = employees;

    if (field && value) {
      filtered = filtered.filter((employee) =>
        employee[field].toString().toLowerCase().includes(value.toLowerCase())
      );
    }

    if (minSal) {
      filtered = filtered.filter(
        (employee) => employee.salary >= parseFloat(minSal)
      );
    }

    if (maxSal) {
      filtered = filtered.filter(
        (employee) => employee.salary <= parseFloat(maxSal)
      );
    }

    setFilteredEmployees(filtered);
  };

  useEffect(() => {
    setLoading(true);
    const user_id = localStorage.getItem("user_id");
    fetch("https://parkspotter-backened.onrender.com/accounts/employee-list/")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.park_owner_id);
        const ownerEmployee = data.filter(
          (data) => data.park_owner_id == user_id
        );
        // console.log(ownerEmployee);
        setEmployees(ownerEmployee);
        setFilteredEmployees(ownerEmployee);
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <FilterContainer>
        <FilterSection>
          <Label htmlFor="filterField">Filter By:</Label>
          <Select
            id="filterField"
            value={filterField}
            onChange={handleFilterFieldChange}
          >
            <option value="">Select Filter Field</option>
            <option value="nid_card_no">NID Card Number</option>
            <option value="username">Username</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="qualification">Qualification</option>
            <option value="address">Address</option>
            {/* Add more options as needed */}
          </Select>
          <Input
            type="text"
            value={filterValue}
            onChange={handleFilterValueChange}
            placeholder="Enter filter value"
          />
        </FilterSection>
        <SalaryFilterSection>
          <SalaryFilterHeader>Filter by Salary Range:</SalaryFilterHeader>
          <FilterSection>
            <Input
              type="number"
              value={minSalary}
              onChange={handleMinSalaryChange}
              placeholder="Min Salary"
            />
            <Input
              type="number"
              value={maxSalary}
              onChange={handleMaxSalaryChange}
              placeholder="Max Salary"
            />
          </FilterSection>
        </SalaryFilterSection>
      </FilterContainer>
      <CardsContainer>
        {loading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {filteredEmployees?.map((employee, index) => (
              <>
                <EmployeeCard key={index} employee={employee} />
              </>
            ))}
          </>
        )}
      </CardsContainer>
    </Container>
  );
};

export default EmployeeList;
