"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Bell, CreditCard, Shield, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

const settingsTabs = [
  {
    id: "account",
    label: "Account",
    icon: User,
    path: "/account",
    description: "Manage your account information and preferences",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    path: "/notifications",
    description: "Configure your notification preferences",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    path: "/billing",
    description: "Manage your billing information and subscriptions",
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    path: "/security",
    description: "Security settings and two-factor authentication",
  },
]

export default function AccountSettings() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Account Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
        </div>
      </motion.div>

      {/* Settings Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {settingsTabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => router.push(tab.path)}
            className="p-6 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <tab.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{tab.label}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{tab.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Quick Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Quick Settings</h3>
        <div className="space-y-4">
          {[
            {
              title: "Email Notifications",
              description: "Receive email notifications for important updates",
              enabled: true,
            },
            {
              title: "Two-Factor Authentication",
              description: "Add an extra layer of security to your account",
              enabled: false,
            },
            {
              title: "Auto-save Changes",
              description: "Automatically save changes as you make them",
              enabled: true,
            },
          ].map((setting, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">{setting.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  setting.enabled ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    setting.enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
