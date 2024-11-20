"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";

import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investimentos",
    color: "hsl(var(--foreground))",
  },
  [TransactionType.DEPOSIT]: {
    label: "Depósitos",
    color: "hsl(var(--primary))",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

interface TransactionPieChartProps {
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  typesPercentage: TransactionPercentagePerType;
}

const TransactionPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: chartConfig[TransactionType.INVESTMENT].color,
    },
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: chartConfig[TransactionType.DEPOSIT].color,
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: chartConfig[TransactionType.EXPENSE].color,
    },
  ];

  return (
    <Card className="flex flex-col p-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            value={typesPercentage[TransactionType.INVESTMENT]}
            title="Investimentos"
            icon={<PiggyBankIcon size={16} />}
          />

          <PercentageItem
            value={typesPercentage[TransactionType.DEPOSIT]}
            title="Receitas"
            icon={<TrendingUpIcon size={16} className="text-primary" />}
          />

          <PercentageItem
            value={typesPercentage[TransactionType.EXPENSE]}
            title="Despesas"
            icon={<TrendingDownIcon size={16} className="text-destructive" />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPieChart;
