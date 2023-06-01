"use client"

import { SetStateAction, useEffect, useState } from 'react';
import { User } from '@/models/User.model';
import { UserService } from '../../lib/services/User.service';
import { auth, firestoreDB } from '@/config/firebaseConfig';

export default function SettingsForm() {
  const [user, setUser] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    profilePicture: '',
  });
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userService = new UserService(firestoreDB);
      let imageUrl= user.profilePicture

      if (image) {
        imageUrl = await userService.uploadProfilePictures(image).toPromise();
      }

      const updatedUserObservable = userService.updateUserById(user.id, { ...user, profilePicture: imageUrl });

      updatedUserObservable.subscribe((updatedUser: SetStateAction<User>) => {
        setUser(updatedUser);
        setImage(null);
        setImageUrl('');
        setError(null);
      });
    } catch (error) {
      if (error instanceof Error) {
        // ✅ TypeScript knows err is Error
        setError(error.message);
      } else {
        console.log('Unexpected error', error);
      }
    }
  };

  const getCurrentUserInfo = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const uid = currentUser.uid;
      const userService = new UserService(firestoreDB);
      const userObservable = userService.getUserById(uid);

      userObservable.subscribe((fetchedUser: User) => {
        setUser(fetchedUser);
      });
    } else {
      setError("No user is currently signed in.");
    }
  };

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          First Name:
          <input type="text" name="firstName" className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  value={user.firstName} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Last Name:
          <input type="text" name="lastName" className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"  value={user.lastName} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email:
          <input type="email" name="email" className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={user.email} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password:
          <input type="password" name="password" className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={user.password} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Address:
          <input type="text" name="address" className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={user.address} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Phone Number:
          <input type="tel" name="phoneNumber" className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={user.phoneNumber} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Date of Birth:
          <input type="date" name="dateOfBirth" className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" value={user.dateOfBirth} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture:</label>
          Profile Picture:
        <input type="file" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-950 focus:outline-none dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400" accept="image/png, image/jpeg" onChange={handleImageChange} />
        <p className="mt-1 mb-5 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG(MAX. 800x400px).</p>
      </div>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Profile Picture" style={{ width: '100px', height: '100px' }} />
        </div>
      )}
      {error && <div>{error}</div>}
      <div>
        <button type="submit" className="inline-flex w-full justify-center px-6 md:px-10 py-3 md:py-3 border-4 border-white rounded-2xl 3xl:rounded-[1.5rem] bg-gradient-to-br from-[#3C1960] via-[#A12669] to-[#FEC261] [box-shadow:0px_0px_40px_5px_rgba(161,38,105,1)]">Save</button>
      </div>
    </form>
  );
}