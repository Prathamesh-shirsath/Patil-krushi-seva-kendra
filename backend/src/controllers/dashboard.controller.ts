
import { Request, Response } from "express";
import { getDashboardStats } from "../services/dashboard.service";

export const getDashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const stats = await getDashboardStats();

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard data",
    });
  }
};
