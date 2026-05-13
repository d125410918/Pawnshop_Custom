import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '徠鑫當鋪 | 快速申請資金',
  description: '簡單填寫資料，專人盡速聯繫',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}