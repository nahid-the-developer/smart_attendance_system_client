"use client";
import Copyright from "@/components/Copyright";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";

import React, { useState } from "react";
import RememberPassword from "@/components/rememberPassword";

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
    reset: reset2
  } = useForm({
    mode: "onChange",
  });

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
    setError: setError3,
    reset: reset3
  } = useForm({
    mode: "onChange",
  });

  const [steps, setSteps] = useState(1);

  const handleForgotPassword = (data) => {
    console.log(data);
    setSteps(2);
    reset();
  };

  const handleOTP = (data) => {
    console.log(data);
    setSteps(3)
    reset2()
  };

  const handleNewPassword = (data) => {
    console.log(data);
    reset3()
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
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
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
