export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="deposit">
      {children}
    </div>
  )
}
