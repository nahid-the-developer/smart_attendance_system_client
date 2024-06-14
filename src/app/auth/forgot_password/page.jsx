"use client";
import Copyright from "@/components/Copyright";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import RememberPassword from "@/components/rememberPassword";
import { httpClient } from "@/utils/api";
import { toast } from "react-toastify";
import { CircularProgress } from '@mui/material'
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    setError: setError2,
    reset: reset2,
  } = useForm({
    mode: "onChange",
  });

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
    setError: setError3,
    reset: reset3,
  } = useForm({
    mode: "onChange",
  });

  const [steps, setSteps] = useState(1);
  const [loader, setLoader] = useState(false)
  const [token, setToken] = useState(null)
  const router = useRouter()

  const handleForgotPassword = (data) => {
    setLoader(true)
    httpClient
      .post(`/auth/forgot_password/`, data)
      .then((response) => {
        toast.success(response.data?.message);
        reset();
        setLoader(false)
        setSteps(2);
      })
      .catch((err) => {
        const errors = err.response.data;
        if (errors) {
          Object.keys(errors).forEach((field) => {
            setError(field, {
              type: "manual",
              message: errors[field][0],
            });
          });
        }
        setLoader(false)
      });
  };

  const handleOTP = (data) => {
    httpClient
    .post(`/auth/verify-otp/`, data)
    .then((response) => {
      toast.success(response.data?.message);
      setToken(response.data);
      reset2();
      setSteps(3);
    })
    .catch((err) => {
      const errors = err.response.data;
      if (errors) {
        Object.keys(errors).forEach((field) => {
          setError2(field, {
            type: "manual",
            message: errors[field][0],
          });
        });
      }
    });
  };

  const handleNewPassword = (data) => {
    const payload = {
      new_password: data.new_password,
      token: token.token,
      user_id: token.user_id
    }
    httpClient
    .post(`/auth/reset-password/`, payload)
    .then((response) => {
      toast.success(response.data?.message);
      reset3();
      router.push('/auth/login/')
    })
    .catch((err) => {
      const errors = err.response.data;
      if (errors) {
        Object.keys(errors).forEach((field) => {
          setError3(field, {
            type: "manual",
            message: errors[field][0],
          });
        });
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={steps === 1 ? { display: "block" } : { display: "none" }}
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" textAlign="center">
          Forgot Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleForgotPassword)}
          noValidate
          sx={{ mt: 1 }}
          width="100%"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="id"
            label="Enter your ID"
            autoComplete="id"
            autoFocus
            error={!!errors.academic_id}
            {...register("academic_id", {
              required: "Field is required.",
              pattern: {
                value: /^\d+$/, // Only digits
                message: "ID must contain only digits.",
              },
              validate: (value) =>
                value.length === 11 ||
                value.length === 16 ||
                "ID must be exactly 11 or 16 digits.",
            })}
          />
          <Typography variant="body2" color="red" mx="4px">
            {errors.academic_id?.message}
          </Typography>
          <Button
            type="submit"
            fullWidth
            disabled={loader}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loader ? (
              <CircularProgress sx={{ color: "green" }} size={30} />
            ) : (
              "Submit"
            )}
          </Button>
          <RememberPassword />
        </Box>
      </Box>

      <Box
        style={steps === 2 ? { display: "block" } : { display: "none" }}
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" textAlign="center">
          OTP
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit2(handleOTP)}
          noValidate
          sx={{ mt: 1 }}
          width="100%"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="id"
            label="Enter OTP here"
            autoComplete="id"
            autoFocus
            error={!!errors2.otp}
            {...register2("otp", {
              required: "Field is required.",
              pattern: {
                value: /^\d+$/, // Only digits
                message: "OTP must contain only digits.",
              },
              validate: (value) =>
                value.length === 6 || "OTP must be exactly 6 digits.",
            })}
          />
          <Typography variant="body2" color="red" mx="4px">
            {errors2.otp?.message}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <RememberPassword />
        </Box>
      </Box>

      <Box
        style={steps === 3 ? { display: "block" } : { display: "none" }}
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" textAlign="center">
          New Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit3(handleNewPassword)}
          noValidate
          sx={{ mt: 1 }}
          width="100%"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="id"
            label="Enter new password"
            autoComplete="id"
            autoFocus
            error={!!errors3.new_password}
            {...register3("new_password", {
              required: "Field is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })}
          />
          <Typography variant="body2" color="red" mx="4px">
            {errors3.new_password?.message}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <RememberPassword />
        </Box>
      </Box>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
