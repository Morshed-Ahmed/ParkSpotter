import EmployeeCard from "./EmployeeCard/EmployeeCard";
import { useEffect, useState } from "react";
import EmployeeDetailsModal from "./EmployeeDetailsModal/EmployeeDetailsModal";
import EmployeePaymentModal from "./EmployeePaymentModal/EmployeePaymentModal";
import toast from "react-hot-toast";
import {
  CardsContainer,
  Container,
  FilterContainer,
  FilterSection,
  Input,
  Loader,
  SalaryFilterSection,
  Select,
} from "./EmployeeList.styled";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const user_id = localStorage.getItem("user_id");
    fetch("https://parkspotter-backened.onrender.com/accounts/employee-list/")
      .then((res) => res.json())
      .then((data) => {
        const ownerEmployee = data.filter(
          (data) => data.park_owner_id == user_id
        );
        setEmployees(ownerEmployee);
        setFilteredEmployees(ownerEmployee);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    filterEmployees(filterValue, filterField, minSalary, maxSalary);
  }, [filterValue, filterField, minSalary, maxSalary]);

  const handleFilterFieldChange = (e) => {
    setFilterField(e.target.value);
    setFilterValue("");
  };

  const handleFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handleMinSalaryChange = (e) => {
    setMinSalary(e.target.value);
  };

  const handleMaxSalaryChange = (e) => {
    setMaxSalary(e.target.value);
  };

  const filterEmployees = (value, field, minSal, maxSal) => {
    let filtered = employees;

    if (field && value) {
      filtered = filtered.filter((employee) =>
        employee[field]?.toString().toLowerCase().includes(value.toLowerCase())
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

  const [salaryModalOpen, setSalaryModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };
  const paymentCloseModal = () => {
    setSalaryModalOpen(false);
    setModalData(null);
  };

  const handleDetails = (employeeData) => {
    setModalData(employeeData);
    setModalOpen(true);
  };

  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [effectiveTo, setEffectiveTo] = useState("");

  const handlePaymentPaid = (employee, salaryData, setIsPaid) => {
    setModalData({ employee, salaryData, setIsPaid });
    if (salaryData.effective_to) {
      setEffectiveFrom(salaryData.effective_to);
    } else {
      setEffectiveFrom(salaryData.payment_date.split("T")[0]);
    }

    setEffectiveTo(salaryData.effective_to || "");
    setSalaryModalOpen(true);
  };

  const handlePaymentButton = () => {
    fetch(
      `https://parkspotter-backened.onrender.com/accounts/salary/${modalData?.salaryData?.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          is_paid: true,
          effective_from: effectiveFrom,
          effective_to: effectiveTo,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to update payment status");
      })
      .then((data) => {
        modalData.setIsPaid(true);
        toast.success("Payment successful");
      })
      .catch((error) => {
        console.error("Error updating payment status:", error);
      });
  };

  return (
    <Container>
      <FilterContainer>
        <FilterSection>
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
          </Select>
          <Input
            type="text"
            value={filterValue}
            onChange={handleFilterValueChange}
            placeholder="Enter filter value"
          />
        </FilterSection>
        <SalaryFilterSection>
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
          <Loader />
        ) : (
          filteredEmployees.map((employee, index) => (
            <EmployeeCard
              key={index}
              employee={employee}
              onDetailsClick={handleDetails}
              onPaymentClick={handlePaymentPaid}
            />
          ))
        )}
      </CardsContainer>
      <EmployeeDetailsModal isOpen={modalOpen} onClose={closeModal} employeeData={modalData} />
      <EmployeePaymentModal isOpen={salaryModalOpen} onClose={paymentCloseModal}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePaymentButton();
          }}
        >
          <FilterSection>
            Last Paid:
            <Input
              type="date"
              value={effectiveFrom}
              onChange={(e) => setEffectiveFrom(e.target.value)}
              required
            />
          </FilterSection>
          <FilterSection>
            Payment Date:
            <Input
              type="date"
              value={effectiveTo}
              onChange={(e) => setEffectiveTo(e.target.value)}
            />
          </FilterSection>
          <button
            style={{
              background: "coral",
              padding: "5px 15px",
              borderRadius: "5px",
              color: "white",
              marginTop: "5px",
            }}
            type="submit"
          >
            Payment
          </button>
        </form>
      </EmployeePaymentModal>
    </Container>
  );
};

export default EmployeeList;
