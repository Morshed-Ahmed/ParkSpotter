import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  background-color: #fff;
  color: #202123;
  border-radius: 12px;
  padding: 20px;
  margin: 20px;
  width: calc(33% - 40px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.39);
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #202123;
  margin-bottom: 15px;
`;

const EmployeeDetail = styled.p`
  margin: 5px 0;
  font-size: 16px;
  text-align: center;

  strong {
    color: gray;
  }
`;

const DetailsButton = styled.button`
  padding: 6px 14px;
  font-size: 16px;
  color: #ffffff;
  background-color: coral;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #ff7f50;
    transform: scale(1.05);
  }
`;

const EmployeeCard = ({ employee }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/employees/${employee?.username}`);
  };
  // console.log(employee);
  return (
    <Card>
      <ProfileImage
        src={employee?.profile_image}
        alt={`${employee?.employee?.first_name}${employee?.employee?.last_name}`}
      />
      <EmployeeDetail>
        <strong>Name:</strong> {employee?.employee?.first_name}{" "}
        {employee?.employee?.last_name}
      </EmployeeDetail>
      <EmployeeDetail>
        <strong>Mobile No:</strong> {employee?.mobile_no}{" "}
      </EmployeeDetail>
      <EmployeeDetail>
        <strong>Joined Date:</strong>
        {new Date(employee?.joined_date).toLocaleDateString()}{" "}
      </EmployeeDetail>
      <EmployeeDetail>
        <strong>Salary:</strong> ${employee?.salary}
      </EmployeeDetail>
      <DetailsButton onClick={handleDetailsClick}>Details</DetailsButton>
    </Card>
  );
};

export default EmployeeCard;
