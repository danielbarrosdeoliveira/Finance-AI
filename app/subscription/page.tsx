import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import AcquirePlanButton from "./_componentes/acquire-plan-button";
import { Badge } from "../_components/ui/badge";

const SubscriptionPage = async ({}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  const user = await clerkClient().users.getUser(userId);

  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  return (
    <div className="py6 space-y-6 p-6 px-8">
      <h1 className="text-2xl font-bold">Assinatura</h1>

      <div className="flex gap-6">
        <Card className="w-[450px]">
          <CardHeader className="border-b border-solid py-8">
            <h2 className="text-center text-xl">Plano Básico</h2>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold text-muted-foreground">
                  0
                </span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-8">
            <div className="flex items-center gap-2">
              <CheckIcon className="text-primary" />
              <p>Apenas 10 transaçõe por mês</p>
            </div>
            <div className="flex items-center gap-2">
              <XIcon />
              <p>Relatórios de IA</p>
            </div>
          </CardContent>
          <div className="px-4">
            <Button variant="outline" className="w-full rounded-full font-bold">
              Fazer Upgrade
            </Button>
          </div>
        </Card>

        <Card className="w-[450px]">
          <CardHeader className="relative border-b border-solid py-8">
            {hasPremiumPlan && (
              <Badge className="absolute left-4 top-6 bg-primary/10 text-primary">
                Atual
              </Badge>
            )}
            <h2 className="text-center text-xl">Plano Premium</h2>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold text-muted-foreground">
                  19
                </span>
                <span className="text-2xl text-muted-foreground">/mês</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-4 py-8">
            <div className="flex items-center gap-2">
              <CheckIcon className="text-primary" />
              <p>Transações Ilimitadas</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="text-primary" />
              <p>Relatórios de IA</p>
            </div>
          </CardContent>
          <div className="px-4">
            <AcquirePlanButton />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPage;
