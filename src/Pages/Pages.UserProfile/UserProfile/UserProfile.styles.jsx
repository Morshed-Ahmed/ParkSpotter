import styled from "styled-components";

export const DropdownItem = styled.button`
  color: black;
  padding: 10px 20px;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  background-color: transparent;

  &:hover {
    background-color: #ddd;
    border-radius: 10px;
  }
`;

export const ProfileTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin: 12px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const CircularImageContainer = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  margin: auto;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  width: 400px;
  margin: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  &:disabled {
    background-color: #e9ecef;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const EditButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #007bff;
  background-color: #fff;
  border: 1px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e9ecef;
  }
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
  &:disabled {
    background-color: #c3e6cb;
    cursor: not-allowed;
  }
`;

export const ProfileFieldContainer = styled.div`
  margin-top: 12px;
`;
