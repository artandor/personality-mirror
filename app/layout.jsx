export const metadata = {
  title: 'Personality Mirror',
  description: 'Visualize your personality based on your inner circle'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
