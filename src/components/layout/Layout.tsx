import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import DisableImageActions from '@/components/security/DisableImageActions';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomCursor />
      <DisableImageActions />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
