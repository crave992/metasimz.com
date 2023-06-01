/* eslint-disable @next/next/no-img-element */
import LoginForm from '@/components/forms/LoginForm'
import styles from '../../public/styles/modules/page.module.scss'

export default async function Home() {
  return (
    <section id="main" className={styles.loginForm + " m-auto" + " w-full" + " max-w-sm"}>
      <h1 className="text-center text-3xl uppercase font-bold mb-5">Login</h1>
      <LoginForm></LoginForm>
    </section>
   
  )
}
