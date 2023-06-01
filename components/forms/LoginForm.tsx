"use client";


import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../config/firebaseConfig';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/dashboard');
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        setError(err.message)
      } else {
        console.log('Unexpected error', err)
      }
    }
  };
   return (
     <form onSubmit={handleLogin}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
         onChange={(e) => setPassword(e.target.value)}
        required
        className="block w-full p-2 mb-10 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
       {error && <p>{error}</p>}
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