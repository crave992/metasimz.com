import SettingsForm from "@/components/forms/SettingsForm";

export default async function Settings() {
  return (
    <section id="addUser">
      <h1 className="text-center text-3xl uppercase font-bold mb-5">Edit Current user</h1>
      <div className="px-3 py-5">
        <SettingsForm></SettingsForm>
      </div>
    </section>

  )
}