import { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  AlertMessage,
  FlexContainer,
  FullWidthInputBox,
  InputContainer,
  LoginLink,
  StyledFormBody,
  StyledInput,
  SubmitButton,
} from "./SignUp.styles";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CustomerSignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    fetch(
      "https://parkspotter-backened.onrender.com/customer/customer_register/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Customer account successful.");
        navigate("/login");
      });
  };
  return (
    <div>
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
            <AlertMessage role="alert">Username is required</AlertMessage>
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
              <AlertMessage role="alert">First name is required</AlertMessage>
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
              <AlertMessage role="alert">Last name is required</AlertMessage>
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
              <AlertMessage role="alert">Phone number is required</AlertMessage>
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
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <AlertMessage role="alert">Password is required</AlertMessage>
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
                Password must have one uppercase letter, one lowercase letter,
                one number, and one special character.
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
                  value === password.current || "The passwords do not match",
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

        <SubmitButton type="submit" value="Create Account" />
        <p style={{ marginTop: "10px" }}>
          Don&apos;t have an account?{" "}
          <LoginLink to={"/login"}>Log In</LoginLink>
        </p>
      </StyledFormBody>
    </div>
  );
};

export default CustomerSignUp;
