import DepositsForm from "@/components/forms/DepositsForm"
import Link from "next/link"

export default async function DepositCash() {
  return (
    <section id="addUser">
      <h1 className="p-5 text-gray-700 text-4xl font-extrabold robobto bg-gradient-to-r from-cyan-500 to-blue-500">Deposit Cash</h1>
      <div className="px-3 py-5">
        <DepositsForm></DepositsForm>
      </div>
    </section>

  )
}