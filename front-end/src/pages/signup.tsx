import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import signupIllustration from "../assets/signup-illustration.svg";

interface SignUpData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface SignUpProps {
  onSubmit?: (data: SignUpData) => void;
}

const fieldClasses =
  "w-full px-3 py-2.5 text-sm sm:text-base text-gray-800 bg-white placeholder:text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15008A]";

function SignUp({ onSubmit }: SignUpProps) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const { confirmPassword, ...data } = form;
    onSubmit?.(data);
  };

  return (
    <section className="w-full min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Form */}
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15008A]">
            Sign up
          </h1>
          <p className="text-center text-xs sm:text-sm text-black font-medium mt-3 sm:mt-4">
            Already have an account?{" "}
            <a href="#" className="font-semibold text-[#15008A] hover:underline">
              Sign in
            </a>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 mt-8 sm:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="firstName" className="sr-only">First Name</label>
                <input id="firstName" name="firstName" type="text" required autoComplete="given-name"
                  value={form.firstName} onChange={handleChange} placeholder="First Name" className={fieldClasses} />
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <input id="lastName" name="lastName" type="text" required autoComplete="family-name"
                  value={form.lastName} onChange={handleChange} placeholder="Last Name" className={fieldClasses} />
              </div>
            </div>

            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" required autoComplete="username"
                value={form.username} onChange={handleChange} placeholder="Username" className={fieldClasses} />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email"
                value={form.email} onChange={handleChange} placeholder="Email" className={fieldClasses} />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" required autoComplete="new-password"
                value={form.password} onChange={handleChange} placeholder="Password" className={fieldClasses} />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" required autoComplete="new-password"
                value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className={fieldClasses} />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full sm:w-3/4 self-center mt-4 sm:mt-6 bg-[#15008A] hover:bg-[#0f0066] text-white py-2.5 sm:py-3 rounded-md text-base sm:text-lg tracking-wide font-medium transition-colors duration-150"
            >
              Continue
            </button>
          </form>
        </div>

        {/* Illustration: only on large screens */}
        <div className="hidden lg:flex justify-center">
          <img
            src={signupIllustration}
            alt=""
            aria-hidden="true"
            className="w-full max-w-md xl:max-w-lg h-auto max-h-[70vh] object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default SignUp;