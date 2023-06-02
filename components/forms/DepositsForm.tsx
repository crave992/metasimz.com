"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Deposit } from '@/lib/models/deposit.model';
import DepositService from '../../lib/services/deposit.service'
import { firestoreDB } from '@/config/firebaseConfig';

const DepositsForm = () => {
  const [formData, setFormData] = useState<Deposit>({
    id:'',
    accountName: '',
    accountNumber: '',
    bankName: 'BDO',
    amount: 0,
    dateCreated: new Date()
  });
  const [errors, setErrors] = useState<Partial<Deposit>>({});
  const [showAlert, setShowAlert] = useState(false);
  const depositService = new DepositService(firestoreDB);
  const history = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      await depositService.addDeposit(formData);
      setFormData({
        id:'',
        accountName: '',
        accountNumber: '',
        bankName: 'BDO',
        amount: 0
      });
      setErrors({});
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        history.push('/dashboard/deposit');
      }, 3000);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'amount' ? (isNaN(parseFloat(value)) ? undefined : parseFloat(value)) : value,
    }));
  };

  const validateFormData = (data: Deposit) => {
    const errors: Partial<Deposit> = {};
    if (!data.accountName) {
      errors.accountName = 'Account name is required';
    }
    if (!data.accountNumber) {
      errors.accountNumber = 'Account number is required';
    }
    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <label htmlFor="accountName">Account Name:</label>
      <input
        type="text"
        id="accountName"
        name="accountName"
        value={formData.accountName}
        onChange={handleInputChange}
        className={`block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.accountName ? 'border-red-500' : ''
          }`}
        required
      />
      {errors.accountName && (
        <p className="text-red-500">{errors.accountName}</p>
      )}

      <label htmlFor="accountNumber">Account Number:</label>
      <input
        type="text"
        id="accountNumber"
        name="accountNumber"
        value={formData.accountNumber}
        onChange={handleInputChange}
        className={`block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.accountNumber ? 'border-red-500' : ''
          }`}
        required
      />

      <label htmlFor="bankName">Bank Name:</label>
      <select
        id="bankName"
        name="bankName"
        value={formData.bankName}
        onChange={handleInputChange}
        className="block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        required
      >
        <option value="BDO">BDO</option>
        <option value="Metrobank">Metrobank</option>
        <option value="BPI">BPI</option>
        <option value="PNB">PNB</option>
      </select>

      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        name="amount"
        value={formData.amount}
        onChange={handleInputChange}
        className={`block w-full p-2 mb-3 text-black border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.amount ? 'border-red-500' : ''
          }`}
        required
      />
      <button
        type="submit"
        className="mt-5 inline-flex w-full justify-center px-6 md:px-10 py-3 md:py-3 border-4 border-white rounded-2xl 3xl:rounded-[1.5rem] bg-gradient-to-br from-[#3C1960] via-[#A12669] to-[#FEC261] [box-shadow:0px_0px_40px_5px_rgba(161,38,105,1)]"
      >
        Submit
      </button>
      {showAlert && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Deposit has been added.</span>
        </div>
      )}
    </form>
  );
};

export default DepositsForm;