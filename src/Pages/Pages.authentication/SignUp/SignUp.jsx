import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  FlexContainer,
  FormBody,
  FormContainer,
  FormHeader,
  FullWidthInputBox,
  InputContainer,
} from "../SignUp/SignUp.styles";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    data.payment_method = "stripe";
    data.payment_date = "2024-05-11";
    data.amount = 2000;
    data.nid_card_no = 12345678901;
    // console.log(data);
    fetch("https://parkspottermain.pythonanywhere.com/accounts/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error:");
        }
        return response.json();
      })
      .then((data) => {
        toast.success(data);
        navigate("/login");
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Link to={"/"}>
        <button style={{ margin: "10px", padding: "10px" }}>Home</button>
      </Link>
      <FormContainer>
        <FormHeader>Create your account</FormHeader>
        <FormBody onSubmit={handleSubmit(onSubmit)}>
          <FullWidthInputBox>
            <input
              placeholder="Create a username"
              type="text"
              {...register("username", { required: true })}
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username?.type === "required" && (
              <p role="alert">Username name is required</p>
            )}
          </FullWidthInputBox>
          <FlexContainer>
            <InputContainer>
              <input
                placeholder="First name"
                type="text"
                {...register("first_name", { required: true })}
                aria-invalid={errors.first_name ? "true" : "false"}
              />
              {errors.first_name?.type === "required" && (
                <p role="alert">First name is required</p>
              )}
            </InputContainer>
            <InputContainer>
              <input
                placeholder="Last name"
                type="text"
                {...register("last_name", { required: true })}
                aria-invalid={errors.last_name ? "true" : "false"}
              />
              {errors.last_name?.type === "required" && (
                <p role="alert">Last Name is required</p>
              )}
            </InputContainer>
          </FlexContainer>
          <FlexContainer>
            <InputContainer>
              <input
                placeholder="Email address"
                type="email"
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email?.type === "required" && (
                <p role="alert">Email address is required</p>
              )}
            </InputContainer>
            <InputContainer>
              <input
                placeholder="Phone number"
                type="text"
                {...register("mobile_no", { required: true })}
                aria-invalid={errors.mobile_no ? "true" : "false"}
              />
              {errors.mobile_no?.type === "required" && (
                <p role="alert">Phone number is required</p>
              )}
            </InputContainer>
          </FlexContainer>

          <FlexContainer>
            <InputContainer>
              <input
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
              {/* Password validation error messages */}
              {errors.password?.type === "required" && (
                <p role="alert">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p role="alert">Password must be 6 characters</p>
              )}

              {errors.password?.type === "maxLength" && (
                <p role="alert">Password must be less than 20 characters</p>
              )}
              {errors.password?.type === "pattern" && (
                <p role="alert">
                  Password must have one Uppercase one lower case, one number
                  and one special character.
                </p>
              )}
            </InputContainer>
            <InputContainer>
              <input
                placeholder="Confirm Password"
                type="password"
                {...register("confirm_password", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
                aria-invalid={errors.confirm_password ? "true" : "false"}
              />
              {/* Confirm password validation error message */}
              {errors.confirm_password && (
                <p role="alert">{errors.confirm_password?.message}</p>
              )}
            </InputContainer>
          </FlexContainer>

          <FlexContainer>
            <InputContainer>
              <input
                placeholder="Slot size"
                type="number"
                {...register("slot_size", { required: true })}
                aria-invalid={errors.slot_size ? "true" : "false"}
              />
              {errors.slot_size?.type === "required" && (
                <p role="alert">Slot size is required</p>
              )}
            </InputContainer>
            <InputContainer>
              <input
                placeholder="Capacity"
                type="number"
                {...register("capacity", { required: true })}
                aria-invalid={errors.capacity ? "true" : "false"}
              />
              {errors.capacity?.type === "required" && (
                <p role="alert">Capacity is required</p>
              )}
            </InputContainer>
          </FlexContainer>

          <FlexContainer>
            <InputContainer>
              <textarea
                placeholder="Address"
                type="textarea"
                rows="3"
                {...register("address", { required: true })}
                aria-invalid={errors.address ? "true" : "false"}
              />
              {errors.address?.type === "required" && (
                <p role="alert">Address is required</p>
              )}
            </InputContainer>
            <InputContainer>
              <textarea
                placeholder="Area"
                type="textarea"
                rows="3"
                {...register("area", { required: true })}
                aria-invalid={errors.area ? "true" : "false"}
              />
              {errors.area?.type === "required" && (
                <p role="alert">Area is required</p>
              )}
            </InputContainer>
          </FlexContainer>

          <input type="submit" value={"Create Account"} />
          <p>
            Don&apos;t have an account? <Link to={"/login"}>Log In</Link>
          </p>
        </FormBody>
      </FormContainer>
    </div>
  );
};

export default SignUp;
