"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, firestore, storage } from '../../config/firebaseConfig';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      // Validate the form fields
      if (!firstName || !lastName || !email || !password || !phoneNumber || !address || !dateOfBirth || !profilePicture) {
        setError('Please fill in all fields.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (!/^\d{11}$/.test(phoneNumber)) {
        setError('Phone number must be 10 digits long.');
        return;
      }
      // Create the user in Firebase auth
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      // Upload the profile picture to Firebase storage
      if (user) {
        const imageRef = storage.ref(`profilePictures/${user.uid}`);
        await imageRef.put(profilePicture);
        const imageUrl = await imageRef.getDownloadURL();
        // Save the user data to Firestore
        await firestore.collection('users').doc(user.uid).set({
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          dateOfBirth,
          profilePicture: imageUrl,
        });
      }
      
      // Redirect to the home page
      router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        setError(err.message)
      } else {
        console.log('Unexpected error',err)
      }
    }
  };

  const handleProfilePictureChange = (e: any) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <form onSubmit={handleRegister}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        First Name:
      </label>
      <input
        type="text"
        value={firstName}
        className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onChange={(e) => setFirstName(e.target.value)} />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Last Name:
      </label>
      <input 
        type="text" 
        value={lastName}
        className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onChange={(e) => setLastName(e.target.value)} />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Email:
      </label >
        <input 
          type="email" 
          value={email}
          className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
          onChange={(e) => setEmail(e.target.value)} />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Password:
      </label>
        <input 
          type="password" 
          value={password} 
          className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => setPassword(e.target.value)} />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Phone Number:
      </label>
        <input 
          type="tel" 
          value={phoneNumber} 
          className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={(e) => setPhoneNumber(e.target.value)} />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Address:
      </label>
        <textarea 
          value={address}
          className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
          onChange={(e) => setAddress(e.target.value)} />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Date of Birth:
      </label>
        <input 
          type="date" 
          className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture:</label>
      <input type="file" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-950 focus:outline-none dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400" accept="image/png, image/jpeg" onChange={handleProfilePictureChange} />
      <p className="mt-1 mb-5 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG(MAX. 800x400px).</p>
      {error && <p>{error}</p>}
      <button type="submit" className="inline-flex w-full justify-center px-6 md:px-10 py-3 md:py-3 border-4 border-white rounded-2xl 3xl:rounded-[1.5rem] bg-gradient-to-br from-[#3C1960] via-[#A12669] to-[#FEC261] [box-shadow:0px_0px_40px_5px_rgba(161,38,105,1)]">Register</button>
    </form>
  );
};

export default RegisterForm;