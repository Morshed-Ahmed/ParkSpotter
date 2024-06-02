import { useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import {
  ButtonContainer,
  CancelButton,
  CircularImageContainer,
  DropdownItem,
  EditButton,
  Image,
  Label,
  ProfileField,
  ProfileFieldContainer,
  ProfileTitle,
  SaveButton,
  Input,
} from "./UserProfile.styles";

const UserProfile = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    id: 0,
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    mobile_no: "",
    nid_card_no: "",
    slot_size: "",
    capacity: "",
    address: "",
    area: "",
    payment_method: "",
    amount: "",
    payment_date: "",
    joined_date: "",
    latitude: "",
    longitude: "",
    available_slot: "",
    subscription_id: "",
    qualification: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "park_owner") {
      fetch(`https://parkspotter-backened.onrender.com/accounts/profile/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFormValues({
            id: data.id || 0,
            username: data.park_owner_id.username || "",
            email: data.park_owner_id.email || "",
            first_name: data.park_owner_id.first_name || "",
            last_name: data.park_owner_id.last_name || "",
            mobile_no: data.mobile_no || "",
            nid_card_no: data.nid_card_no || "",
            slot_size: data.slot_size || "",
            capacity: data.capacity || "",
            address: data.address || "",
            area: data.area || "",
            payment_method: data.payment_method || "",
            amount: data.amount || "",
            payment_date: data.payment_date || "",
            joined_date: data.joined_date || "",
            latitude: data.latitude || "",
            longitude: data.longitude || "",
            available_slot: data.available_slot || "",
            subscription_id: data.subscription_id || "",
            qualification: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        });
    } else if (role === "employee") {
      fetch(`https://parkspotter-backened.onrender.com/accounts/employee-list/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const employeeData = data.find((emp) => emp.employee.id === parseInt(user_id));
          if (employeeData) {
            setFormValues({
              id: employeeData.id || 0,
              username: employeeData.employee.username || "",
              email: employeeData.employee.email || "",
              first_name: employeeData.employee.first_name || "",
              last_name: employeeData.employee.last_name || "",
              mobile_no: employeeData.mobile_no || "",
              nid_card_no: employeeData.nid_card_no || "",
              address: employeeData.address || "",
              joined_date: employeeData.joined_date || "",
              qualification: employeeData.qualification || "",
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
          }
        });
    }
  }, [user_id, token, role]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    if (role === "park_owner") {
      const updatedProfile = {
        id: formValues.id,
        park_owner_id: {
          id: formValues.id,
          username: formValues.username,
          email: formValues.email,
          first_name: formValues.first_name,
          last_name: formValues.last_name,
        },
        image: null,
        mobile_no: formValues.mobile_no,
        nid_card_no: formValues.nid_card_no,
        slot_size: formValues.slot_size,
        capacity: formValues.capacity,
        address: formValues.address,
        area: formValues.area,
        payment_method: formValues.payment_method,
        amount: formValues.amount,
        payment_date: formValues.payment_date,
        joined_date: formValues.joined_date,
        latitude: formValues.latitude,
        longitude: formValues.longitude,
        available_slot: formValues.available_slot,
        subscription_id: formValues.subscription_id,
      };

      fetch(`https://parkspotter-backened.onrender.com/accounts/profile/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Profile updated:", data);
          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    } else if (role === "employee") {
      const updatedProfile = {
        id: formValues.id,
        employee: {
          id: formValues.id,
          username: formValues.username,
          email: formValues.email,
          first_name: formValues.first_name,
          last_name: formValues.last_name,
        },
        mobile_no: formValues.mobile_no,
        nid_card_no: formValues.nid_card_no,
        address: formValues.address,
        joined_date: formValues.joined_date,
        qualification: formValues.qualification,
        park_owner_id: 1, // Assuming the park_owner_id is known or retrieved separately
      };

      fetch(`https://parkspotter-backened.onrender.com/accounts/employee-list/${formValues.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Profile updated:", data);
          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
        });
    }
  };

  return (
    <div>
      <DropdownItem type="button" onClick={handleOpen}>
        Profile
      </DropdownItem>
      <Modal isOpen={open} onClose={handleClose}>
        <div>
          <ProfileTitle>Personal Information</ProfileTitle>

          <CircularImageContainer>
            <Image
              src={
                "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1715644800&semt=sph"
              }
              alt={"Profile image"}
            />
          </CircularImageContainer>
          <ProfileFieldContainer>
            <ProfileField>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
                disabled
              />
            </ProfileField>
            <ProfileField>
              <Label>Email Address</Label>
              <Input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                disabled
              />
            </ProfileField>
            <ProfileField>
              <Label>First Name</Label>
              <Input
                type="text"
                name="first_name"
                value={formValues.first_name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </ProfileField>
            <ProfileField>
              <Label>Last Name</Label>
              <Input
                type="text"
                name="last_name"
                value={formValues.last_name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </ProfileField>
            <ProfileField>
              <Label>Phone</Label>
              <Input
                type="tel"
                name="mobile_no"
                value={formValues.mobile_no}
                onChange={handleInputChange}
                disabled={role !== "park_owner" && !isEditing}
              />
            </ProfileField>
            <ProfileField>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </ProfileField>
            {role === "park_owner" && (
              <>
                <ProfileField>
                  <Label>Area</Label>
                  <Input
                    type="text"
                    name="area"
                    value={formValues.area}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </ProfileField>
                <ProfileField>
                  <Label>NID Card Number</Label>
                  <Input
                    type="text"
                    name="nid_card_no"
                    value={formValues.nid_card_no}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </ProfileField>
                <ProfileField>
                  <Label>Slot Size</Label>
                  <Input
                    type="text"
                    name="slot_size"
                    value={formValues.slot_size}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </ProfileField>
                <ProfileField>
                  <Label>Capacity</Label>
                  <Input
                    type="text"
                    name="capacity"
                    value={formValues.capacity}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </ProfileField>
                <ProfileField>
                  <Label>Payment Method</Label>
                  <Input
                    type="text"
                    name="payment_method"
                    value={formValues.payment_method}
                    onChange={handleInputChange}
                    disabled
                  />
                </ProfileField>
                <ProfileField>
                  <Label>Amount</Label>
                  <Input
                    type="text"
                    name="amount"
                    value={formValues.amount}
                    onChange={handleInputChange}
                    disabled
                  />
                </ProfileField>
                <ProfileField>
                  <Label>Payment Date</Label>
                  <Input
                    type="date"
                    name="payment_date"
                    value={formValues.payment_date}
                    onChange={handleInputChange}
                    disabled
                  />
                </ProfileField>
              </>
            )}
            {role === "employee" && (
              <ProfileField>
                <Label>Qualification</Label>
                <Input
                  type="text"
                  name="qualification"
                  value={formValues.qualification}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </ProfileField>
            )}
            <ProfileField>
              <Label>Joined Date</Label>
              <Input
                type="text"
                name="joined_date"
                value={formValues.joined_date}
                onChange={handleInputChange}
                disabled
              />
            </ProfileField>

            {isEditing && role === "park_owner" && (
              <>
                <ProfileField>
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formValues.currentPassword}
                    onChange={handleInputChange}
                  />
                </ProfileField>
                <ProfileField>
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formValues.newPassword}
                    onChange={handleInputChange}
                  />
                </ProfileField>
                <ProfileField>
                  <Label>Retype New Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Retype New Password"
                    value={formValues.confirmPassword}
                    onChange={handleInputChange}
                  />
                </ProfileField>
              </>
            )}
            <ButtonContainer>
              {isEditing ? (
                <>
                  <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
                  <SaveButton onClick={handleSaveClick}>Save Changes</SaveButton>
                </>
              ) : (
                <EditButton onClick={handleEditClick}>Edit Profile</EditButton>
              )}
            </ButtonContainer>
          </ProfileFieldContainer>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
