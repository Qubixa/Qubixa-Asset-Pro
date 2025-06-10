"use client"

import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Package, DollarSign } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const kpiData = [
  { name: "Total Assets", value: 1247, change: "+12%", color: "blue" },
  { name: "Asset Utilization", value: "87%", change: "+5%", color: "green" },
  { name: "Maintenance Cost", value: "$45K", change: "-8%", color: "orange" },
  { name: "Asset Value", value: "$2.4M", change: "+15%", color: "purple" },
]

const chartData = [
  { month: "Jan", assets: 1180, utilization: 82 },
  { month: "Feb", assets: 1195, utilization: 85 },
  { month: "Mar", assets: 1210, utilization: 87 },
  { month: "Apr", assets: 1225, utilization: 84 },
  { month: "May", assets: 1235, utilization: 89 },
  { month: "Jun", assets: 1247, utilization: 87 },
]

export default function KPIDashboard() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">KPI Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Key performance indicators and metrics</p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${kpi.color}-100 dark:bg-${kpi.color}-900/20`}>
                {kpi.name === "Total Assets" && (
                  <Package className={`w-6 h-6 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                )}
                {kpi.name === "Asset Utilization" && (
                  <TrendingUp
                    className={`w-6 h-6 text-${kpi.color}-600
                {kpi.name === "Asset Utilization" && <TrendingUp className={\`w-6 h-6 text-${kpi.color}-600 dark:text-${kpi.color}-400`}
                  />
                )}
                {kpi.name === "Maintenance Cost" && (
                  <DollarSign className={`w-6 h-6 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                )}
                {kpi.name === "Asset Value" && (
                  <BarChart3 className={`w-6 h-6 text-${kpi.color}-600 dark:text-${kpi.color}-400`} />
                )}
              </div>
              <span className={`text-sm font-medium ${kpi.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {kpi.change}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{kpi.value}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{kpi.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Asset Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
                <Line
                  type="monotone"
                  dataKey="assets"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Utilization Rate</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
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
                <Bar dataKey="utilization" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
