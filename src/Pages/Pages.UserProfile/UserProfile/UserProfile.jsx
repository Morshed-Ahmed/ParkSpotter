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
    fullName: "",
    email: "",
    mobile_no: "",
    address: "",
    area: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(
      `https://parkspotter-backened.onrender.com/accounts/profile/${user_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setFormValues({
          username: data.park_owner_id.username || "",
          email: data.park_owner_id.email || "",
          mobile_no: data.mobile_no || "",
          address: data.address || "",
          area: data.area || "",
          nid_card_no: data.nid_card_no || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      });
  }, [user_id]);

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
    fetch(
      `https://parkspotter-backened.onrender.com/accounts/profile/${user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: formValues.username,
          email: formValues.email,
          mobile_no: formValues.mobile_no,
          address: formValues.address,
          area: formValues.area,
          nid_card_no: formValues.nid_card_no,
          password: formValues.newPassword,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Profile updated:", data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
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
                disabled={!isEditing}
              />
            </ProfileField>
            <ProfileField>
              <Label>Email Address</Label>
              <Input
                type="email"
                name="email"
                value={formValues.email}
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
                disabled={!isEditing}
              />
            </ProfileField>
            <ProfileField>
              <Label>Address</Label>
              <Input
                type="tel"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </ProfileField>
            <ProfileField>
              <Label>Area</Label>
              <Input
                type="tel"
                name="area"
                value={formValues.area}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </ProfileField>
            <ProfileField>
              <Label>Nid No</Label>
              <Input
                type="tel"
                name="nid_card_no"
                value={formValues.nid_card_no}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </ProfileField>

            {/* {isEditing && (
              <>
                <ProfileField>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formValues.currentPassword}
                    onChange={handleInputChange}
                  />
                </ProfileField>
                <ProfileField>
                  <Input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formValues.newPassword}
                    onChange={handleInputChange}
                  />
                </ProfileField>
                <ProfileField>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Retype Password"
                    value={formValues.confirmPassword}
                    onChange={handleInputChange}
                  />
                </ProfileField>
              </>
            )}
            <ButtonContainer>
              {isEditing ? (
                <>
                  <CancelButton onClick={handleCancelClick}>
                    Cancel
                  </CancelButton>
                  <SaveButton onClick={handleSaveClick}>
                    Save Changes
                  </SaveButton>
                </>
              ) : (
                <EditButton onClick={handleEditClick}>Edit Profile</EditButton>
              )}
            </ButtonContainer> */}
          </ProfileFieldContainer>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
