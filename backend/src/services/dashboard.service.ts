
import { DashboardStats } from "../types/dashboard.types";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  return {
    totalSales: 248650,
    totalOrders: 256,
    totalCustomers: 1245,
    averageOrderValue: 971,
  };
};
