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
    <section className="w-full py-8 sm:py-10 md:py-12">
      <div className="mx-auto w-full max-w-[1500px] px-3 sm:px-4 md:px-8 lg:px-12">
        
        {/* 2 columns on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="
                  group
                  w-full
                  overflow-hidden
                  rounded-xl
                  border
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                  cursor-pointer
                "
              >
                <CardContent
                  className="
                    flex
                    min-h-[150px]
                    flex-col
                    items-center
                    justify-center
                    p-3
                    text-center
                    sm:min-h-[165px]
                    sm:p-5
                    md:items-start
                    md:text-left
                    lg:min-h-[175px]
                    lg:p-6
                  "
                >
                  {/* Icon */}
                  <div
                    className="
                      mb-3
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-green-50
                      sm:mb-4
                      sm:h-12
                      sm:w-12
                      lg:h-14
                      lg:w-14
                    "
                  >
                    <Icon
                      className="
                        h-6
                        w-6
                        text-green-600
                        transition-transform
                        duration-300
                        group-hover:scale-110
                        sm:h-7
                        sm:w-7
                        lg:h-8
                        lg:w-8
                      "
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      line-clamp-2
                      text-sm
                      font-bold
                      leading-tight
                      text-gray-900
                      sm:text-base
                      lg:text-lg
                    "
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-1.5
                      line-clamp-2
                      text-[11px]
                      leading-relaxed
                      text-muted-foreground
                      sm:mt-2
                      sm:text-xs
                      lg:text-sm
                    "
                  >
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