"use client";

import { useState } from 'react';
 const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting login form:', { email, password });
  };
   return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        required
        className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        required
        className="block w-full p-2 mb-10 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      <button
        type="submit"
        className="inline-flex w-full justify-center px-6 md:px-10 py-3 md:py-3 border-4 border-white rounded-2xl 3xl:rounded-[1.5rem] bg-gradient-to-br from-[#3C1960] via-[#A12669] to-[#FEC261] [box-shadow:0px_0px_40px_5px_rgba(161,38,105,1)]"
      >
        Sign in
      </button>
    </form>
  );
};
 export default LoginForm;