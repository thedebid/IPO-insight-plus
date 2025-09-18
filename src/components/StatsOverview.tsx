import { Mail, MessageSquare, Globe, Flag } from "lucide-react";

interface IPO {
  id: string;
  company: string;
  symbol: string;
  category: "local" | "foreign";
  industry: string;
  launchDate: string;
  priceRange: string;
  status: "upcoming" | "active" | "closed";
  marketCap: string;
  country: string;
}

interface StatsOverviewProps {
  ipos: IPO[];
}

export default function StatsOverview({ ipos }: StatsOverviewProps) {
  // Simulate email and SMS statistics
  const totalEmails = 47;
  const totalSms = 23;
  const localIpos = ipos.filter((ipo) => ipo.category === "local").length;
  const foreignIpos = ipos.filter((ipo) => ipo.category === "foreign").length;

  const stats = [
    {
      title: "Emails Received",
      value: totalEmails,
      icon: Mail,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "SMS Received",
      value: totalSms,
      icon: MessageSquare,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Local IPOs",
      value: localIpos,
      icon: Flag,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Foreign IPOs",
      value: foreignIpos,
      icon: Globe,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg lg:rounded-xl border border-gray-200 p-4 lg:p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600">
                {stat.title}
              </p>
              <p className="text-xl lg:text-3xl font-bold text-gray-900 mt-1 lg:mt-2">
                {stat.value}
              </p>
            </div>
            <div className={`p-2 lg:p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 lg:h-6 lg:w-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
