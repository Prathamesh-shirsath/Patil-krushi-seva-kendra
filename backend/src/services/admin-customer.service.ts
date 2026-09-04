import { prisma } from "../lib/prisma";

/**
 * Get all customers
 */
export const getAllCustomers = async () => {
  const customers = await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      createdAt: true,

      addresses: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        select: {
          city: true,
          state: true,
        },
      },

      orders: {
        select: {
          id: true,
          totalAmount: true,
          createdAt: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return customers.map((customer) => {
    const totalSpent = customer.orders.reduce(
      (sum, order) => sum + Number(order.totalAmount),
      0
    );

    return {
      id: customer.id,
      name: customer.name || "Unknown Customer",
      email: customer.email || "",
      phone: customer.phone || "",
      image: customer.image || "",

      city: customer.addresses[0]?.city || "",
      state: customer.addresses[0]?.state || "",

      orders: customer.orders.length,
      totalSpent,

      joinedOn: customer.createdAt,

      status:
        customer.orders.length > 0
          ? "Active"
          : "Inactive",
    };
  });
};


/**
 * Get customer by ID
 */
export const getCustomerById = async (id: string) => {
  const customer = await prisma.user.findFirst({
    where: {
      id,
      role: "CUSTOMER",
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,

      addresses: {
        orderBy: {
          createdAt: "desc",
        },

        select: {
  id: true,
  phone: true,
  city: true,
  state: true,
  pincode: true,
},
      },
    },
  });

  if (!customer) {
    throw new Error("CUSTOMER_NOT_FOUND");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: id,
    },

    select: {
      id: true,
      totalAmount: true,
      status: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const totalSpent = orders.reduce(
    (sum, order) => sum + Number(order.totalAmount),
    0
  );

  return {
    ...customer,

    orders,

    totalOrders: orders.length,

    totalSpent,

    status:
      orders.length > 0
        ? "Active"
        : "Inactive",
  };
};


/**
 * Get customer statistics
 */
export const getCustomerStats = async () => {
  const customers = await prisma.user.findMany({
    where: {
      role: "CUSTOMER",
    },

    select: {
      id: true,
      createdAt: true,

      orders: {
        select: {
          id: true,
        },
      },
    },
  });

  const totalCustomers = customers.length;

  const newCustomers = customers.filter((customer) => {
    const createdAt = new Date(customer.createdAt);
    const now = new Date();

    const difference =
      now.getTime() - createdAt.getTime();

    const days =
      difference / (1000 * 60 * 60 * 24);

    return days <= 30;
  }).length;

  const repeatCustomers = customers.filter(
    (customer) => customer.orders.length > 1
  ).length;

  const activeCustomers = customers.filter(
    (customer) => customer.orders.length > 0
  ).length;

  const inactiveCustomers =
    totalCustomers - activeCustomers;

  return {
    totalCustomers,
    newCustomers,
    repeatCustomers,
    activeCustomers,
    inactiveCustomers,
  };
};


/**
 * Update customer
 */
export const updateCustomer = async (
  id: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    image?: string;
  }
) => {
  const customer = await prisma.user.findFirst({
    where: {
      id,
      role: "CUSTOMER",
    },
  });

  if (!customer) {
    throw new Error("CUSTOMER_NOT_FOUND");
  }

  if (data.email && data.email !== customer.email) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser && existingUser.id !== id) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }
  }

  return prisma.user.update({
    where: {
      id,
    },

    data: {
      ...(data.name !== undefined && {
        name: data.name,
      }),

      ...(data.email !== undefined && {
        email: data.email,
      }),

      ...(data.phone !== undefined && {
        phone: data.phone,
      }),

      ...(data.image !== undefined && {
        image: data.image,
      }),
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};


/**
 * Delete customer
 */
export const deleteCustomer = async (id: string) => {
  const customer = await prisma.user.findFirst({
    where: {
      id,
      role: "CUSTOMER",
    },
  });

  if (!customer) {
    throw new Error("CUSTOMER_NOT_FOUND");
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });

  return {
    id,
    message: "Customer deleted successfully.",
  };
};