import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StoreProvider } from './contexts/StoreContext';
import { DataProvider } from './contexts/DataContext';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { POS } from './components/POS';
import { Sales } from './components/Sales';
import { Inventory } from './components/Inventory';
import { Customers } from './components/Customers';
import { Quotes } from './components/Quotes';
import { Purchases } from './components/Purchases';
import { Expenses } from './components/Expenses';
import { CashRegister } from './components/CashRegister';
import { Statistics } from './components/Statistics';
import { Admin } from './components/Admin';
import { FinancialReports } from './components/FinancialReports';

function MainApp() {
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onPageChange={setCurrentPage} />;
      case 'pos':
        return <POS />;
      case 'sales':
        return <Sales />;
      case 'inventory':
        return <Inventory />;
      case 'customers':
        return <Customers />;
      case 'quotes':
        return <Quotes />;
      case 'purchases':
        return <Purchases />;
      case 'expenses':
        return <Expenses />;
      case 'cash-register':
        return <CashRegister />;
      case 'stats':
        return <Statistics />;
      case 'admin':
        return <Admin />;
      case 'financial':
        return <FinancialReports />;
      default:
        return <Dashboard onPageChange={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <DataProvider>
          <MainApp />
        </DataProvider>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;