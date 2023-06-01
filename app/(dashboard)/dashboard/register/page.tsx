import RegisterForm from '@/components/forms/RegisterForm'

export default async function Register() {
  return (
    <section id="addUser">
      <h1 className="text-center text-3xl uppercase font-bold mb-5">Add another user</h1>
      <div className="px-3 py-5">
        <RegisterForm></RegisterForm>
      </div>
    </section>

  )
}