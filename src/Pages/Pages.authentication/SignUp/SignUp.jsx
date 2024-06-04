import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRegistrationField } from "../../../store/registration/registration.reducer";
import { setPaymentDate } from "../../../store/payment/payment.reducer"; // Import the setPaymentDate action
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
  TabContainer,
  Tab,
  TabContent,
} from "./SignUp.styles";
import CustomerSignUp from "./CustomerSignUp";
import { TiHomeOutline } from "react-icons/ti";
import SubscriptionModal from "./SubscriptionModal.component";

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

  const [modalOpen, setModalOpen] = useState(false);

  const onSubmit = (data) => {
    data.slot_size = 0;
    data.capacity = 0;
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    data.payment_date = today; // Add payment_date to the form data
    dispatch(setRegistrationField(data));
    dispatch(setPaymentDate(today)); // Dispatch setPaymentDate action with today's date
    setModalOpen(true);
  };

  const [activeTab, setActiveTab] = useState("tab1");

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
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

                {/* New NID Card NO Input Field */}
                <FullWidthInputBox>
                  <StyledInput
                    placeholder="NID Card NO"
                    type="text"
                    {...register("nid_card_no", { required: true })}
                    aria-invalid={errors.nid_card_no ? "true" : "false"}
                  />
                  {errors.nid_card_no?.type === "required" && (
                    <AlertMessage role="alert">
                      NID Card NO is required
                    </AlertMessage>
                  )}
                </FullWidthInputBox>

                {/* Payment Date Field */}
                <FullWidthInputBox>
                  <StyledInput
                    placeholder="Payment Date"
                    type="date"
                    value={new Date().toISOString().split("T")[0]}
                    readOnly
                  />
                </FullWidthInputBox>

                <SubmitButton type="submit" value="Create Account" />
                <p style={{ marginTop: "10px" }}>
                  Don&apos;t have an account?{" "}
                  <LoginLink to={"/login"}>Log In</LoginLink>
                </p>
              </StyledFormBody>

              <SubscriptionModal isOpen={modalOpen} onClose={closeModal} />
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
