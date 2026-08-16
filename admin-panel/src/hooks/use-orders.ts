import { useEffect, useState } from "react";

export interface Order {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  user: {
    email: string;
    name: string;
    phone?: string;
  };
  payment: any;
  items: any[];
}

export function useOrders() { 
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
       const res = await fetch("http://localhost:5000/api/orders");
        const json = await res.json();
        setOrders(json.data ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    orders,
    loading,
  };
}