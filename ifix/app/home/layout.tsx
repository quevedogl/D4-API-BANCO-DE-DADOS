
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="bg-gray-100 flex justify-center">
        <div className="w-full max-w-6xl bg-white min-h-screen shadow-lg">
          {children}
        </div>
      </body>
    </html>
  );
}