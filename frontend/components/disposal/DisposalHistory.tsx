"use client"

import { motion } from "framer-motion"
import { History } from "lucide-react"

const mockDisposalHistory = [
  {
    id: "DISP-001",
    assetId: "AST-010",
    assetName: "Old Desktop Computer",
    reason: "End of Life",
    method: "Recycle",
    requestedBy: "John Doe",
    approvedBy: "Jane Smith",
    requestDate: "2024-01-10",
    disposalDate: "2024-01-15",
    status: "Completed",
    cost: 0,
    vendor: "EcoRecycle Solutions",
  },
  {
    id: "DISP-002",
    assetId: "AST-011",
    assetName: "Damaged Printer",
    reason: "Damaged Beyond Repair",
    method: "Secure Destruction",
    requestedBy: "Mike Johnson",
    approvedBy: "Sarah Wilson",
    requestDate: "2024-01-05",
    disposalDate: "2024-01-08",
    status: "Completed",
    cost: 150,
    vendor: "SecureDestroy Inc",
  },
  {
    id: "DISP-003",
    assetId: "AST-012",
    assetName: "Old Office Chairs (5x)",
    reason: "Obsolete",
    method: "Donate",
    requestedBy: "HR Department",
    approvedBy: "Jane Smith",
    requestDate: "2023-12-20",
    disposalDate: "2023-12-28",
    status: "Completed",
    cost: 0,
    vendor: "Local Charity",
  },
]

const statusColors = {
  Completed: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
}

const methodColors = {
  Recycle: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  Donate: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  Sell: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  "Secure Destruction": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  "Return to Vendor": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
}

export default function DisposalHistory() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
          <History className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Disposal History</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track completed asset disposals and write-offs</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Requested By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Disposal Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vendor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockDisposalHistory.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.assetName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.assetId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {item.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        methodColors[item.method as keyof typeof methodColors]
                      }`}
                    >
                      {item.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {item.requestedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(item.disposalDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {item.cost > 0 ? `$${item.cost}` : "Free"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        statusColors[item.status as keyof typeof statusColors]
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {item.vendor}
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
