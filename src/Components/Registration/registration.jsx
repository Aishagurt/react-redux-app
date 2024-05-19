import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../features/slices/authSlice";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Snackbar, Alert } from '@mui/material';

const RegistrationComponent = () => {
    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };
    const [userData, setUserData] = useState(initialState);
    const [errors] = useState({});
    const [openToast, setOpenToast] = useState(false);
    const dispatch = useDispatch();
    const { loading, error, message } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(userData))
            .then(() => setOpenToast(true))
            .catch(() => setOpenToast(false));
    };

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };

    return (
        <div className="grid grid-cols-1 items-center justify-items-center h-screen">
            <Snackbar open={openToast} autoHideDuration={6000} onClose={handleCloseToast}>
                <Alert onClose={handleCloseToast} severity={error ? 'error' : 'success'}>
                    {message}
                </Alert>
            </Snackbar>
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Register
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        label="First Name"
                        size="lg"
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                    />
                    <Input
                        label="Last Name"
                        size="lg"
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                    />
                    <Input
                        label="Email"
                        size="lg"
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                    />
                    <Input
                        label="Password"
                        size="lg"
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                    />
                </CardBody>
                <CardFooter className="pt-0">
                    <Button
                        variant="gradient"
                        fullWidth
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Register
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        <Link to="/login">Already have an account? Sign in</Link>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RegistrationComponent;
