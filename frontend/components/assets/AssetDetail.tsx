"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Package, MapPin, User, Calendar, DollarSign, Settings, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

const assetData = {
  id: "AST-001",
  name: "Dell Laptop XPS 13",
  category: "IT Equipment",
  status: "Assigned",
  assignedTo: "John Doe",
  location: "Office Floor 2",
  purchaseDate: "2023-01-15",
  purchasePrice: 1200,
  currentValue: 800,
  condition: "Good",
  serialNumber: "DL123456789",
  model: "XPS 13 9320",
  manufacturer: "Dell",
  warranty: "24 months",
  description: "High-performance laptop for development work",
  specifications: {
    processor: "Intel Core i7-1165G7",
    memory: "16GB DDR4",
    storage: "512GB SSD",
    display: "13.3-inch FHD",
    os: "Windows 11 Pro",
  },
  maintenanceHistory: [
    {
      date: "2024-01-10",
      type: "Corrective",
      description: "Screen replacement",
      cost: 250,
      technician: "John Smith",
    },
    {
      date: "2023-07-15",
      type: "Preventive",
      description: "Software update and cleaning",
      cost: 50,
      technician: "Jane Doe",
    },
  ],
}

export default function AssetDetail() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <button
          onClick={() => router.back()}
          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{assetData.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{assetData.id}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Basic Info */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Asset Name</label>
                  <p className="text-gray-900 dark:text-gray-100">{assetData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Category</label>
                  <p className="text-gray-900 dark:text-gray-100">{assetData.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Serial Number
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{assetData.serialNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Model</label>
                  <p className="text-gray-900 dark:text-gray-100">{assetData.model}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Manufacturer
                  </label>
                  <p className="text-gray-900 dark:text-gray-100">{assetData.manufacturer}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Status</label>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    {assetData.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Condition</label>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{assetData.condition}</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Warranty</label>
                  <p className="text-gray-900 dark:text-gray-100">{assetData.warranty}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(assetData.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-gray-100">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance History */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Maintenance History</h3>
            <div className="space-y-4">
              {assetData.maintenanceHistory.map((maintenance, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        maintenance.type === "Preventive"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                          : "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                      }`}
                    >
                      {maintenance.type}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(maintenance.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-gray-100 mb-2">{maintenance.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Technician: {maintenance.technician}</span>
                    <span>Cost: ${maintenance.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quick Stats */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Purchase Price</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">${assetData.purchasePrice}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current Value</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">${assetData.currentValue}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Purchase Date</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {new Date(assetData.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Info */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Assignment</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Assigned To</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{assetData.assignedTo}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <MapPin className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{assetData.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                <span>Edit Asset</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                <FileText className="w-4 h-4" />
                <span>Create Work Order</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-left text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
                <User className="w-4 h-4" />
                <span>Transfer Asset</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
