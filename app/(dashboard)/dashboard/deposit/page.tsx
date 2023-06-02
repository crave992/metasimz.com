"use client"

import { useState, useEffect } from 'react';
import Link from "next/link"
import { firestore, firestoreDB } from '@/config/firebaseConfig';
import DepositTable from "@/components/tables/DepositTable"
import { Deposit } from '@/lib/models/deposit.model';

const Deposit: React.FC = () => {
  const [deposits, setDeposits] = useState<Deposit[] | undefined>(undefined);

  const handleDeleteDeposits = async (ids: string[]) => {
    if (!deposits) return; // Handle the case where `deposits` is undefined

    const updatedDeposits = deposits.filter((deposit) => !ids.includes(deposit.id));
    setDeposits(updatedDeposits);

    // Delete the deposits from Firestore using the provided IDs
    for (const id of ids) {
      try {
        await firestore.collection('deposits').doc(id).delete();
      } catch (error) {
        console.error('Error deleting deposit:', error);
      }
    }
  };

  useEffect(() => {
    // Fetch the deposits from Firestore and update the state
    const fetchDeposits = async () => {
      const querySnapshot = await firestore.collection('deposits').get();

      const loadedDeposits: Deposit[] = [];
      querySnapshot.forEach((doc) => {
        loadedDeposits.push({ id: doc.id, ...doc.data() } as Deposit);
      });

      setDeposits(loadedDeposits);
    };

    fetchDeposits();
  }, []);

  return (
    <section id="tableDeposit">
      <h1 className="p-5 text-gray-700 text-4xl font-extrabold robobto bg-gradient-to-r from-cyan-500 to-blue-500">Deposit</h1>
      <div className="px-3 py-5">
        <Link href="/dashboard/deposit/deposit-cash" className="mt-5 inline-flex w-full justify-center px-6 md:px-10 py-3 md:py-3 border-4 border-white rounded-2xl 3xl:rounded-[1.5rem] bg-gradient-to-br from-[#3C1960] via-[#A12669] to-[#FEC261] [box-shadow:0px_0px_40px_5px_rgba(161,38,105,1)]">Deposit Cash</Link>
        <DepositTable deposits={deposits} onDeleteDeposits={handleDeleteDeposits} />
      </div>
    </section>

  )
}

export default Deposit;