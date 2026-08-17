export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;

  totalProducts: number;
  activeProducts: number;
  lowStockCount: number;

  totalCategories: number;
  totalBrands: number;

  averageOrderValue: number;

  salesGrowthPercent: number;
  ordersGrowthPercent: number;

  salesTrend: {
    date: string;
    label: string;
    sales: number;
    orders: number;
  }[];

  orderStatus: {
    name: string;
    value: number;
  }[];

  recentOrders: {
    id: string;
    customerName: string;
    customerPhone: string | null;
    amount: number;
    status: string;
    createdAt: string;
  }[];

  topProducts: {
    id: string;
    name: string;
    image: string | null;
    sold: number;
    revenue: number;
  }[];

  categorySales: {
    name: string;
    sales: number;
    revenue: number;
  }[];

  lowStockProducts: {
    id: string;
    name: string;
    image: string | null;
    stock: number;
    price: number;
  }[];
}