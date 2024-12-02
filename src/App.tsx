import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SubscriptionSelector } from './components/SubscriptionSelector';
import { Features } from './components/Features';
import { Contact } from './components/Contact';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Login } from './components/Login';
import { UserProfile } from './components/UserProfile';
import { HelpGuide } from './components/HelpGuide';
import { FAQ } from './components/FAQ';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessageContext';
import { CartProvider } from './contexts/CartContext';

function AppContent() {
  const { user } = useAuth();

  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      {user && (
        <div className="container mx-auto px-4 py-8">
          <UserProfile />
        </div>
      )}
      <Hero />
      <Features />
      <section id="plans" className="bg-white py-20">
        <SubscriptionSelector />
      </section>
      {!user && <HelpGuide />}
      <FAQ />
      <Contact />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MessageProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </MessageProvider>
    </AuthProvider>
  );
}

export default App;