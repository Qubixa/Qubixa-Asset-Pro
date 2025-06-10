"use client"

import { motion } from "framer-motion"
import { Shield, User, Clock } from "lucide-react"

const mockAccessLogs = [
  {
    id: "ACCESS-001",
    user: "John Doe",
    action: "Login",
    resource: "Asset Management System",
    timestamp: "2024-01-15 14:30:00",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome 120.0.0.0",
    status: "Success",
  },
  {
    id: "ACCESS-002",
    user: "Jane Smith",
    action: "View Asset",
    resource: "AST-001 - Dell Laptop XPS 13",
    timestamp: "2024-01-15 14:25:00",
    ipAddress: "192.168.1.102",
    userAgent: "Firefox 121.0.0.0",
    status: "Success",
  },
  {
    id: "ACCESS-003",
    user: "Mike Johnson",
    action: "Failed Login",
    resource: "Asset Management System",
    timestamp: "2024-01-15 14:20:00",
    ipAddress: "192.168.1.105",
    userAgent: "Chrome 120.0.0.0",
    status: "Failed",
  },
  {
    id: "ACCESS-004",
    user: "Sarah Wilson",
    action: "Edit Asset",
    resource: "AST-004 - Forklift Model X200",
    timestamp: "2024-01-15 14:15:00",
    ipAddress: "192.168.1.103",
    userAgent: "Safari 17.0.0.0",
    status: "Success",
  },
]

const statusColors = {
  Success: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  Failed: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  Warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
}

const actionColors = {
  Login: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  "Failed Login": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  "View Asset": "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
  "Edit Asset": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  "Delete Asset": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  Logout: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
}

export default function AccessLogs() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Access Logs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Monitor user access and security events</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Access Events", value: "2,847", icon: Shield, color: "blue" },
          { label: "Successful Logins", value: "156", icon: User, color: "green" },
          { label: "Failed Attempts", value: "12", icon: User, color: "red" },
          { label: "Active Sessions", value: "8", icon: Clock, color: "purple" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Access Logs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockAccessLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        actionColors[log.action as keyof typeof actionColors]
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {log.resource}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {log.ipAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {log.userAgent}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        statusColors[log.status as keyof typeof statusColors]
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
