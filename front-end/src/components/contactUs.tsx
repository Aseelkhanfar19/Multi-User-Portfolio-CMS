import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import ResponsiveContainer from "./ResponsiveContainer";
import contactIllustration from "../assets/contact-illustration.svg";

interface ContactUsProps {
  onSubmit?: (data: { fullName: string; email: string; message: string }) => void;
}

const fieldClasses =
  "w-full px-4 py-3 bg-white text-gray-700 placeholder:text-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03324D]";

function ContactUs({ onSubmit }: ContactUsProps) {
  const [form, setForm] = useState({ fullName: "", email: "", message: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <section className="w-full bg-[#f5f5f5] py-12 sm:py-16 lg:py-20">
      <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-600 px-4 mb-8 sm:mb-10">
        Contact Us
      </h2>

      <ResponsiveContainer className="md:items-center md:gap-12 lg:gap-16">
        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 flex flex-col gap-5 sm:gap-6">
          <div>
            <label htmlFor="fullName" className="sr-only">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full name"
              className={fieldClasses}
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="E-mail"
              className={fieldClasses}
            />
          </div>

          <div>
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={form.message}
              onChange={handleChange}
              placeholder="Message..."
              className={`${fieldClasses} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#F44336] hover:bg-[#d32f2f] text-white px-4 py-3 rounded-lg font-medium transition-colors duration-150 mt-2"
          >
            Send Message
          </button>
        </form>

        {/* Illustration: hidden on small screens */}
        <div className="hidden md:flex md:w-1/2 justify-center">
          <img
            src={contactIllustration}
            alt=""
            aria-hidden="true"
            className="w-full max-w-xs lg:max-w-sm h-auto"
          />
        </div>
      </ResponsiveContainer>
    </section>
  );
}

export default ContactUs;