import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = ({ searchParams: { month } }: HomeProps) => {
  const { userId } = auth();
  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (!userId) {
    redirect("/login");
  }

  if (monthIsInvalid) {
    redirect("?month=01");
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <SummaryCards month={month} />
    </div>
  );
};

export default Home;
