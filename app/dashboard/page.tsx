// pages/dashboard.tsx (or components/DashboardPage.tsx)
import {
  ArrowUp,
  ArrowDown,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  Target,
  Eye,
} from "lucide-react";
import MainLayout from "../components/layout/MainLayout";

// Placeholder for data
const summaryData = [
  {
    title: "Total Income",
    value: "$12,450",
    change: "+12.5%",
    color: "text-green-500",
    Icon: ArrowUp,
    bgColor: "bg-green-50",
  },
  {
    title: "Total Expenses",
    value: "$8,230",
    change: "+8.2%",
    color: "text-red-500",
    Icon: ArrowUp, // Use ArrowUp for expense increase, or ArrowDown if tracking decrease
    bgColor: "bg-red-50",
  },
  {
    title: "Net Savings",
    value: "$4,220",
    change: "+18.7%",
    color: "text-blue-500",
    Icon: TrendingUp,
    bgColor: "bg-blue-50",
  },
];

const activityData = [
  {
    title: "Salary Deposit",
    date: "May 15",
    amount: "+$5,000",
    color: "text-green-600",
  },
  {
    title: "Grocery Shopping",
    date: "May 14",
    amount: "-$250",
    color: "text-red-600",
  },
  {
    title: "Rent Payment",
    date: "May 13",
    amount: "-$1,400",
    color: "text-red-600",
  },
  // Add more...
];

const quickActions = [
  {
    name: "Add Income",
    Icon: Plus,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    name: "Add Expense",
    Icon: Minus,
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    name: "Set Goal",
    Icon: Target,
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
  },
  {
    name: "View Savings",
    Icon: Eye,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
];

function DashboardPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* 1. Summary Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {summaryData.map((card) => (
            <div
              key={card.title}
              className="p-6 bg-white border rounded-xl shadow-sm"
            >
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>
                <div
                  className={`flex items-center text-xs font-semibold ${card.color}`}
                >
                  <card.Icon className="w-3 h-3 mr-1" />
                  {card.change}
                </div>
              </div>
              <p className="mt-1 text-3xl font-bold text-gray-900">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* 2. Monthly Overview and Recent Activity (Two Columns) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Monthly Overview (Chart - Placeholder) */}
          <div className="p-6 bg-white border rounded-xl shadow-sm lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800">
              Monthly Overview
            </h3>
            <div className="flex items-center mt-2 space-x-4 text-xs font-medium">
              <span className="flex items-center text-green-500">
                <span className="inline-block w-2 h-2 mr-1 bg-green-500 rounded-full"></span>{" "}
                Income
              </span>
              <span className="flex items-center text-red-500">
                <span className="inline-block w-2 h-2 mr-1 bg-red-500 rounded-full"></span>{" "}
                Expense
              </span>
            </div>

            {/* Chart Placeholder UI */}
            <div className="h-64 mt-4">
              {/*  */}
              <div className="flex items-end h-full">
                {/* Fake bars for visualization */}
                {["Jan", "Feb", "Mar", "Apr", "May"].map((month, index) => (
                  <div
                    key={month}
                    className="flex flex-col items-center justify-end flex-1 h-full px-2"
                  >
                    {/* Income Bar (Green) */}
                    <div
                      className="w-6 bg-green-500 rounded-t"
                      style={{ height: `${(index + 3) * 15}px` }}
                    ></div>
                    {/* Expense Bar (Red) */}
                    <div
                      className="w-6 bg-red-500 rounded-t mt-0.5"
                      style={{ height: `${(index + 2) * 12}px` }}
                    ></div>
                    <p className="mt-1 text-xs text-gray-500">{month}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {" "}
                (Chart Data Placeholder){" "}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-6 bg-white border rounded-xl shadow-sm lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Activity
            </h3>
            <div className="mt-4 space-y-4">
              {activityData.map((activity, index) => (
                <div
                  key={index}
                  className="flex justify-between pb-2 border-b last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                  <p className={`text-sm font-semibold ${activity.color}`}>
                    {activity.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Quick Actions */}
        <div className="grid grid-cols-2 gap-6 pt-4 sm:grid-cols-4">
          {quickActions.map((action) => (
            <div
              key={action.name}
              className="flex flex-col items-center p-4 transition-transform transform bg-white border rounded-xl shadow-sm hover:scale-[1.02] cursor-pointer"
            >
              <div
                className={`p-3 rounded-full ${action.bgColor} ${action.color}`}
              >
                <action.Icon className="w-6 h-6" />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-700">
                {action.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default DashboardPage;
