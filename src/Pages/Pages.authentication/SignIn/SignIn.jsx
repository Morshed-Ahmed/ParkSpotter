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

  const onSubmit = async (data) => {
    // console.log(data);
    setLoading(true);

    try {
      const response = await fetch(
        "https://parkspottermain.pythonanywhere.com/accounts/user_login/",
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
        <button style={{ margin: "10px", padding: "10px" }}>Home</button>
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

          {loading ? (
            <>
              <Loader type="submit"></Loader>
            </>
          ) : (
            <>
              <input type="submit" value={"Sign In"} />
            </>
          )}

          <p>
            Dont have an account? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </Form>
      </Container>
    </div>
  );
};

export default SignIn;
