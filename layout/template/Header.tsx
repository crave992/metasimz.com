import Image from 'next/image'

export default function Header() {
  return (
    <header>
      <Image
        src="/images/logo.svg"
        alt="Metasimz Logo"
        width={300}
        height={50}
        className="logo"
      >
      </Image>
    </header>
  )
}