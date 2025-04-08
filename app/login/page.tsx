"use client";

import React, { useState, ChangeEvent } from "react";
import Link from "next/link";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar la autenticación
    console.log("Logging in with:", loginData);
  };

  return (
    <main className="flex-1 bg-white text-gray-800 flex flex-col">
      {/* Page Header */}
      <header className="bg-primary py-6 px-4 shadow-md flex items-center">
        <h1 className="text-2xl font-bold text-black text-center w-full">Welcome Back!</h1>
      </header>

      {/* Intro Text */}
      <p className="text-center mt-6 text-lg font-medium px-4 leading-relaxed">
        Log in to continue planning your next adventure.
      </p>

      {/* Form Section */}
      <div className="flex justify-center px-4 py-10 flex-1">
        <div className="bg-primary-light px-6 sm:px-10 py-10 rounded-lg shadow-inner w-full max-w-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Email Address*</label>
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Password*</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md transition duration-200 text-lg"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link href="/Register" className="text-primary hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
