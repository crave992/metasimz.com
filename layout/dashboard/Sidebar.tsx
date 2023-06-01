import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const isActive = (pathname: string) => usePathname() === pathname;
  return (
    <section className='sidebar w-64'>
      <h2 className="text-center roboto font-bold text-lg py-6">
        <Image
          src="/images/logo.svg"
          alt="Metasimz Logo"
          width={150}
          height={25}
          className="m-auto"
        ></Image>
      </h2>
      <hr className="w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"/>
      <nav>
        <ul>
          <li className={isActive('/dashboard') ? 'active' : ''}>
            <Link 
              href="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className={isActive('/dashboard/manage-users') ? 'active' : ''}>
            <Link 
              href="/dashboard/manage-users">
              Manage Users
            </Link>
          </li>
          <li className={isActive('/dashboard/register') ? 'active' : ''}>
            <Link 
              href="/dashboard/register">
              Add User
            </Link>
          </li>
          <li className={isActive('/dashboard/settings') ? 'active' : ''}>
            <Link 
              href="/dashboard/settings">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Sidebar;