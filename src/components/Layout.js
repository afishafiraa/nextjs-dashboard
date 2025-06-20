'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';

const Layout = ({ children, title = 'PKAT System' }) => {
//   const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Pemeriksaan Kesehatan Anak Terintegrasi - Usia 6 bulan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Pemeriksaan Kesehatan Anak Terintegrasi
                  </h1>
                  <p className="text-sm text-gray-600">Usia 6 bulan</p>
                </div>
              </div>
              
              <div className="text-right text-sm text-gray-600">
                <div>Sistem PKAT</div>
                <div>{new Date().toLocaleDateString('id-ID')}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="text-center text-sm text-gray-600">
              <p>© 2024 Sistem PKAT - Pemeriksaan Kesehatan Anak Terintegrasi</p>
              <p className="mt-1">Dikembangkan untuk Puskesmas Indonesia</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;