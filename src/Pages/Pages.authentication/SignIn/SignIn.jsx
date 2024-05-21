import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Container, Header, Form, Loader } from "./SingIn.styles";
import toast from "react-hot-toast";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);

    fetch("https://parkspottermain.pythonanywhere.com/accounts/user_login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          toast.error(res.statusText);
          return;
        }
      })
      .then((data) => {
        if (data.role) {
          localStorage.setItem("role", data.role);
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        navigate("/dashboard");
        // console.log(data);
        setLoading(false);
        toast.success("Login successful");
      })
      .catch((err) => {
        toast.error(err.message);
      });
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
          }}
        >
          Home
        </button>
      </Link>
      <Container>
        <Header>Sign in</Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Username"
            type="text"
            {...register("username", { required: true })}
            aria-invalid={errors.username ? "true" : "false"}
          />
          {errors.username?.type === "required" && (
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
