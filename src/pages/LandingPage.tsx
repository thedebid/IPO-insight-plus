import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Bell, Mail, Globe, Target, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-blue-600 mr-2 md:mr-3" />
              <span className="text-lg md:text-2xl font-bold text-gray-900">
                IPO Insight+
              </span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm md:text-base"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-2 md:px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm md:text-base"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Track IPOs Like a <span className="text-blue-600">Pro</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Start free, upgrade as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <PricingCard
              title="Free"
              price="$0"
              period="forever"
              features={["Up to 30 IPO alerts", "Basic email notifications"]}
              buttonText="Get Started"
              isPopular={false}
            />
            <PricingCard
              title="Pro"
              price="$3"
              period="per month"
              features={[
                "Unlimited IPO alerts",
                "Advanced email notifications",
                "Local & foreign IPO alerts",
                "Right share alerts",
                "Advanced analytics",
                "MS-style alert customization",
                "Priority support",
                "Export capabilities",
              ]}
              buttonText="Start Free Trial"
              isPopular={true}
            />
            <PricingCard
              title="Enterprise"
              price="$99"
              period="per month"
              features={[
                "Everything in Pro",
                "API access",
                "Custom integrations",
                "Advanced analytics",
                "Dedicated support",
                "White-label options",
              ]}
              buttonText="Contact Sales"
              isPopular={false}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-400 mr-3" />
              <span className="text-2xl font-bold">IPO Insight+</span>
            </div>
            <p className="text-gray-400">
              © 2025 IPO Insight+. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border hover:shadow-lg transition-shadow duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-sm md:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function PricingCard({
  title,
  price,
  period,
  features,
  buttonText,
  isPopular,
}: {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 md:p-8 relative ${
        isPopular
          ? "border-2 border-blue-600 md:transform md:scale-105"
          : "border"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        <div className="mb-4">
          <span className="text-3xl md:text-4xl font-bold text-gray-900">
            {price}
          </span>
          <span className="text-sm md:text-base text-gray-600">/{period}</span>
        </div>
      </div>
      <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center text-sm md:text-base text-gray-600"
          >
            <Shield className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        to="/register"
        className={`w-full py-3 rounded-lg font-semibold transition-colors block text-center ${
          isPopular
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        }`}
      >
        {buttonText}
      </Link>
    </div>
  );
}
