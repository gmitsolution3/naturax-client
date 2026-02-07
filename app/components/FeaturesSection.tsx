import React from "react";
import { Truck, Repeat, ThumbsUp, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Within 24-48 hours",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Repeat,
    title: "Easy Returns",
    description: "7 days exchange",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    icon: ThumbsUp,
    title: "Best Prices",
    description: "Guaranteed deals",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help",
    gradient: "from-violet-400 to-purple-500",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 bg-white px-6 py-4 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};