import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Container, Header, Form, Loader } from "./SingIn.styles";
import toast from "react-hot-toast";
import { useState } from "react";
import { TiHomeOutline } from "react-icons/ti";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://parkspotter-backened.onrender.com/accounts/user_login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.error) {
        toast.error("Invalid credentials");
        setLoading(false);
        throw new Error("Invalid credentials");
      }
      if (responseData.is_staff) {
        localStorage.setItem("is_staff", responseData.is_staff);
      }
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("user_id", responseData.user_id);

      navigate("/dashboard");
      toast.success("Login successful");
      setLoading(false);
    } catch (error) {
      toast.error("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div>
      <Link to={"/"}>
        <button
          style={{
            margin: "10px",
            padding: "10px",
            backgroundColor: "#202123",
            color: "#ffffff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <TiHomeOutline /> Home
        </button>
      </Link>
      <Container>
        <Header>Sign in</Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Username"
            type="text"
            {...register("login", { required: true })}
            aria-invalid={errors.login ? "true" : "false"}
          />
          {errors.login?.type === "required" && (
            <p role="alert">Username is required</p>
          )}

          <input
            placeholder="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && <p role="alert">{errors.password?.message}</p>}

          {loading ? <Loader /> : <input type="submit" value={"Sign In"} />}

          <p>
            Don&apos;t have an account? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </Form>
      </Container>
    </div>
  );
};

export default SignIn;
