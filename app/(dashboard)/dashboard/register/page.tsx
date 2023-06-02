import RegisterForm from '@/components/forms/RegisterForm'

export default async function Register() {
  return (
    <section id="addUser">
      <h1 className="p-5 text-gray-700 text-4xl font-extrabold robobto bg-gradient-to-r from-cyan-500 to-blue-500">Add another user</h1>
      <div className="px-3 py-5">
        <RegisterForm></RegisterForm>
      </div>
    </section>

  )
}