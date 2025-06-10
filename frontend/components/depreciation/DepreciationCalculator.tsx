"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, DollarSign, Calendar, TrendingDown } from "lucide-react"

export default function DepreciationCalculator() {
  const [formData, setFormData] = useState({
    assetValue: "",
    salvageValue: "",
    usefulLife: "",
    method: "straight-line",
    purchaseDate: "",
  })

  const [result, setResult] = useState<{
    annualDepreciation: number
    monthlyDepreciation: number
    currentValue: number
    totalDepreciation: number
  } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculateDepreciation = () => {
    const assetValue = Number.parseFloat(formData.assetValue)
    const salvageValue = Number.parseFloat(formData.salvageValue)
    const usefulLife = Number.parseFloat(formData.usefulLife)

    if (assetValue && usefulLife) {
      const depreciableAmount = assetValue - (salvageValue || 0)
      const annualDepreciation = depreciableAmount / usefulLife
      const monthlyDepreciation = annualDepreciation / 12

      // Calculate current value based on time elapsed
      const purchaseDate = new Date(formData.purchaseDate)
      const currentDate = new Date()
      const yearsElapsed = (currentDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
      const totalDepreciation = Math.min(annualDepreciation * yearsElapsed, depreciableAmount)
      const currentValue = assetValue - totalDepreciation

      setResult({
        annualDepreciation,
        monthlyDepreciation,
        currentValue: Math.max(currentValue, salvageValue || 0),
        totalDepreciation,
      })
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
          <Calculator className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Depreciation Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Calculate asset depreciation values</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Asset Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Asset Value ($)</label>
              <input
                type="number"
                name="assetValue"
                value={formData.assetValue}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter asset value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Salvage Value ($)
              </label>
              <input
                type="number"
                name="salvageValue"
                value={formData.salvageValue}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter salvage value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Useful Life (years)
              </label>
              <input
                type="number"
                name="usefulLife"
                value={formData.usefulLife}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="Enter useful life"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Purchase Date</label>
              <input
                type="date"
                name="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Depreciation Method
              </label>
              <select
                name="method"
                value={formData.method}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="straight-line">Straight Line</option>
                <option value="declining-balance">Declining Balance</option>
                <option value="sum-of-years">Sum of Years</option>
              </select>
            </div>
            <button
              onClick={calculateDepreciation}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Calculate Depreciation
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Calculation Results</h3>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Annual Depreciation</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ${result.annualDepreciation.toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">Monthly Depreciation</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ${result.monthlyDepreciation.toFixed(2)}
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Current Value</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">${result.currentValue.toFixed(2)}</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calculator className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Total Depreciation</span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  ${result.totalDepreciation.toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calculator className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Enter asset details and click calculate to see results</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
