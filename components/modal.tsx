import React, { ReactNode } from "react";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ show, onClose, children }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-md shadow-lg">
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
        onClick={onClose}
      ></div>
    </div>
  );
};