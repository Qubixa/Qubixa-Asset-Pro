"use client"

import { motion } from "framer-motion"
import { ScanLine, Calendar, MapPin } from "lucide-react"

const mockScanLogs = [
  {
    id: "SCAN-001",
    assetId: "AST-001",
    assetName: "Dell Laptop XPS 13",
    tagId: "QR-001",
    tagType: "QR Code",
    location: "Office Floor 2",
    scannedBy: "John Doe",
    scanTime: "2024-01-15 14:30:00",
    scanType: "Check-in",
    notes: "Asset verified at workstation",
  },
  {
    id: "SCAN-002",
    assetId: "AST-004",
    assetName: "Forklift Model X200",
    tagId: "RFID-004",
    tagType: "RFID",
    location: "Warehouse A",
    scannedBy: "Mike Johnson",
    scanTime: "2024-01-15 09:15:00",
    scanType: "Location Update",
    notes: "Moved to maintenance bay",
  },
  {
    id: "SCAN-003",
    assetId: "AST-002",
    assetName: "iPhone 15 Pro",
    tagId: "QR-002",
    tagType: "QR Code",
    location: "IT Storage",
    scannedBy: "Jane Smith",
    scanTime: "2024-01-14 16:45:00",
    scanType: "Check-out",
    notes: "Assigned to new employee",
  },
  {
    id: "SCAN-004",
    assetId: "AST-005",
    assetName: "Company Van",
    tagId: "NFC-005",
    tagType: "NFC",
    location: "Parking Lot",
    scannedBy: "Sarah Wilson",
    scanTime: "2024-01-14 08:30:00",
    scanType: "Check-in",
    notes: "Vehicle returned from delivery",
  },
]

const scanTypeColors = {
  "Check-in": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  "Check-out": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  "Location Update": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  Maintenance: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
}

const tagTypeColors = {
  "QR Code": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  RFID: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
  NFC: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
}

export default function ScanLogs() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <ScanLine className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Asset Scan Logs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Track all asset scanning activities</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Scans Today", value: "24", icon: ScanLine, color: "blue" },
          { label: "Check-ins", value: "12", icon: Calendar, color: "green" },
          { label: "Check-outs", value: "8", icon: Calendar, color: "orange" },
          { label: "Location Updates", value: "4", icon: MapPin, color: "purple" },
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

      {/* Scan Logs Table */}
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
                  Asset
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tag Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Scan Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Scanned By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Scan Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockScanLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{log.assetName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{log.assetId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{log.tagId}</div>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          tagTypeColors[log.tagType as keyof typeof tagTypeColors]
                        }`}
                      >
                        {log.tagType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        scanTypeColors[log.scanType as keyof typeof scanTypeColors]
                      }`}
                    >
                      {log.scanType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {log.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {log.scannedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {new Date(log.scanTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{log.notes}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
