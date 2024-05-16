import React from "react";
import Modal from "./Modal/Modal";

import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { Container, Header, Form } from "./UserProfile.styles"
const UserProfile = () => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div
            style={{
                textAlign: "center",
                display: "block",
                padding: 30,
                margin: "auto",
            }}
        >
            <button type="button" onClick={handleOpen}>
                Profile
            </button>
            <Modal isOpen={open} onClose={handleClose}>
                <>
                    <Container>
                        <Header>Profile Update</Header>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                placeholder="Username"
                                type="text"
                                {...register("userName", { required: true })}
                                aria-invalid={errors.userName ? "true" : "false"}
                                disabled
                            />
                            {errors.userName?.type === "required" && (
                                <p role="alert">Username is required</p>
                            )}

                            <input
                                placeholder="First name"
                                type="text"
                                {...register("firstName", { required: true })}
                                aria-invalid={errors.firstName ? "true" : "false"}
                            />
                            {errors.firstName?.type === "required" && (
                                <p role="alert">First name is required</p>
                            )}

                            <input
                                placeholder="Last name"
                                type="text"
                                {...register("lastName", { required: true })}
                                aria-invalid={errors.lastName ? "true" : "false"}
                            />
                            {errors.lastName?.type === "required" && (
                                <p role="alert">Last name is required</p>
                            )}

                            <input
                                placeholder="Email"
                                type="email"
                                {...register("email", { required: true })}
                                aria-invalid={errors.email ? "true" : "false"}
                                disabled
                            />
                            {errors.email?.type === "required" && (
                                <p role="alert">Email name is required</p>
                            )}

                            <input
                                placeholder="Phone Number"
                                type="number"
                                {...register("phone", { required: true })}
                                aria-invalid={errors.phone ? "true" : "false"}
                            />
                            {errors.phone?.type === "required" && (
                                <p role="alert">Phone Number name is required</p>
                            )}

                            <input
                                placeholder="Address"
                                type="text"
                                {...register("address", { required: true })}
                                aria-invalid={errors.address ? "true" : "false"}
                            />
                            {errors.address?.type === "required" && (
                                <p role="alert">Address name is required</p>
                            )}

                            <input
                                placeholder="Password"
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                aria-invalid={errors.password ? "true" : "false"}
                            />
                            {errors.password && <p role="alert">{errors.password?.message}</p>}

                            <input type="submit" value={"Update"} />

                            <p>
                                Go to Dashboard? <Link to={"/dashboard"}>Dashboard</Link>
                            </p>
                        </Form>
                    </Container>
                </>
            </Modal>
        </div>
    );
};

export default UserProfile;