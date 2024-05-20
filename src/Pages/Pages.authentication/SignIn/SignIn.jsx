// SignIn.js

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {
  auth,
  loginUserWithEmailAndPassword,
  logoutUser,
} from "../../../Utils/Firebase/firebase"
import { Container, Header, Loader, Form } from "./SingIn.styles"
import { useDispatch } from "react-redux"
import { fetchUserType } from "../../../store/user/user.thunks"

const SignIn = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [userAuth, setUserAuth] = useState(null)

  const dispatch = useDispatch()


  const onSubmit = async (data) => {
    setLoading(true)

    try {
      // Check if a user is already logged in
      if (auth.currentUser) {
        await logoutUser()
        toast.error("Previous user logged out. Please try signing in again.")
        setLoading(false)
        return
      }

      const user = await loginUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      setUserAuth(user)
      toast.success("Login successful")

      try {
        dispatch(fetchUserType())
      } catch (error) {
        console.error("Error fetching user type:", error.message)
        // Handle errors during user type fetching (optional: display a message)
      }
      navigate("/dashboard")
    } catch (error) {
      if (
        error.message.includes(
          "Login failed: Email verification required. Please check your inbox."
        )
      ) {
        toast.error("Email verification required. Please check your inbox.")
      } else {
        toast.error("Invalid email or password.")
      }
      setLoading(false)
    }
  }

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
            placeholder="Email"
            type="email"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email?.type === "required" && (
            <p role="alert">Email is required</p>
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
  )
}

export default SignIn
