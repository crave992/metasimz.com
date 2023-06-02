"use client"

import { useState, useEffect } from 'react';
import LogoutButton from '@/components/buttons/Logout'
import { UserService } from '@/lib/services/user.service';
import { User } from '@/lib/models/User.model';
import { getAuth } from '@firebase/auth';
import { firestoreDB } from '@/config/firebaseConfig';
import Clock from "@/components/misc/Clock";

export default function Header() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const auth = getAuth();
    const userService = new UserService(firestoreDB);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        userService.getUserById(user.uid).subscribe({
          next: (user: any) => setUser(user),
          error: (error: any) => console.error(error),
        });
      }
    });
    return unsubscribe;
  }, []);
  return (
    <header>
      <div className="header justify-end">
        <div className="flex">
          {user ? (
            <div className="flex items-center">
              <Clock />
              <img src={user.profilePicture} alt="profile picture" width='40' className="mx-3" />
              <p className="mx-3">{user.firstName} {user.lastName}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <LogoutButton></LogoutButton>
        </div>
      </div>
    </header>
  )
}