"use client"

import { useState, useEffect } from 'react';
import Link from "next/link"
import { firestore, firestoreDB } from '@/config/firebaseConfig';
import DepositTable from "@/components/tables/DepositTable"
import DepositService from '@/lib/services/deposit.service'
import { Deposit } from '@/lib/models/deposit.model';

const Deposit: React.FC = () => {
  const [deposits, setDeposits] = useState<Deposit[] | undefined>(undefined);

  useEffect(() => {
    const depositService = new DepositService(firestoreDB);

    const getAllDeposits = async () => {
      try {
        const retrievedDeposits = await depositService.getAllDeposits().toPromise();
        setDeposits(retrievedDeposits);
      } catch (error) {
        console.error('Error retrieving deposits:', error);
      }
    };

    getAllDeposits();
  }, []);

  const handleDeleteDeposits = (ids: string[]) => {
    const depositService = new DepositService(firestoreDB);

    depositService.deleteDeposits(ids).subscribe(
      () => {
        setDeposits((prevDeposits) =>
          prevDeposits!.filter((deposit) => !ids.includes(deposit.id))
        );
      },
      (error) => {
        console.error('Error deleting deposits:', error);
      }
    );
  };

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