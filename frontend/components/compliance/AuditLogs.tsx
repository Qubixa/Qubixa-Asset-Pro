"use client"

import { motion } from "framer-motion"
import { FileText, User, Calendar } from "lucide-react"

const mockAuditLogs = [
  {
    id: "AUDIT-001",
    action: "Asset Created",
    assetId: "AST-001",
    assetName: "Dell Laptop XPS 13",
    user: "John Doe",
    timestamp: "2024-01-15 14:30:00",
    details: "New asset added to inventory",
    ipAddress: "192.168.1.100",
  },
  {
    id: "AUDIT-002",
    action: "Asset Updated",
    assetId: "AST-004",
    assetName: "Forklift Model X200",
    user: "Mike Johnson",
    timestamp: "2024-01-15 12:15:00",
    details: "Asset status changed to maintenance",
    ipAddress: "192.168.1.105",
  },
  {
    id: "AUDIT-003",
    action: "User Login",
    assetId: "-",
    assetName: "-",
    user: "Jane Smith",
    timestamp: "2024-01-15 09:00:00",
    details: "User logged into system",
    ipAddress: "192.168.1.102",
  },
  {
    id: "AUDIT-004",
    action: "Asset Transferred",
    assetId: "AST-002",
    assetName: "iPhone 15 Pro",
    user: "Sarah Wilson",
    timestamp: "2024-01-14 16:45:00",
    details: "Asset transferred from IT Storage to Office Floor 1",
    ipAddress: "192.168.1.103",
  },
]

const actionColors = {
  "Asset Created": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  "Asset Updated": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  "Asset Transferred": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  "User Login": "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
  "Asset Deleted": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
}

export default function AuditLogs() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Audit Logs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track all system activities and changes</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Activities", value: "1,247", icon: FileText, color: "blue" },
          { label: "Today's Activities", value: "24", icon: Calendar, color: "green" },
          { label: "Active Users", value: "12", icon: User, color: "purple" },
          { label: "Failed Logins", value: "3", icon: User, color: "red" },
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

      {/* Audit Logs Table */}
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
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockAuditLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        actionColors[log.action as keyof typeof actionColors]
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.assetId !== "-" ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{log.assetName}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{log.assetId}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{log.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {log.ipAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {log.details}
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
