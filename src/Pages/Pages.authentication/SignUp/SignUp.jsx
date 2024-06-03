import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRegistrationField } from "../../../store/registration/registration.reducer";
import {
  FormContainer,
  FlexContainer,
  FormBody,
  FormHeader,
  FullWidthInputBox,
  InputContainer,
  AlertMessage,
  Container,
  HomeButton,
  LoginLink,
  StyledFormBody,
  StyledFormContainer,
  StyledFormHeader,
  StyledInput,
  StyledTextArea,
  SubmitButton,
  ModalBackground,
  ModalContent,
  CloseButton,
  TabContainer,
  Tab,
  TabContent,
  Price,
  Description,
  Title,
  SubscriptionCard,
  SubscriptionCardsContainer,
} from "./SignUp.styles";
import CustomerSignUp from "./CustomerSignUp";
import { CiHome } from "react-icons/ci";
import { TiHomeOutline } from "react-icons/ti";
import { setSubscriptionAmount } from "../../../store/payment/payment.reducer";
import { IoIosCloseCircleOutline } from "react-icons/io";


const CustomModal = ({ isOpen, onClose, children }) => {
  return (
    <ModalBackground isModalOpen={isOpen} onClick={onClose}>
      <ModalContent isModalOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <IoIosCloseCircleOutline size={"30"} />
        </CloseButton>
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const password = useRef({});
  const dispatch = useDispatch();
  password.current = watch("password", "");

  const [zoneCount, setZoneCount] = useState(0);
  const [zoneSlots, setZoneSlots] = useState([]);

  const handleZoneCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setZoneCount(count);
    setZoneSlots(new Array(count).fill(0));
  };

  const handleZoneSlotChange = (index, value) => {
    const newZoneSlots = [...zoneSlots];
    newZoneSlots[index] = parseInt(value, 10);
    setZoneSlots(newZoneSlots);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit = (data) => {
    data.nid_card_no = 12345678901;
    data.zones = zoneSlots;
    dispatch(setRegistrationField(data));
    // navigate("/payment");
    setModalOpen(true);
  };

  const [activeTab, setActiveTab] = useState("tab1");

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handlePrice = (priceString) => {
    const priceNumeric = parseFloat(priceString.replace("$", ""));
    dispatch(setSubscriptionAmount(priceNumeric));
    const is_staff = localStorage.getItem("is_staff");
    if (!is_staff) {
      navigate("/payment");
    } else {
      setModalOpen(false);
      // navigate("/payment");
    }
  };

  return (
    <Container>
      <Link to={"/"}>
        <HomeButton>
          <TiHomeOutline /> Home
        </HomeButton>
      </Link>
      <StyledFormContainer>
        <div>
          <TabContainer>
            <Tab
              active={activeTab === "tab1"}
              onClick={() => setActiveTab("tab1")}
            >
              Owner signup
            </Tab>
            <Tab
              active={activeTab === "tab2"}
              onClick={() => setActiveTab("tab2")}
            >
              Customer signup
            </Tab>
          </TabContainer>
          {activeTab === "tab1" && (
            <TabContent>
              <StyledFormHeader>Create your Owner account</StyledFormHeader>

              <StyledFormBody onSubmit={handleSubmit(onSubmit)}>
                {/* Existing Input Fields */}
                <FullWidthInputBox>
                  <StyledInput
                    placeholder="Create a username"
                    type="text"
                    {...register("username", { required: true })}
                    aria-invalid={errors.username ? "true" : "false"}
                  />
                  {errors.username?.type === "required" && (
                    <AlertMessage role="alert">
                      Username is required
                    </AlertMessage>
                  )}
                </FullWidthInputBox>
                <FlexContainer>
                  <InputContainer>
                    <StyledInput
                      placeholder="First name"
                      type="text"
                      {...register("first_name", { required: true })}
                      aria-invalid={errors.first_name ? "true" : "false"}
                    />
                    {errors.first_name?.type === "required" && (
                      <AlertMessage role="alert">
                        First name is required
                      </AlertMessage>
                    )}
                  </InputContainer>
                  <InputContainer>
                    <StyledInput
                      placeholder="Last name"
                      type="text"
                      {...register("last_name", { required: true })}
                      aria-invalid={errors.last_name ? "true" : "false"}
                    />
                    {errors.last_name?.type === "required" && (
                      <AlertMessage role="alert">
                        Last name is required
                      </AlertMessage>
                    )}
                  </InputContainer>
                </FlexContainer>
                <FlexContainer>
                  <InputContainer>
                    <StyledInput
                      placeholder="Email address"
                      type="email"
                      {...register("email", { required: true })}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    {errors.email?.type === "required" && (
                      <AlertMessage role="alert">
                        Email address is required
                      </AlertMessage>
                    )}
                  </InputContainer>
                  <InputContainer>
                    <StyledInput
                      placeholder="Phone number"
                      type="text"
                      {...register("mobile_no", { required: true })}
                      aria-invalid={errors.mobile_no ? "true" : "false"}
                    />
                    {errors.mobile_no?.type === "required" && (
                      <AlertMessage role="alert">
                        Phone number is required
                      </AlertMessage>
                    )}
                  </InputContainer>
                </FlexContainer>
                <FlexContainer>
                  <InputContainer>
                    <StyledInput
                      placeholder="Password"
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern:
                          /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      })}
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                    {errors.password?.type === "required" && (
                      <AlertMessage role="alert">
                        Password is required
                      </AlertMessage>
                    )}
                    {errors.password?.type === "minLength" && (
                      <AlertMessage role="alert">
                        Password must be 6 characters
                      </AlertMessage>
                    )}
                    {errors.password?.type === "maxLength" && (
                      <AlertMessage role="alert">
                        Password must be less than 20 characters
                      </AlertMessage>
                    )}
                    {errors.password?.type === "pattern" && (
                      <AlertMessage role="alert">
                        Password must have one uppercase letter, one lowercase
                        letter, one number, and one special character.
                      </AlertMessage>
                    )}
                  </InputContainer>
                  <InputContainer>
                    <StyledInput
                      placeholder="Confirm Password"
                      type="password"
                      {...register("confirm_password", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === password.current ||
                          "The passwords do not match",
                      })}
                      aria-invalid={errors.confirm_password ? "true" : "false"}
                    />
                    {errors.confirm_password && (
                      <AlertMessage role="alert">
                        {errors.confirm_password?.message}
                      </AlertMessage>
                    )}
                  </InputContainer>
                </FlexContainer>
                <FlexContainer>
                  <InputContainer>
                    <StyledInput
                      placeholder="Slot size"
                      type="number"
                      {...register("slot_size", { required: true })}
                      aria-invalid={errors.slot_size ? "true" : "false"}
                    />
                    {errors.slot_size?.type === "required" && (
                      <AlertMessage role="alert">
                        Slot size is required
                      </AlertMessage>
                    )}
                  </InputContainer>
                  <InputContainer>
                    <StyledInput
                      placeholder="Capacity"
                      type="number"
                      {...register("capacity", { required: true })}
                      aria-invalid={errors.capacity ? "true" : "false"}
                    />
                    {errors.capacity?.type === "required" && (
                      <AlertMessage role="alert">
                        Capacity is required
                      </AlertMessage>
                    )}
                  </InputContainer>
                </FlexContainer>
                <FlexContainer>
                  <InputContainer>
                    <StyledTextArea
                      placeholder="Address"
                      rows="3"
                      {...register("address", { required: true })}
                      aria-invalid={errors.address ? "true" : "false"}
                    />
                    {errors.address?.type === "required" && (
                      <AlertMessage role="alert">
                        Address is required
                      </AlertMessage>
                    )}
                  </InputContainer>
                  <InputContainer>
                    <StyledTextArea
                      placeholder="Area"
                      rows="3"
                      {...register("area", { required: true })}
                      aria-invalid={errors.area ? "true" : "false"}
                    />
                    {errors.area?.type === "required" && (
                      <AlertMessage role="alert">Area is required</AlertMessage>
                    )}
                  </InputContainer>
                </FlexContainer>

                {/* Zone Input Fields */}
                <FullWidthInputBox>
                  <StyledInput
                    placeholder="Number of zones"
                    type="number"
                    value={zoneCount}
                    onChange={handleZoneCountChange}
                    aria-invalid={errors.zones ? "true" : "false"}
                  />
                </FullWidthInputBox>

                {zoneSlots.map((slot, index) => (
                  <FullWidthInputBox key={index}>
                    <StyledInput
                      placeholder={`Slots in zone ${index + 1}`}
                      type="number"
                      value={zoneSlots[index]}
                      onChange={(e) =>
                        handleZoneSlotChange(index, e.target.value)
                      }
                    />
                  </FullWidthInputBox>
                ))}

                <SubmitButton type="submit" value="Create Account" />
                <p style={{ marginTop: "10px" }}>
                  Don&apos;t have an account?{" "}
                  <LoginLink to={"/login"}>Log In</LoginLink>
                </p>
              </StyledFormBody>

              <div>
                <CustomModal isOpen={modalOpen} onClose={closeModal}>
                  <SubscriptionCardsContainer>
                    <SubscriptionCard onClick={() => handlePrice("$9.99")}>
                      <Title>1 Month Plan</Title>
                      <Description>
                        Access to basic features for 1 month
                      </Description>
                      <Price>$9.99</Price>
                    </SubscriptionCard>
                    <SubscriptionCard onClick={() => handlePrice("$49.99")}>
                      <Title>6 Month Plan</Title>
                      <Description>
                        Access to basic features for 6 months
                      </Description>
                      <Price>$49.99</Price>
                    </SubscriptionCard>
                    <SubscriptionCard onClick={() => handlePrice("$89.99")}>
                      <Title>1 Year Plan</Title>
                      <Description>
                        Access to basic features for 1 year
                      </Description>
                      <Price>$89.99</Price>
                    </SubscriptionCard>
                  </SubscriptionCardsContainer>
                </CustomModal>
              </div>
            </TabContent>
          )}
          {activeTab === "tab2" && (
            <TabContent>
              <StyledFormHeader>Create your Customer account</StyledFormHeader>
              <CustomerSignUp />
            </TabContent>
          )}
        </div>
      </StyledFormContainer>
    </Container>
  );
};

export default SignUp;
