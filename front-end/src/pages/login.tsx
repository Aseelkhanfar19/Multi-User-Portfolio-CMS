import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import signinIllustration from "../assets/signin-illustration.svg";
import type{ loginData } from "../types/dataTypes";
import {signup, login} from "../services/auth"


const fieldClasses =
  "w-full px-3 py-2.5 text-sm sm:text-base text-gray-800 bg-white placeholder:text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15008A]";

const initialData : loginData ={identifier: "", password: "" };

function SignIn() {

  const [form, setForm] = useState(initialData);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success , setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    console.log(`Data ready to send : ${form}`);
    try{ 
    const userData = await login(form); 
    setLoading(false);
    setSuccess(true);
      if(userData.details==="Login Successful"){
        setSuccess(true)
        setError("");
      };
    }
    catch(errorMsg){
      if(errorMsg instanceof Error){
        setError(errorMsg.message);
        
      }
      else{
        setError("Something went wrong , please try again later!");
      }
      console.log(error);
      setLoading(false);
    }

  };

  return (
    <section className="w-full min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Illustration: only on large screens */}
        <div className="hidden lg:flex justify-center">
          <img
            src={signinIllustration}
            alt=""
            aria-hidden="true"
            className="w-full max-w-md xl:max-w-lg h-auto max-h-[70vh] object-contain"
          />
        </div>

        {/* Form */}
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15008A]">
            Sign in
          </h1>
          <p className="text-center text-xs sm:text-sm text-black font-medium mt-3 sm:mt-4">
            Don't have account?{" "}
            <a href="/signup" className="font-semibold text-[#15008A] hover:underline">
              Sign up
            </a>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 mt-8 sm:mt-10">
            {error && (
              <p
                role="alert"
                className="w-full bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm leading-relaxed rounded-md p-3 sm:p-4"
              >
                {error}
              </p>
            )
            } 
            <div>
              <label htmlFor="identifier" className="sr-only">Email or Username</label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                autoComplete="username"
                value={form.identifier}
                onChange={handleChange}
                placeholder="Email or Username"
                className={fieldClasses}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className={fieldClasses}
              />
            </div>

            <a
              href="#"
              className="self-start text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-500 transition-colors duration-150"
            >
              Forgot your password?
            </a>

            <button
              type="submit" disabled={loading}
              className="w-full sm:w-3/4 self-center mt-4 sm:mt-6 bg-[#15008A] hover:bg-[#0f0066] text-white py-2.5 sm:py-3 rounded-md text-base sm:text-lg tracking-wide font-medium transition-colors duration-150"
            >
              {loading?"Loading":"Continue"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignIn;