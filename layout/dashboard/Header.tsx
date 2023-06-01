"use client"

import { useState, useEffect } from 'react';
import LogoutButton from '@/components/buttons/Logout'
import { UserService } from '@/lib/services/User.service';
import { User } from '@/models/User.model';
import { getAuth } from '@firebase/auth';
import { firestoreDB } from '@/config/firebaseConfig';

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
      <div className="header flex justify-end">
        <div>
          {user ? (
            <div>
              <h1>{user.firstName}</h1>
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