export const metadata = {
  title: "Audit Trail",
  description: "Track text changes with automatic version history",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter, system-ui, Arial, sans-serif', background: '#0b1220', color: '#e6edf3' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
