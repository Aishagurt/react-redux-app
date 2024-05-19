import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../features/slices/authSlice";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:8085/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const data = await response.text();
          if (data === "Login successful") {
            dispatch(login({ email: values.email }));
            navigate("/");
          } else {
            setLoginError(data);
          }
        } else if (response.status === 401) {
          setLoginError("Invalid credentials");
        } else {
          setLoginError("An error occurred while logging in");
        }
      } catch (error) {
        console.error("An error occurred while logging in:", error);
        setLoginError("An error occurred while logging in");
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
      <div className="grid grid-cols-1 items-center justify-items-center h-screen">
        <Card className="w-96">
          <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
                label="Email"
                size="lg"
                type="email"
                name="email"
                value={values.email}
                onChange={onChange}
                error={!!errors.email}
            />
            {errors.email && <Typography color="red">{errors.email}</Typography>}
            <Input
                label="Password"
                size="lg"
                type="password"
                name="password"
                value={values.password}
                onChange={onChange}
                error={!!errors.password}
            />
            {errors.password && (
                <Typography color="red">{errors.password}</Typography>
            )}
            {loginError && <Typography color="red">{loginError}</Typography>}
            <div className="-ml-2.5"></div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              <Link to="/register">Don't have an account yet? Register</Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
  );
};

export default Login;
