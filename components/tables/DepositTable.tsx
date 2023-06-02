"use clients"

import { useState } from 'react';

interface Deposit {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: 'BDO' | 'Metrobank' | 'BPI' | 'PNB';
  amount: number;
  dateCreated?: Date;
}

interface DepositTableProps {
  deposits: Deposit[] | undefined;
  onDeleteDeposits: (ids: string[]) => void;
}
const DepositTable: React.FC<DepositTableProps> = ({ deposits = [], onDeleteDeposits }) => {
  const [selectedDeposits, setSelectedDeposits] = useState<string[]>([]);

  const handleSelectAllDeposits = (checked: boolean) => {
    if (checked) {
      const depositIds = deposits.map((deposit) => deposit.id);
      setSelectedDeposits(depositIds);
    } else {
      setSelectedDeposits([]);
    }
  };

  const handleSelectDeposit = (id: string) => {
    const isSelected = selectedDeposits.includes(id);
    if (isSelected) {
      setSelectedDeposits((prevSelectedDeposits) =>
        prevSelectedDeposits.filter((selectedId) => selectedId !== id)
      );
    } else {
      setSelectedDeposits((prevSelectedDeposits) => [...prevSelectedDeposits, id]);
    }
  };

  const handleDeleteSelectedDeposits = () => {
    onDeleteDeposits(selectedDeposits);
    setSelectedDeposits([]);
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                Account Name
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                Account Number
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                Bank Name
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedDeposits.length === deposits.length}
                  onChange={(event) => handleSelectAllDeposits(event.target.checked)}
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {deposits.map((deposit) => (
              <tr key={deposit.id} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap text-gray-950">{deposit.accountName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-950">{deposit.accountNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-950">{deposit.bankName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-950">{deposit.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedDeposits.includes(deposit.id)}
                    onChange={() => handleSelectDeposit(deposit.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        {selectedDeposits.length > 0 && (
          <button
            onClick={handleDeleteSelectedDeposits}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
          >
            Delete Selected
          </button>
        )}
      </div>
    </div>
  );
};

export default DepositTable;
