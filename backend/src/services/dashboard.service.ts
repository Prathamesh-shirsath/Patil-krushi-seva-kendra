import {
  OrderStatus,
  Role,
} from "@prisma/client";

import { prisma } from "../lib/prisma";

import type {
  DashboardStats,
} from "../types/dashboard.types";

/* ============================================================
   HELPERS
============================================================ */

function toNumber(
  value: unknown
): number {
  if (value === null || value === undefined) {
    return 0;
  }

  return Number(value);
}

function round(
  value: number,
  decimals = 1
): number {
  const factor =
    Math.pow(10, decimals);

  return (
    Math.round(value * factor) /
    factor
  );
}

function growthPercentage(
  current: number,
  previous: number
): number {
  if (previous === 0) {
    return current > 0 ? 100 : 0;
  }

  return round(
    ((current - previous) /
      previous) *
    100
  );
}

/* ============================================================
   INDIA DATE HELPERS
============================================================ */

function getIndiaDateParts(
  date = new Date()
) {
  const formatter =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone:
          "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );

  const parts =
    formatter.formatToParts(date);

  const year = Number(
    parts.find(
      (part) =>
        part.type === "year"
    )?.value
  );

  const month = Number(
    parts.find(
      (part) =>
        part.type === "month"
    )?.value
  );

  const day = Number(
    parts.find(
      (part) =>
        part.type === "day"
    )?.value
  );

  return {
    year,
    month,
    day,
  };
}

function indiaMidnight(
  daysAgo = 0
) {
  const {
    year,
    month,
    day,
  } = getIndiaDateParts();

  const utcDate =
    new Date(
      Date.UTC(
        year,
        month - 1,
        day - daysAgo,
        0,
        0,
        0
      )
    );

  /*
   * IST = UTC + 5:30
   * India midnight is therefore
   * 5h 30m before UTC midnight.
   */

  utcDate.setUTCMinutes(
    utcDate.getUTCMinutes() -
    330
  );

  return utcDate;
}

function indiaDateKey(
  date: Date
) {
  const {
    year,
    month,
    day,
  } =
    getIndiaDateParts(date);

  return `${year}-${String(
    month
  ).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;
}

function indiaLabel(
  date: Date
) {
  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      timeZone:
        "Asia/Kolkata",
    }
  ).format(date);
}

/* ============================================================
   DASHBOARD
============================================================ */

export const getDashboardStats =
  async (): Promise<DashboardStats> => {

    /* ====================================================
       BASIC COUNTS
    ==================================================== */

    const [
      totalOrders,
      totalCustomers,
      totalProducts,
      activeProducts,
      lowStockCount,
      totalCategories,
      totalBrands,
    ] = await Promise.all([
      prisma.order.count(),

      prisma.user.count({
        where: {
          role: Role.CUSTOMER,
        },
      }),

      prisma.product.count(),

      prisma.product.count({
        where: {
          status: true,
        },
      }),

      prisma.product.count({
        where: {
          status: true,
          stock: {
            lte: 10,
          },
        },
      }),

      prisma.category.count(),

      prisma.brand.count(),
    ]);

    /* ====================================================
       SALES
       
       We count confirmed/shipped/delivered
       orders as actual sales.
    ==================================================== */

    const salesStatuses = [
      OrderStatus.CONFIRMED,
      OrderStatus.SHIPPED,
      OrderStatus.DELIVERED,
    ];

    const salesSummary =
      await prisma.order.aggregate({
        where: {
          status: {
            in: salesStatuses,
          },
        },

        _sum: {
          grandTotal: true,
        },

        _count: {
          id: true,
        },
      });

    const totalSales =
      toNumber(
        salesSummary._sum
          .grandTotal
      );

    const salesOrderCount =
      salesSummary._count.id;

    const averageOrderValue =
      salesOrderCount > 0
        ? totalSales /
        salesOrderCount
        : 0;

    /* ====================================================
       7 DAY GROWTH
    ==================================================== */

    const currentPeriodStart =
      indiaMidnight(6);

    const previousPeriodStart =
      indiaMidnight(13);

    const previousPeriodEnd =
      currentPeriodStart;

    const [
      currentPeriod,
      previousPeriod,
    ] = await Promise.all([
      prisma.order.aggregate({
        where: {
          status: {
            in: salesStatuses,
          },

          createdAt: {
            gte:
              currentPeriodStart,
          },
        },

        _sum: {
          grandTotal: true,
        },
      }),

      prisma.order.aggregate({
        where: {
          status: {
            in: salesStatuses,
          },

          createdAt: {
            gte:
              previousPeriodStart,

            lt:
              previousPeriodEnd,
          },
        },

        _sum: {
          grandTotal: true,
        },
      }),
    ]);

    const currentSales =
      toNumber(
        currentPeriod._sum
          .grandTotal
      );

    const previousSales =
      toNumber(
        previousPeriod._sum
          .grandTotal
      );

    const currentOrders =
      await prisma.order.count({
        where: {
          status: {
            in: salesStatuses,
          },

          createdAt: {
            gte:
              currentPeriodStart,
          },
        },
      });

    const previousOrders =
      await prisma.order.count({
        where: {
          status: {
            in: salesStatuses,
          },

          createdAt: {
            gte:
              previousPeriodStart,

            lt:
              previousPeriodEnd,
          },
        },
      });

    /* ====================================================
       SALES TREND
    ==================================================== */

    const trendStart =
      indiaMidnight(6);

    const trendOrders =
      await prisma.order.findMany({
        where: {
          status: {
            in: salesStatuses,
          },

          createdAt: {
            gte: trendStart,
          },
        },

        select: {
          grandTotal: true,
          createdAt: true,
        },

        orderBy: {
          createdAt: "asc",
        },
      });

    const trendMap =
      new Map<
        string,
        {
          sales: number;
          orders: number;
        }
      >();

    for (
      let i = 6;
      i >= 0;
      i--
    ) {
      const date =
        indiaMidnight(i);

      const key =
        indiaDateKey(date);

      trendMap.set(
        key,
        {
          sales: 0,
          orders: 0,
        }
      );
    }

    for (const order of trendOrders) {
      const key =
        indiaDateKey(
          order.createdAt
        );

      const existing =
        trendMap.get(key);

      if (!existing) {
        continue;
      }

      existing.sales +=
        toNumber(
          order.grandTotal
        );

      existing.orders += 1;
    }

    const salesTrend =
      Array.from(
        trendMap.entries()
      ).map(
        ([date, values]) => {
          const dateObject =
            new Date(
              `${date}T00:00:00+05:30`
            );

          return {
            date,
            label:
              indiaLabel(
                dateObject
              ),
            sales:
              round(
                values.sales,
                2
              ),
            orders:
              values.orders,
          };
        }
      );

    /* ====================================================
       ORDER STATUS
    ==================================================== */

    const statusGroups =
      await prisma.order.groupBy({
        by: ["status"],

        _count: {
          id: true,
        },
      });

    const statusOrder = [
      OrderStatus.PENDING,
      OrderStatus.CONFIRMED,
      OrderStatus.SHIPPED,
      OrderStatus.DELIVERED,
      OrderStatus.CANCELLED,
    ];

    const orderStatus =
      statusOrder.map(
        (status) => {
          const found =
            statusGroups.find(
              (item) =>
                item.status ===
                status
            );

          return {
            name:
              status
                .charAt(0)
                .toUpperCase() +
              status
                .slice(1)
                .toLowerCase(),
            value:
              found?._count
                .id ?? 0,
          };
        }
      );

    /* ====================================================
       RECENT ORDERS
    ==================================================== */

    const recentOrdersRaw =
      await prisma.order.findMany({
        take: 6,

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          grandTotal: true,
          status: true,
          createdAt: true,

          user: {
            select: {
              name: true,
              phone: true,
            },
          },
        },
      });

    const recentOrders =
      recentOrdersRaw.map(
        (order) => ({
          id: order.id,

          customerName:
            order.user?.name ||
            "Customer",

          customerPhone:
            order.user?.phone ||
            null,

          amount:
            round(
              toNumber(
                order.grandTotal
              ),
              2
            ),

          status:
            order.status,

          createdAt:
            order.createdAt.toISOString(),
        })
      );

    /* ====================================================
       ORDER ITEMS
    ==================================================== */

    const orderItems =
      await prisma.orderItem.findMany({
        where: {
          order: {
            status: {
              not:
                OrderStatus.CANCELLED,
            },
          },
        },

        select: {
          productId: true,
          productName: true,
          quantity: true,
          price: true,

          product: {
            select: {
              id: true,
              name: true,
              image: true,

              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

    /* ====================================================
       TOP PRODUCTS
    ==================================================== */

    const productMap =
      new Map<
        string,
        {
          id: string;
          name: string;
          image: string | null;
          sold: number;
          revenue: number;
        }
      >();

    for (const item of orderItems) {
      const id =
        item.productId;

      const existing =
        productMap.get(id);

      const revenue =
        item.quantity *
        toNumber(item.price);

      if (existing) {
        existing.sold +=
          item.quantity;

        existing.revenue +=
          revenue;
      } else {
        productMap.set(
          id,
          {
            id,

            name:
              item.product
                ?.name ||
              item.productName,

            image:
              item.product
                ?.image ??
              null,

            sold:
              item.quantity,

            revenue,
          }
        );
      }
    }

    const topProducts =
      Array.from(
        productMap.values()
      )
        .sort(
          (a, b) =>
            b.sold - a.sold
        )
        .slice(0, 6)
        .map((product) => ({
          ...product,

          revenue:
            round(
              product.revenue,
              2
            ),
        }));

    /* ====================================================
       CATEGORY SALES
    ==================================================== */

    const categoryMap =
      new Map<
        string,
        {
          name: string;
          revenue: number;
        }
      >();

    for (const item of orderItems) {
      const categoryName =
        item.product
          ?.category?.name ||
        "Uncategorized";

      const revenue =
        item.quantity *
        toNumber(item.price);

      const existing =
        categoryMap.get(
          categoryName
        );

      if (existing) {
        existing.revenue +=
          revenue;
      } else {
        categoryMap.set(
          categoryName,
          {
            name:
              categoryName,
            revenue,
          }
        );
      }
    }

    const totalCategoryRevenue =
      Array.from(
        categoryMap.values()
      ).reduce(
        (sum, item) =>
          sum + item.revenue,
        0
      );

    const categorySales =
      Array.from(
        categoryMap.values()
      )
        .sort(
          (a, b) =>
            b.revenue -
            a.revenue
        )
        .slice(0, 6)
        .map((category) => ({
          name:
            category.name,

          revenue:
            round(
              category.revenue,
              2
            ),

          sales:
            totalCategoryRevenue >
              0
              ? round(
                (category.revenue /
                  totalCategoryRevenue) *
                100
              )
              : 0,
        }));

    /* ====================================================
       LOW STOCK
    ==================================================== */

    const lowStockRaw =
      await prisma.product.findMany({
        where: {
          status: true,

          stock: {
            lte: 10,
          },
        },

        orderBy: {
          stock: "asc",
        },

        take: 6,

        select: {
          id: true,
          name: true,
          image: true,
          stock: true,
          price: true,
        },
      });

    const lowStockProducts =
      lowStockRaw.map(
        (product) => ({
          id: product.id,
          name: product.name,

          image:
            product.image ??
            null,

          stock:
            product.stock,

          price:
            round(
              toNumber(
                product.price
              ),
              2
            ),
        })
      );

    /* ====================================================
       FINAL RESPONSE
    ==================================================== */

    return {
      totalSales:
        round(
          totalSales,
          2
        ),

      totalOrders,

      totalCustomers,

      totalProducts,

      activeProducts,

      lowStockCount,

      totalCategories,

      totalBrands,

      averageOrderValue:
        round(
          averageOrderValue,
          2
        ),

      salesGrowthPercent:
        growthPercentage(
          currentSales,
          previousSales
        ),

      ordersGrowthPercent:
        growthPercentage(
          currentOrders,
          previousOrders
        ),

      salesTrend,

      orderStatus,

      recentOrders,

      topProducts,

      categorySales,

      lowStockProducts,
    };
  };