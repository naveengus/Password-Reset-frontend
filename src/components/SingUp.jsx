import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosServise from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Groups3RoundedIcon from "@mui/icons-material/Groups3Rounded";

function Signup() {
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let { message, token, role } = await AxiosServise.post(
          `${ApiRoutes.SIGNUP.path}`,
          {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            role: values.role,
          },
          { authenticate: ApiRoutes.SIGNUP.auth }
        );

        toast.success(message);
        navigate("/home");
      } catch (error) {
        toast.error(error.message || "Internal Server Error");
      }
    },
  });

  return (
    <div className="login-wrapper container-fluid pt-2 signup-p">
      {/* <div className="logo-name">
        <Groups3RoundedIcon
          // fontSize="medium"
          sx={{ fontSize: 50 }}
          className="userlogo"
        />
        <p>Project-Tracker</p>
      </div> */}
      <h1 className="login-head" style={{ textAlign: "center" }}>
        {" "}
        Sign Up{" "}
      </h1>

      <form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-2" controlId="formBasicfname">
          <Form.Label className="form-label">First Name</Form.Label>
          <Form.Control
            placeholder="First Name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasiclname">
          <Form.Label className="form-label">Last Name</Form.Label>
          <Form.Control
            placeholder="Last Name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div>{formik.errors.lastName}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label className="form-label">Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicpassword">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            placeholder="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicrole">
          <Form.Label className="form-label">Role</Form.Label>
          <Form.Select
            name="role"
            aria-label="Default select example"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="role"
          >
            <option value="" label="Open this select Role" />
            <option value={formik.values.Admin}>Admin</option>
            <option value={formik.values.User}>User</option>
          </Form.Select>

          {formik.touched.role && formik.errors.role ? (
            <div>{formik.errors.role}</div>
          ) : null}
        </Form.Group>

        <Button variant="primary" className="btn-submit" type="submit">
          Submit
        </Button>
      </form>
      <div>
        <h6 className="loginp">
          Already have an account ?
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Login
          </a>
        </h6>
      </div>
    </div>
  );
}

export default Signup;
