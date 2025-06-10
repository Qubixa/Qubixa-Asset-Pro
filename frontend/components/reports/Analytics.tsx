"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, BarChart3, PieChart } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const performanceData = [
  { month: "Jan", efficiency: 85, utilization: 78, maintenance: 12 },
  { month: "Feb", efficiency: 88, utilization: 82, maintenance: 8 },
  { month: "Mar", efficiency: 92, utilization: 85, maintenance: 15 },
  { month: "Apr", efficiency: 87, utilization: 80, maintenance: 10 },
  { month: "May", efficiency: 94, utilization: 88, maintenance: 6 },
  { month: "Jun", efficiency: 91, utilization: 86, maintenance: 9 },
]

const assetUtilization = [
  { category: "IT Equipment", utilization: 92 },
  { category: "Machinery", utilization: 78 },
  { category: "Vehicles", utilization: 85 },
  { category: "Furniture", utilization: 95 },
]

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Detailed analytics and performance metrics for your assets
          </p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Asset Efficiency",
            value: "91.2%",
            change: "+2.4%",
            trend: "up",
            icon: TrendingUp,
            color: "green",
          },
          {
            title: "Utilization Rate",
            value: "85.7%",
            change: "+1.8%",
            trend: "up",
            icon: BarChart3,
            color: "blue",
          },
          {
            title: "Downtime",
            value: "4.2%",
            change: "-0.8%",
            trend: "down",
            icon: TrendingDown,
            color: "red",
          },
          {
            title: "ROI",
            value: "18.5%",
            change: "+3.2%",
            trend: "up",
            icon: PieChart,
            color: "purple",
          },
        ].map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg bg-${kpi.color}-100 dark:bg-${kpi.color}-900/20`}>
                <kpi.icon className={`w-6 h-6 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
              </div>
              <span
                className={`text-sm font-medium ${
                  kpi.trend === "up" ? "text-green-600" : "text-red-600"
                } flex items-center`}
              >
                {kpi.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {kpi.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{kpi.value}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{kpi.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Performance Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Area
                type="monotone"
                dataKey="efficiency"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="utilization"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Utilization</span>
          </div>
        </div>
      </motion.div>

      {/* Asset Utilization by Category */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Asset Utilization by Category</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={assetUtilization} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis type="number" domain={[0, 100]} stroke="#6B7280" />
              <YAxis dataKey="category" type="category" stroke="#6B7280" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
                formatter={(value) => [`${value}%`, "Utilization"]}
              />
              <Bar dataKey="utilization" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
