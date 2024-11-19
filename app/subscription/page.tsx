import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SubscriptionPage = ({}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  return <h1>Subscription</h1>;
};

export default SubscriptionPage;
