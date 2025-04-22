import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: 'Personality Mirror',
  description: 'Visualize your personality based on your inner circle'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <SpeedInsights/>
      <Analytics/>
    </html>
  );
}
