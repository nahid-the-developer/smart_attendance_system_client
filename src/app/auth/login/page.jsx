"use client";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "@/components/Copyright";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/components/validators";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const { data } = useSession()
  // console.log(data);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const submitForm = (data) => {
    signIn("credentials", {
      academic_id: data?.id,
      password: data?.password,
      redirect: false,
    }).then((response) => {
      if (response?.error) {
        try {
          const errors = JSON.parse(response.error);
          errors.map((e) => {
            return setError(e.name, {
              type: "manual",
              message: e.message[0],
            });
          });
        } catch (error) {
          toast.error("Internal server error!");
        }
      } else {
        toast.success("Login Successful");
        router.push(callbackUrl ? callbackUrl : "/");
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
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
            error={!!errors.id}
            {...register("id")}
          />
          <Typography variant="body2" color="red" mx="4px">
            {errors.id?.message}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            {...register("password")}
          />
          <Typography variant="body2" color="red" mx="4px">
            {errors.password?.message}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Link href="/auth/forgot_password/">
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Forgot password?
            </Typography>
          </Link>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
