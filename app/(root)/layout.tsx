import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container">
      <div>Header</div>
      <div>Application content</div>
      <div>Footer</div>
    </div>
  );
}
