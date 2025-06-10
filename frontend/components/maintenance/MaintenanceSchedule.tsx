"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, AlertTriangle, CheckCircle, Plus, Filter } from "lucide-react"

const mockMaintenanceItems = [
  {
    id: "MNT-001",
    assetName: "Forklift Model X200",
    assetId: "AST-004",
    type: "Preventive",
    priority: "High",
    scheduledDate: "2024-01-15",
    estimatedDuration: "4 hours",
    assignedTo: "John Smith",
    status: "Scheduled",
    description: "Regular maintenance check and oil change",
  },
  {
    id: "MNT-002",
    assetName: "Dell Laptop XPS 13",
    assetId: "AST-001",
    type: "Corrective",
    priority: "Medium",
    scheduledDate: "2024-01-12",
    estimatedDuration: "2 hours",
    assignedTo: "Jane Doe",
    status: "In Progress",
    description: "Fix keyboard issue and update drivers",
  },
  {
    id: "MNT-003",
    assetName: "Company Van",
    assetId: "AST-005",
    type: "Preventive",
    priority: "Low",
    scheduledDate: "2024-01-20",
    estimatedDuration: "6 hours",
    assignedTo: "Mike Johnson",
    status: "Completed",
    description: "Annual service and inspection",
  },
  {
    id: "MNT-004",
    assetName: "Office Printer",
    assetId: "AST-006",
    type: "Emergency",
    priority: "Critical",
    scheduledDate: "2024-01-10",
    estimatedDuration: "1 hour",
    assignedTo: "Sarah Wilson",
    status: "Overdue",
    description: "Paper jam and toner replacement",
  },
]

const statusColors = {
  Scheduled: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  "In Progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  Completed: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  Overdue: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
}

const priorityColors = {
  Low: "text-green-600 dark:text-green-400",
  Medium: "text-yellow-600 dark:text-yellow-400",
  High: "text-orange-600 dark:text-orange-400",
  Critical: "text-red-600 dark:text-red-400",
}

const typeColors = {
  Preventive: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  Corrective: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  Emergency: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
}

export default function MaintenanceSchedule() {
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")

  const statuses = ["All", "Scheduled", "In Progress", "Completed", "Overdue"]
  const priorities = ["All", "Low", "Medium", "High", "Critical"]

  const filteredItems = mockMaintenanceItems.filter((item) => {
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus
    const matchesPriority = selectedPriority === "All" || item.priority === selectedPriority
    return matchesStatus && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Maintenance Schedule</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track maintenance activities</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={16} className="mr-2" />
          Schedule Maintenance
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Scheduled", value: "12", icon: Calendar, color: "blue" },
          { label: "In Progress", value: "3", icon: Clock, color: "yellow" },
          { label: "Overdue", value: "2", icon: AlertTriangle, color: "red" },
          { label: "Completed", value: "8", icon: CheckCircle, color: "green" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                Status: {status}
              </option>
            ))}
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                Priority: {priority}
              </option>
            ))}
          </select>

          <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Filter size={16} className="mr-2" />
            More Filters
          </button>
        </div>
      </motion.div>

      {/* Maintenance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Scheduled Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredItems.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.assetName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.assetId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${typeColors[item.type as keyof typeof typeColors]}`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${priorityColors[item.priority as keyof typeof priorityColors]}`}
                    >
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(item.scheduledDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {item.estimatedDuration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {item.assignedTo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[item.status as keyof typeof statusColors]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                        Edit
                      </button>
                    </div>
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
