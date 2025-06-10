"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRightLeft, MapPin, Building, User, Clock, AlertTriangle, Search } from "lucide-react"
import { toast } from "sonner"

const allocatedAssets = [
  {
    id: "AST-001",
    name: "Dell Laptop XPS 13",
    category: "IT Equipment",
    currentBranch: "HO-NY",
    currentDepartment: "IT-HO",
    assignedTo: "John Smith",
    condition: "Excellent",
    value: "$1,200",
    allocationDate: "2024-01-15",
  },
  {
    id: "AST-002",
    name: "iPhone 15 Pro",
    category: "IT Equipment",
    currentBranch: "BO-CA",
    currentDepartment: "IT-CA",
    assignedTo: "Sarah Johnson",
    condition: "Good",
    value: "$999",
    allocationDate: "2024-01-10",
  },
  {
    id: "AST-003",
    name: "Office Chair Premium",
    category: "Furniture",
    currentBranch: "HO-NY",
    currentDepartment: "HR-HO",
    assignedTo: "Mike Davis",
    condition: "Good",
    value: "$350",
    allocationDate: "2024-01-08",
  },
]

const branches = {
  "HO-NY": "Head Office - New York",
  "BO-CA": "Branch Office - California",
  "WH-TX": "Warehouse - Texas",
  "RO-FL": "Regional Office - Florida",
}

const departments = {
  "HO-NY": [
    { id: "IT-HO", name: "Information Technology" },
    { id: "HR-HO", name: "Human Resources" },
    { id: "FIN-HO", name: "Finance" },
    { id: "MKT-HO", name: "Marketing" },
  ],
  "BO-CA": [
    { id: "IT-CA", name: "Information Technology" },
    { id: "HR-CA", name: "Human Resources" },
    { id: "OPS-CA", name: "Operations" },
  ],
  "WH-TX": [
    { id: "WH-TX", name: "Warehouse Operations" },
    { id: "LOG-TX", name: "Logistics" },
  ],
  "RO-FL": [
    { id: "HR-FL", name: "Human Resources" },
    { id: "OPS-FL", name: "Operations" },
  ],
}

const transferTypes = [
  { id: "inter-dept", name: "Inter-Department Transfer", approval: "Department Head", duration: "1-3 days" },
  { id: "inter-branch", name: "Inter-Branch Transfer", approval: "Branch Manager", duration: "3-7 days" },
  { id: "revoke", name: "Revoke to Central Pool", approval: "Department Head", duration: "1-2 days" },
]

export default function AssetTransfer() {
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [transferType, setTransferType] = useState("")
  const [targetBranch, setTargetBranch] = useState("")
  const [targetDepartment, setTargetDepartment] = useState("")
  const [newAssignee, setNewAssignee] = useState("")
  const [transferReason, setTransferReason] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isTransferring, setIsTransferring] = useState(false)

  const filteredAssets = allocatedAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleTransfer = async () => {
    if (!selectedAsset || !transferType) {
      toast.error("Please select an asset and transfer type")
      return
    }

    if (transferType !== "revoke" && (!targetBranch || !targetDepartment)) {
      toast.error("Please select target branch and department")
      return
    }

    setIsTransferring(true)

    // Simulate API call
    setTimeout(() => {
      const transferTypeObj = transferTypes.find((t) => t.id === transferType)

      if (transferType === "revoke") {
        toast.success(`Asset ${selectedAsset.id} revoked to central pool successfully`)
      } else {
        toast.success(`Transfer request submitted. Approval required from ${transferTypeObj?.approval}`)
      }

      // Reset form
      setSelectedAsset(null)
      setTransferType("")
      setTargetBranch("")
      setTargetDepartment("")
      setNewAssignee("")
      setTransferReason("")
      setIsTransferring(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
          <ArrowRightLeft className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Asset Transfer</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Transfer assets between departments, branches, or revoke to central pool
          </p>
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Select Allocated Asset</h3>

          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search allocated assets..."
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
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{asset.name}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{asset.id}</span>
                </div>

                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} />
                    <span>{branches[asset.currentBranch as keyof typeof branches]}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building size={14} />
                    <span>
                      {
                        departments[asset.currentBranch as keyof typeof departments]?.find(
                          (d) => d.id === asset.currentDepartment,
                        )?.name
                      }
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User size={14} />
                    <span>Assigned to: {asset.assignedTo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transfer Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Transfer Details</h3>

          {selectedAsset && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Selected Asset</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                {selectedAsset.name} ({selectedAsset.id})
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                Currently at: {branches[selectedAsset.currentBranch as keyof typeof branches]} -{" "}
                {
                  departments[selectedAsset.currentBranch as keyof typeof departments]?.find(
                    (d) => d.id === selectedAsset.currentDepartment,
                  )?.name
                }
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transfer Type *</label>
              <select
                value={transferType}
                onChange={(e) => {
                  setTransferType(e.target.value)
                  setTargetBranch("")
                  setTargetDepartment("")
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="">Select Transfer Type</option>
                {transferTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>

              {transferType && (
                <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm text-blue-700 dark:text-blue-300">
                  <div className="flex items-center space-x-2">
                    <Clock size={14} />
                    <span>Approval: {transferTypes.find((t) => t.id === transferType)?.approval}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <AlertTriangle size={14} />
                    <span>Duration: {transferTypes.find((t) => t.id === transferType)?.duration}</span>
                  </div>
                </div>
              )}
            </div>

            {transferType && transferType !== "revoke" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Branch *
                  </label>
                  <select
                    value={targetBranch}
                    onChange={(e) => {
                      setTargetBranch(e.target.value)
                      setTargetDepartment("")
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  >
                    <option value="">Select Target Branch</option>
                    {Object.entries(branches).map(([id, name]) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target Department *
                  </label>
                  <select
                    value={targetDepartment}
                    onChange={(e) => setTargetDepartment(e.target.value)}
                    disabled={!targetBranch}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 disabled:opacity-50"
                  >
                    <option value="">Select Target Department</option>
                    {targetBranch &&
                      departments[targetBranch as keyof typeof departments]?.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    New Assignee
                  </label>
                  <input
                    type="text"
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    placeholder="Employee name (optional)"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Transfer Reason *
              </label>
              <textarea
                value={transferReason}
                onChange={(e) => setTransferReason(e.target.value)}
                placeholder="Reason for transfer..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            <button
              onClick={handleTransfer}
              disabled={!selectedAsset || !transferType || !transferReason || isTransferring}
              className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isTransferring ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing Transfer...
                </>
              ) : (
                <>
                  <ArrowRightLeft size={16} className="mr-2" />
                  {transferType === "revoke" ? "Revoke Asset" : "Submit Transfer Request"}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
