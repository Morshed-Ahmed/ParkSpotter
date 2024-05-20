import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import {
  FlexContainer,
  FormBody,
  FormContainer,
  FormHeader,
  FullWidthInputBox,
  InputContainer,
} from "../SignUp/SignUp.styles"
import { useDispatch } from "react-redux"
import { setRegistrationField } from "../../../store/registration/registration.reducer"

const SignUp = () => {
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm()

  const password = useRef({})
  const dispatch = useDispatch()
  password.current = watch("password", "")

  const [zoneCount, setZoneCount] = useState(0)

  const onSubmit = (data) => {
    const zones = {};
    for (let i = 1; i <= zoneCount; i++) {
      const parkingLotsKey = `parking_lots_${i}`;
      const parkingLots = data[parkingLotsKey] || 0;
      const slots = Array.from({ length: parkingLots }, (_, index) => ({
        id: `Slot ${index + 1}`,
        available: true,
      }));
      zones[`Zone ${i}`] = { slots };
      delete data[parkingLotsKey];
    }
    data.nid_card_no = 12345678901;
    data.zones = zones;
    console.log(data);
    dispatch(setRegistrationField(data));
    navigate("/payment");
  }

  const renderParkingLotsInputFields = () => {
    const parkingLotsInputFields = []
    for (let i = 1; i <= zoneCount; i++) {
      parkingLotsInputFields.push(
        <InputContainer key={i}>
          <input
            style={{
              padding: "10px",
              borderRadius: "5px",
              width: "100%",
            }}
            placeholder={`Number of Parking Lots for Zone ${i}`}
            type="number"
            {...register(`parking_lots_${i}`, { required: false })}
            aria-invalid={errors[`parking_lots_${i}`] ? "true" : "false"}
          />
          {errors[`parking_lots_${i}`]?.type === "required" && (
            <p role="alert" style={{ color: "coral" }}>
              Number of parking lots is required for Zone {i}
            </p>
          )}
        </InputContainer>
      )
    }
    return parkingLotsInputFields
  }

  return (
    <div style={{ color: "#202123", backgroundColor: "#fff", padding: "20px" }}>
      <Link to={"/"}>
        <button
          style={{
            margin: "10px",
            padding: "10px",
            backgroundColor: "#202123",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          Home
        </button>
      </Link>
      <FormContainer
        style={{
          backgroundColor: "#fff",
          color: "#202123",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
        }}
      >
        <FormHeader
          style={{
            fontSize: "1.5em",
            margin: "20px auto 40px auto",
            width: "60%",
            color: "#202123",
            fontWeight: "bold",
            padding: "7px 14px",
            borderRadius: "30px",
          }}
        >
          Create your account
        </FormHeader>
        <FormBody
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <FullWidthInputBox>
            <input
              style={{
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
              }}
              placeholder="Create a username"
              type="text"
              {...register("username", { required: false })}
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username?.type === "required" && (
              <p role="alert" style={{ color: "coral" }}>
                Username is required
              </p>
            )}
          </FullWidthInputBox>
          <FlexContainer style={{ display: "flex", gap: "10px" }}>
            <InputContainer>
              <input
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                }}
                placeholder="First name"
                type="text"
                {...register("first_name", { required: false })}
                aria-invalid={errors.first_name ? "true" : "false"}
              />
              {errors.first_name?.type === "required" && (
                <p role="alert" style={{ color: "coral" }}>
                  First name is required
                </p>
              )}
            </InputContainer>
            <InputContainer>
              <input
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                }}
                placeholder="Last name"
                type="text"
                {...register("last_name", { required: false })}
                aria-invalid={errors.last_name ? "true" : "false"}
              />
              {errors.last_name?.type === "required" && (
                <p role="alert" style={{ color: "coral" }}>
                  Last name is required
                </p>
              )}
            </InputContainer>
          </FlexContainer>
          <FlexContainer style={{ display: "flex", gap: "10px" }}>
            <InputContainer>
              <input
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                }}
                placeholder="Email address"
                type="email"
                {...register("email", { required: false })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email?.type === "required" && (
                <p role="alert" style={{ color: "coral" }}>
                  Email address is required
                </p>
              )}
            </InputContainer>
            <InputContainer>
              <input
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                }}
                placeholder="Phone number"
                type="text"
                {...register("mobile_no", { required: false })}
                aria-invalid={errors.mobile_no ? "true" : "false"}
              />
              {errors.mobile_no?.type === "required" && (
                <p role="alert" style={{ color: "coral" }}>
                  Phone number is required
                </p>
              )}
            </InputContainer>
          </FlexContainer>

          <FlexContainer style={{ display: "flex", gap: "10px" }}>
            <InputContainer>
              <input
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                }}
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
                <p role="alert" style={{ color: "coral" }}>
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p role="alert" style={{ color: "coral" }}>
                  Password must be 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p role="alert" style={{ color: "coral" }}>
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p role="alert" style={{ color: "coral" }}>
                  Password must have one uppercase letter, one lowercase letter,
                  one number, and one special character.
                </p>
              )}
            </InputContainer>
            <InputContainer>
              <input
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                }}
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
                <p role="alert" style={{ color: "coral" }}>
                  {errors.confirm_password?.message}
                </p>
              )}
            </InputContainer>
          </FlexContainer>

          <FlexContainer style={{ display: "flex", gap: "10px" }}>
            <InputContainer>
              <input
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                }}
                placeholder="Slot size"
                type="number"
                {...register("slot_size", { required: false })}
                aria-invalid={errors.slot_size ? "true" : "false"}
              />
              {errors.slot_size?.type === "required" && (
                <p role="alert" style={{ color: "coral" }}>
                  Slot size is required
                </p>
              )}
            </InputContainer>
            <InputContainer>
              <input
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                }}
                placeholder="Capacity"
                type="number"
                {...register("capacity", { required: false })}
                aria-invalid={errors.capacity ? "true" : "false"}
              />
              {errors.capacity?.type === "required" && (
                <p role="alert" style={{ color: "coral" }}>
                  Capacity is required
                </p>
              )}
            </InputContainer>
          </FlexContainer>
          <FullWidthInputBox>
            <input
              style={{
                padding: "10px",
                borderRadius: "5px",
                width: "100%",
              }}
              placeholder="Number of Parking Zones"
              type="number"
              min="0"
              {...register("zoneCount", { required: false })}
              aria-invalid={errors.zoneCount ? "true" : "false"}
              onChange={(e) => setZoneCount(parseInt(e.target.value))}
            />
            {errors.zoneCount?.type === "required" && (
              <p role="alert" style={{ color: "coral" }}>
                Number of zones is required
              </p>
            )}
          </FullWidthInputBox>

          {renderParkingLotsInputFields()}

          <FlexContainer style={{ display: "flex", gap: "10px" }}>
            <InputContainer>
              <textarea
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                  resize: "none",
                }}
                placeholder="Address"
                rows="3"
                {...register("address", { required: false })}
                aria-invalid={errors.address ? "true" : "false"}
              />
              {errors.address?.type === "required" && (
                <p role="alert" style={{ color: "coral" }}>
                  Address is required
                </p>
              )}
            </InputContainer>
            <InputContainer>
              <textarea
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                  resize: "none",
                }}
                placeholder="Area"
                rows="3"
                {...register("area", { required: false })}
                aria-invalid={errors.area ? "true" : "false"}
              />
              {errors.area?.type === "required" && (
                <p role="alert" style={{ color: "coral" }}>
                  Area is required
                </p>
              )}
            </InputContainer>
          </FlexContainer>

          <input
            style={{
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#202123",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%",
              marginTop: "20px",
            }}
            type="submit"
            value="Create Account"
          />
          <p style={{ marginTop: "10px" }}>
            Don&apos;t have an account?{" "}
            <Link
              to={"/login"}
              style={{
                color: "#1e90ff",
                fontWeight: "normal",
                fontSize: "1.05em",
              }}
            >
              Log In
            </Link>
          </p>
        </FormBody>
      </FormContainer>
    </div>
  )
}

export default SignUp
