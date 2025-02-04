import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.createAccount({ ...data });
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          setLoading(false);
          navigate("/");
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return !loading ? (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <Input
            label="Full Name: "
            placeholder="Enter Your Full Name"
            {...register("name", {
              required: true,
            })}
          />

          <Input
            label="Email: "
            placeholder="Enter Your Email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            label="Password: "
            placeholder="Enter Your Password"
            type="password"
            {...register("password", {
              required: true,
            })}
          />

          <Button type="submit" className="w-full mt-2">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      <h1 className="text-white text-2xl">Loading...</h1>
    </div>
  );
};

export default SignUp;
