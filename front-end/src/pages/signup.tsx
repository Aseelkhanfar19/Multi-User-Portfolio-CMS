import signupIllustration from "../assets/signup-illustration.svg";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";


interface SignUpData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}



const fieldClasses =
  "w-full px-3 py-2.5 text-sm sm:text-base text-gray-800 bg-white placeholder:text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15008A]";



function SignUp() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [error, setError] = useState("");

  function handleChange(e:React.ChangeEvent<HTMLInputElement>){
    const {name , value} = e.target;
    setForm((prev)=>({
      ...prev,
      [name]:value // we put name in [] to tell js that the name is an exist variable not a new key called name .. 
    })
  );//end of set form
  }

  function handleSubmitForm(e:React.SubmitEvent<HTMLButtonElement>){
    const formData = {...form}; // copy the data from useState variable
    

  }


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
            <a href="/login" className="font-semibold text-[#15008A] hover:underline">
              Sign in
            </a>
          </p>

          <form  className="flex flex-col gap-3 sm:gap-4 mt-8 sm:mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="firstName" className="sr-only">First Name</label>
                <input id="firstName" name="first_name" type="text" required autoComplete="given-name"
                   placeholder="First Name" className={fieldClasses} onChange={handleChange} value={form.first_name}/>
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">Last Name</label>
                <input id="lastName" name="last_name" type="text" required autoComplete="family-name"
                  placeholder="Last Name" className={fieldClasses} onChange={handleChange} value={form.last_name}/>
              </div>
            </div>

            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input id="username" name="username" type="text" required autoComplete="username"
                placeholder="Username" className={fieldClasses} onChange={handleChange} value={form.username} />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email"
                placeholder="Email" className={fieldClasses} value={form.email} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" required autoComplete="new-password"
                 placeholder="Password" className={fieldClasses}  value={form.password} onChange={handleChange}/>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" required autoComplete="new-password"
                 placeholder="Confirm Password" className={fieldClasses} value={form.confirmPassword} onChange={handleChange}/>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full sm:w-3/4 self-center mt-4 sm:mt-6 bg-[#15008A] hover:bg-[#0f0066] text-white py-2.5 sm:py-3 rounded-md text-base sm:text-lg tracking-wide font-medium transition-colors duration-150"
             onSubmit={handleSubmitForm}>
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