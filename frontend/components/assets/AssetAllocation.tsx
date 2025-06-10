"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Package, MapPin, ArrowRight, Search } from "lucide-react"
import { toast } from "sonner"

const branches = [
  { id: "HO-NY", name: "Head Office - New York", address: "123 Main St, NY" },
  { id: "BO-CA", name: "Branch Office - California", address: "456 Oak Ave, CA" },
  { id: "WH-TX", name: "Warehouse - Texas", address: "789 Industrial Blvd, TX" },
  { id: "RO-FL", name: "Regional Office - Florida", address: "321 Beach Rd, FL" },
]

const departments = {
  "HO-NY": [
    { id: "IT-HO", name: "Information Technology", head: "John Smith", assets: 45 },
    { id: "HR-HO", name: "Human Resources", head: "Sarah Johnson", assets: 12 },
    { id: "FIN-HO", name: "Finance", head: "Mike Davis", assets: 18 },
    { id: "MKT-HO", name: "Marketing", head: "Lisa Chen", assets: 22 },
  ],
  "BO-CA": [
    { id: "IT-CA", name: "Information Technology", head: "David Wilson", assets: 38 },
    { id: "HR-CA", name: "Human Resources", head: "Emma Brown", assets: 8 },
    { id: "OPS-CA", name: "Operations", head: "Tom Anderson", assets: 31 },
  ],
  "WH-TX": [
    { id: "WH-TX", name: "Warehouse Operations", head: "Carlos Rodriguez", assets: 67 },
    { id: "LOG-TX", name: "Logistics", head: "Maria Garcia", assets: 23 },
  ],
  "RO-FL": [
    { id: "HR-FL", name: "Human Resources", head: "Jennifer Lee", assets: 6 },
    { id: "OPS-FL", name: "Operations", head: "Robert Taylor", assets: 19 },
  ],
}

const mockAssets = [
  {
    id: "AST-001",
    name: "Dell Laptop XPS 13",
    category: "IT Equipment",
    status: "Available",
    condition: "Excellent",
    value: "$1,200",
    location: "Central Storage",
    serialNumber: "DL123456789",
  },
  {
    id: "AST-002",
    name: "iPhone 15 Pro",
    category: "IT Equipment",
    status: "Available",
    condition: "Excellent",
    value: "$999",
    location: "Central Storage",
    serialNumber: "IP987654321",
  },
  {
    id: "AST-003",
    name: "Office Chair Premium",
    category: "Furniture",
    status: "Available",
    condition: "Good",
    value: "$350",
    location: "Central Storage",
    serialNumber: "OC456789123",
  },
]

export default function AssetAllocation() {
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [selectedBranch, setSelectedBranch] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
  const [allocationReason, setAllocationReason] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAllocating, setIsAllocating] = useState(false)

  const filteredAssets = mockAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAllocate = async () => {
    if (!selectedAsset || !selectedBranch || !selectedDepartment) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsAllocating(true)

    // Simulate API call
    setTimeout(() => {
      toast.success(`Asset ${selectedAsset.id} allocated successfully to ${selectedDepartment} at ${selectedBranch}`)
      setSelectedAsset(null)
      setSelectedBranch("")
      setSelectedDepartment("")
      setAssignedTo("")
      setAllocationReason("")
      setIsAllocating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
          <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Asset Allocation</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Allocate assets to branches and departments</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asset Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Select Asset</h3>

          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => setSelectedAsset(asset)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAsset?.id === asset.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{asset.name}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{asset.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>Category: {asset.category}</span>
                  <span>Value: {asset.value}</span>
                  <span>Condition: {asset.condition}</span>
                  <span>Status: {asset.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Allocation Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Allocation Details</h3>

          {selectedAsset && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Selected Asset</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {selectedAsset.name} ({selectedAsset.id})
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Branch *</label>
              <select
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value)
                  setSelectedDepartment("") // Reset department when branch changes
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department *</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                disabled={!selectedBranch}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 disabled:opacity-50"
              >
                <option value="">Select Department</option>
                {selectedBranch &&
                  departments[selectedBranch as keyof typeof departments]?.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} (Head: {dept.head})
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assigned To</label>
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Employee name (optional)"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Allocation Reason
              </label>
              <textarea
                value={allocationReason}
                onChange={(e) => setAllocationReason(e.target.value)}
                placeholder="Reason for allocation..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            <button
              onClick={handleAllocate}
              disabled={!selectedAsset || !selectedBranch || !selectedDepartment || isAllocating}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isAllocating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Allocating...
                </>
              ) : (
                <>
                  <ArrowRight size={16} className="mr-2" />
                  Allocate Asset
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Branch Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Branch & Department Overview</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {branches.map((branch) => (
            <div key={branch.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{branch.name}</h4>
              </div>

              <div className="space-y-2">
                {departments[branch.id as keyof typeof departments]?.map((dept) => (
                  <div key={dept.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{dept.name}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{dept.assets} assets</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
