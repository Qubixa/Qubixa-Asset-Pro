"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building, MapPin, Package, User, Search, Eye, ArrowRightLeft, Download, X } from "lucide-react"
import { toast } from "sonner"

const branches = [
  { id: "HO-NY", name: "Head Office - New York", totalAssets: 97, totalValue: "$145,600" },
  { id: "BO-CA", name: "Branch Office - California", totalAssets: 77, totalValue: "$112,300" },
  { id: "WH-TX", name: "Warehouse - Texas", totalAssets: 90, totalValue: "$234,500" },
  { id: "RO-FL", name: "Regional Office - Florida", totalAssets: 25, totalValue: "$38,900" },
]

const departmentAssets = {
  "HO-NY": [
    {
      department: "Information Technology",
      head: "John Smith",
      assets: [
        {
          id: "AST-001",
          name: "Dell Laptop XPS 13",
          assignedTo: "Alice Johnson",
          condition: "Excellent",
          value: "$1,200",
        },
        { id: "AST-002", name: "MacBook Pro 16", assignedTo: "Bob Wilson", condition: "Good", value: "$2,400" },
        { id: "AST-003", name: "iPhone 15 Pro", assignedTo: "Carol Davis", condition: "Excellent", value: "$999" },
        { id: "AST-004", name: "iPad Pro 12.9", assignedTo: "David Brown", condition: "Good", value: "$1,099" },
      ],
    },
    {
      department: "Human Resources",
      head: "Sarah Johnson",
      assets: [
        { id: "AST-005", name: "Office Chair Premium", assignedTo: "Emma Wilson", condition: "Good", value: "$350" },
        { id: "AST-006", name: "Standing Desk", assignedTo: "Frank Miller", condition: "Excellent", value: "$800" },
        { id: "AST-007", name: "HP Printer LaserJet", assignedTo: "Department", condition: "Good", value: "$450" },
      ],
    },
    {
      department: "Finance",
      head: "Mike Davis",
      assets: [
        { id: "AST-008", name: "Dell Monitor 27", assignedTo: "Grace Lee", condition: "Excellent", value: "$320" },
        { id: "AST-009", name: "Lenovo ThinkPad", assignedTo: "Henry Chen", condition: "Good", value: "$1,100" },
        {
          id: "AST-010",
          name: "Financial Calculator",
          assignedTo: "Ivy Rodriguez",
          condition: "Excellent",
          value: "$150",
        },
      ],
    },
  ],
  "BO-CA": [
    {
      department: "Information Technology",
      head: "David Wilson",
      assets: [
        { id: "AST-011", name: "iMac 24", assignedTo: "Jack Thompson", condition: "Excellent", value: "$1,699" },
        { id: "AST-012", name: "Surface Pro 9", assignedTo: "Kate Anderson", condition: "Good", value: "$1,299" },
        { id: "AST-013", name: "Network Switch", assignedTo: "Department", condition: "Excellent", value: "$890" },
      ],
    },
    {
      department: "Operations",
      head: "Tom Anderson",
      assets: [
        {
          id: "AST-014",
          name: "Forklift Electric",
          assignedTo: "Operations Team",
          condition: "Good",
          value: "$15,000",
        },
        { id: "AST-015", name: "Warehouse Scanner", assignedTo: "Lisa Garcia", condition: "Excellent", value: "$450" },
      ],
    },
  ],
}

export default function DepartmentAssetView() {
  const [selectedBranch, setSelectedBranch] = useState("HO-NY")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview")

  const currentBranchData = departmentAssets[selectedBranch as keyof typeof departmentAssets] || []

  const filteredDepartments = currentBranchData.filter(
    (dept) =>
      dept.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.assets.some(
        (asset) =>
          asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  )

  const handleExportReport = () => {
    toast.success("Department asset report exported successfully")
  }

  const handleTransferAsset = (assetId: string) => {
    toast.info(`Initiating transfer for asset ${assetId}`)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Building className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Department Asset View</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track assets allocated to departments across branches
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("overview")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === "overview"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setViewMode("detailed")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === "detailed"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              Detailed
            </button>
          </div>

          <button
            onClick={handleExportReport}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={16} className="mr-2" />
            Export Report
          </button>
        </div>
      </motion.div>

      {/* Branch Selection & Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Branch</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            >
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search departments or assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Branch Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              onClick={() => setSelectedBranch(branch.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                selectedBranch === branch.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
                <h3 className="font-medium text-gray-900 dark:text-gray-100">{branch.name}</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Assets:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{branch.totalAssets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Value:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{branch.totalValue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Department Assets */}
      {viewMode === "overview" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDepartments.map((dept, index) => (
            <motion.div
              key={dept.department}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <Building size={16} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{dept.department}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Head: {dept.head}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDepartment(selectedDepartment === dept.department ? null : dept.department)}
                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Eye size={16} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Assets:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{dept.assets.length}</span>
                </div>

                <div className="space-y-2">
                  {dept.assets.slice(0, 3).map((asset) => (
                    <div
                      key={asset.id}
                      className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <Package size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-900 dark:text-gray-100">{asset.name}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{asset.value}</span>
                    </div>
                  ))}

                  {dept.assets.length > 3 && (
                    <div className="text-center">
                      <button
                        onClick={() => setSelectedDepartment(dept.department)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        +{dept.assets.length - 3} more assets
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDepartments.map((dept) =>
                  dept.assets.map((asset, index) => (
                    <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                              <Package size={16} className="text-blue-600 dark:text-blue-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{asset.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{asset.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">{dept.department}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Head: {dept.head}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User size={14} className="text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 dark:text-gray-100">{asset.assignedTo}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            asset.condition === "Excellent"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                              : asset.condition === "Good"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                          }`}
                        >
                          {asset.condition}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {asset.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleTransferAsset(asset.id)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <ArrowRightLeft size={14} />
                          </button>
                          <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                            <Eye size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )),
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Department Detail Modal */}
      {selectedDepartment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedDepartment(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-[#1e293b] rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {selectedDepartment} - Asset Details
                </h3>
                <button
                  onClick={() => setSelectedDepartment(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {currentBranchData
                .find((dept) => dept.department === selectedDepartment)
                ?.assets.map((asset) => (
                  <div key={asset.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Package size={20} className="text-blue-600 dark:text-blue-400" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{asset.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{asset.id}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleTransferAsset(asset.id)}
                        className="inline-flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <ArrowRightLeft size={14} className="mr-1" />
                        Transfer
                      </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Assigned To:</span>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{asset.assignedTo}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Condition:</span>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{asset.condition}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Value:</span>
                        <p className="font-medium text-gray-900 dark:text-gray-100">{asset.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
