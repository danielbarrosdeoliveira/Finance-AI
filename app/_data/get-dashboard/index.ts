import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "./types";
import { db } from "@/app/_lib/prisma";

export const getDashboard = async (month: string) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lte: new Date(`2024-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );

  const balance = depositsTotal - investmentsTotal - expensesTotal;

  const transactionsTotal = Number(
    (
      await db.transaction.aggregate({
        where,
        _sum: { amount: true },
      })
    )?._sum?.amount || 0,
  );

  const typesPercentage: TransactionPercentagePerType = {
    [TransactionType.DEPOSIT]:
      transactionsTotal > 0
        ? Math.round((depositsTotal / transactionsTotal) * 100)
        : 0,
    [TransactionType.INVESTMENT]:
      transactionsTotal > 0
        ? Math.round((investmentsTotal / transactionsTotal) * 100)
        : 0,
    [TransactionType.EXPENSE]:
      transactionsTotal > 0
        ? Math.round((expensesTotal / transactionsTotal) * 100)
        : 0,
  };

  return {
    depositsTotal,
    investmentsTotal,
    expensesTotal,
    balance,
    typesPercentage,
  };
};
