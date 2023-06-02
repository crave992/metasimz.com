import SettingsForm from "@/components/forms/SettingsForm";

export default async function Settings() {
  return (
    <section id="addUser">
      <h1 className="p-5 text-gray-700 text-4xl font-extrabold robobto bg-gradient-to-r from-cyan-500 to-blue-500">Edit Current user</h1>
      <div className="px-3 py-5">
        <SettingsForm></SettingsForm>
      </div>
    </section>

  )
}