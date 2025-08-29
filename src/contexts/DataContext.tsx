import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, Sale, Customer, Expense, Quote, Purchase, PaymentMethod, User, Supplier, CashRegister, CashMovement } from '../types';

interface DataContextType {
  products: Product[];
  sales: Sale[];
  customers: Customer[];
  expenses: Expense[];
  quotes: Quote[];
  purchases: Purchase[];
  paymentMethods: PaymentMethod[];
  users: User[];
  suppliers: Supplier[];
  cashRegisters: CashRegister[];
  cashMovements: CashMovement[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  addSale: (sale: Sale) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (customer: Customer) => void;
  addExpense: (expense: Expense) => void;
  addQuote: (quote: Quote) => void;
  updateQuote: (quote: Quote) => void;
  addPurchase: (purchase: Purchase) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (supplier: Supplier) => void;
  openCashRegister: (register: CashRegister) => void;
  closeCashRegister: (registerId: string, closingAmount: number, expensesTurno?: any[]) => void;
  addCashMovement: (movement: CashMovement) => void;
  formatCurrency: (amount: number) => string;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop HP Pavilion',
    sku: 'LP001',
    category: 'Computadores',
    price: 2500000,
    cost: 2000000,
    stock: 5,
    minStock: 2,
    storeId: '1',
    imageUrl: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Mouse Logitech',
    sku: 'MS001',
    category: 'Accesorios',
    price: 80000,
    cost: 60000,
    stock: 25,
    minStock: 10,
    storeId: '1'
  },
  {
    id: '3',
    name: 'Teclado Mecánico',
    sku: 'KB001',
    category: 'Accesorios',
    price: 150000,
    cost: 120000,
    stock: 15,
    minStock: 5,
    storeId: '1'
  },
  {
    id: '4',
    name: 'Monitor 24"',
    sku: 'MN001',
    category: 'Monitores',
    price: 800000,
    cost: 650000,
    stock: 8,
    minStock: 3,
    storeId: '2'
  }
];

const mockPaymentMethods: PaymentMethod[] = [
  { id: '1', name: 'Efectivo', discountPercentage: 0, isActive: true },
  { id: '2', name: 'Tarjeta Débito', discountPercentage: 2.5, isActive: true },
  { id: '3', name: 'Tarjeta Crédito', discountPercentage: 3.8, isActive: true },
  { id: '4', name: 'Transferencia', discountPercentage: 1.2, isActive: true },
  { id: '5', name: 'PayPal', discountPercentage: 4.2, isActive: true },
  { id: '6', name: 'Nequi', discountPercentage: 1.8, isActive: true }
];

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@email.com',
    phone: '+57 300 123 4567',
    address: 'Calle 123, Ciudad',
    storeId: '1',
    totalPurchases: 5500000,
    lastPurchase: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@email.com',
    phone: '+57 300 123 4568',
    address: 'Av. Principal 456, Ciudad',
    storeId: '1',
    totalPurchases: 2300000,
    lastPurchase: new Date('2024-01-10')
  }
];

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@tienda.com',
    role: 'admin',
    storeId: '1',
    createdAt: new Date(),
    isActive: true
  },
  {
    id: '2',
    username: 'empleado1',
    email: 'empleado1@tienda.com',
    role: 'employee',
    storeId: '1',
    createdAt: new Date(),
    isActive: true
  },
  {
    id: '3',
    username: 'empleado2',
    email: 'empleado2@tienda.com',
    role: 'employee',
    storeId: '2',
    createdAt: new Date(),
    isActive: true
  }
];

const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Proveedor Tech SA',
    email: 'ventas@proveedortech.com',
    phone: '+57 300 555 0001',
    address: 'Zona Industrial, Ciudad',
    contactPerson: 'Carlos Mendoza',
    isActive: true
  },
  {
    id: '2',
    name: 'Distribuidora Nacional',
    email: 'pedidos@disnacional.com',
    phone: '+57 300 555 0002',
    address: 'Centro Comercial, Ciudad',
    contactPerson: 'Ana López',
    isActive: true
  }
];

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [sales, setSales] = useState<Sale[]>([]);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [paymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [cashRegisters, setCashRegisters] = useState<CashRegister[]>([]);
  const [cashMovements, setCashMovements] = useState<CashMovement[]>([]);

  // CRUD functions
  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const addSale = (sale: Sale) => {
    setSales(prev => [...prev, sale]);
    // Update product stock
    sale.items.forEach(item => {
      setProducts(prev => prev.map(p => 
        p.id === item.productId 
          ? { ...p, stock: p.stock - item.quantity }
          : p
      ));
    });
    // Add cash movement
    const cashMovement: CashMovement = {
      id: Date.now().toString() + '_sale',
      storeId: sale.storeId,
      employeeId: sale.employeeId,
      type: 'sale',
      amount: sale.total,
      description: `Venta ${sale.invoiceNumber}`,
      date: sale.date,
      referenceId: sale.id
    };
    setCashMovements(prev => [...prev, cashMovement]);
  };

  const addCustomer = (customer: Customer) => {
    setCustomers(prev => [...prev, customer]);
  };

  const updateCustomer = (updatedCustomer: Customer) => {
    setCustomers(prev => prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
  };

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
    // Add cash movement
    const cashMovement: CashMovement = {
      id: Date.now().toString() + '_expense',
      storeId: expense.storeId,
      employeeId: expense.employeeId,
      type: 'expense',
      amount: -expense.amount,
      description: expense.description,
      date: expense.date,
      referenceId: expense.id
    };
    setCashMovements(prev => [...prev, cashMovement]);
  };

  const addQuote = (quote: Quote) => {
    setQuotes(prev => [...prev, quote]);
  };

  const updateQuote = (updatedQuote: Quote) => {
    setQuotes(prev => prev.map(q => q.id === updatedQuote.id ? updatedQuote : q));
  };

  const addPurchase = (purchase: Purchase) => {
    setPurchases(prev => [...prev, purchase]);
    // Update product stock
    purchase.items.forEach(item => {
      setProducts(prev => prev.map(p => 
        p.id === item.productId 
          ? { ...p, stock: p.stock + item.quantity }
          : p
      ));
    });
  };

  const addUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const addSupplier = (supplier: Supplier) => {
    setSuppliers(prev => [...prev, supplier]);
  };

  const updateSupplier = (updatedSupplier: Supplier) => {
    setSuppliers(prev => prev.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
  };

  const openCashRegister = (register: CashRegister) => {
    setCashRegisters(prev => [...prev, register]);
    // Add cash movement for opening
    const cashMovement: CashMovement = {
      id: Date.now().toString() + '_opening',
      storeId: register.storeId,
      employeeId: register.employeeId,
      type: 'opening',
      amount: register.openingAmount,
      description: 'Apertura de caja',
      date: register.openedAt,
      referenceId: register.id
    };
    setCashMovements(prev => [...prev, cashMovement]);
  };

  // ---- CORREGIDO: cierre de caja con cálculo correcto ----
  const closeCashRegister = (registerId: string, closingAmount: number, expensesTurno?: any[]) => {
    setCashRegisters(prev => prev.map(r => {
      if (r.id === registerId) {
        const openedAt = new Date(r.openedAt);
        const closedAt = new Date();

        // Ventas del turno
        const salesTurno = sales.filter(sale =>
          sale.storeId === r.storeId &&
          new Date(sale.date) >= openedAt &&
          new Date(sale.date) <= closedAt
        );
        const salesTotal = salesTurno.reduce((sum, s) => sum + s.total, 0);

        // Egresos del turno
        const expensesTurnoArr = expenses.filter(exp =>
          exp.storeId === r.storeId &&
          new Date(exp.date) >= openedAt &&
          new Date(exp.date) <= closedAt
        );
        const expensesTotal = expensesTurnoArr.reduce((sum, e) => sum + e.amount, 0);

        // Calcular esperado y diferencia
        const expectedAmount = r.openingAmount + salesTotal - expensesTotal;
        const difference = closingAmount - expectedAmount;

        return {
          ...r,
          closingAmount,
          closedAt,
          status: 'closed' as const,
          expectedAmount,
          difference,
          expensesTurno: expensesTurnoArr
        };
      }
      return r;
    }));

    // Add cash movement for closing
    const register = cashRegisters.find(r => r.id === registerId);
    if (register) {
      const cashMovement: CashMovement = {
        id: Date.now().toString() + '_closing',
        storeId: register.storeId,
        employeeId: register.employeeId,
        type: 'closing',
        amount: 0,
        description: `Cierre de caja - Conteo: ${formatCurrency(closingAmount)}`,
        date: new Date(),
        referenceId: registerId
      };
      setCashMovements(prev => [...prev, cashMovement]);
    }
  };

  const addCashMovement = (movement: CashMovement) => {
    setCashMovements(prev => [...prev, movement]);
  };

  const value = {
    products,
    sales,
    customers,
    expenses,
    quotes,
    purchases,
    paymentMethods,
    users,
    suppliers,
    cashRegisters,
    cashMovements,
    addProduct,
    updateProduct,
    addSale,
    addCustomer,
    updateCustomer,
    addExpense,
    addQuote,
    updateQuote,
    addPurchase,
    addUser,
    updateUser,
    addSupplier,
    updateSupplier,
    openCashRegister,
    closeCashRegister,
    addCashMovement,
    formatCurrency
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}