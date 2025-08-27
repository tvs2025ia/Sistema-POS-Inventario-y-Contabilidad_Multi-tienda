import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { 
  Menu, 
  X, 
  Store, 
  ShoppingCart, 
  Package, 
  Users, 
  TrendingUp, 
  Settings,
  LogOut,
  DollarSign,
  FileText,
  Calculator,
  ShoppingBag,
  UserPlus,
  BarChart3,
  Home
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { stores, currentStore, setCurrentStore } = useStore();

  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: Home, admin: false },
    { name: 'Punto de Venta', id: 'pos', icon: ShoppingCart, admin: false },
    { name: 'Inventario', id: 'inventory', icon: Package, admin: false },
    { name: 'Clientes', id: 'customers', icon: Users, admin: false },
    { name: 'Cotizaciones', id: 'quotes', icon: FileText, admin: false },
    { name: 'Compras', id: 'purchases', icon: ShoppingBag, admin: false },
    { name: 'Egresos', id: 'expenses', icon: DollarSign, admin: false },
    { name: 'Cuadre de Caja', id: 'cash-register', icon: Calculator, admin: false },
    { name: 'Estadísticas', id: 'stats', icon: BarChart3, admin: false },
    { name: 'Administración', id: 'admin', icon: Settings, admin: true },
  ];

  const filteredNavigation = navigation.filter(item => 
    !item.admin || (item.admin && user?.role === 'admin')
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">POS Sistema</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <nav className="mt-4">
            {filteredNavigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onPageChange(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 ${
                  currentPage === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white shadow-sm">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-gray-900">POS Sistema</h1>
            <div className="mt-2 text-sm text-gray-600">
              {user?.username} • {user?.role === 'admin' ? 'Administrador' : 'Empleado'}
            </div>
          </div>
          
          {/* Store selector */}
          {currentStore && user?.role === 'admin' && (
            <div className="p-4 border-b bg-gray-50">
              <label className="block text-xs font-medium text-gray-500 mb-1">TIENDA ACTUAL</label>
              <select
                value={currentStore.id}
                onChange={(e) => {
                  const store = stores.find(s => s.id === e.target.value);
                  if (store) setCurrentStore(store);
                }}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              >
                {stores.map(store => (
                  <option key={store.id} value={store.id}>{store.name}</option>
                ))}
              </select>
            </div>
          )}

          {/* Store info for employees */}
          {currentStore && user?.role === 'employee' && (
            <div className="p-4 border-b bg-gray-50">
              <label className="block text-xs font-medium text-gray-500 mb-1">TIENDA</label>
              <div className="text-sm font-medium text-gray-900">{currentStore.name}</div>
            </div>
          )}

          <nav className="flex-1 py-4">
            {filteredNavigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                  currentPage === item.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <Store className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium">{currentStore?.name}</span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}