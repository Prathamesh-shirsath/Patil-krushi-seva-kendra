import {
  ShieldCheck,
  Truck,
  CreditCard,
  Headphones,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Quality Products",
    description: "Premium agricultural products",
    icon: ShieldCheck,
  },
  {
    title: "Fast Delivery",
    description: "Quick delivery to your doorstep",
    icon: Truck,
  },
  {
    title: "Secure Payment",
    description: "100% safe payment methods",
    icon: CreditCard,
  },
  {
    title: "Expert Support",
    description: "Agriculture experts available",
    icon: Headphones,
  },
];

export default function Features() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="
                  group
                  transition-all
                  duration-300
                  hover:shadow-xl
                  hover:-translate-y-1
                  cursor-pointer
                "
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Icon
                      size={36}
                      className="
                        text-green-600
                        group-hover:scale-110
                        transition-transform
                      "
                    />
                  </div>

                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}