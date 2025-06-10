"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, Smartphone, SettingsIcon } from "lucide-react"

export default function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const securityOptions = [
    {
      title: "Two-factor Authentication",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis sapiente sunt earum officiis laboriosam ut.",
      action: "Enable",
      enabled: twoFactorEnabled,
      onToggle: () => setTwoFactorEnabled(!twoFactorEnabled),
    },
    {
      title: "Authentication App",
      description: "Google auth app",
      action: "Setup",
      enabled: false,
    },
    {
      title: "Another e-mail",
      description: "E-mail to send verification link",
      action: "Setup",
      enabled: false,
    },
    {
      title: "SMS Recovery",
      description: "Your phone number or something",
      action: "Setup",
      enabled: false,
    },
  ]

  const connectedDevices = [
    {
      name: "iPhone 14",
      location: "London UK, Oct 23 at 1:15 AM",
      icon: Smartphone,
    },
    {
      name: "Macbook Air",
      location: "Gujarat India, Oct 24 at 3:15 AM",
      icon: SettingsIcon,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Security Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your security settings and authentication methods
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Options */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
        >
          <div className="space-y-6">
            {securityOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center justify-between p-6 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{option.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{option.description}</p>
                </div>
                <button
                  onClick={option.onToggle}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                >
                  {option.action}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Connected Devices */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Devices</h3>
            <Shield className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit Rem.
          </p>

          <div className="space-y-4">
            {connectedDevices.map((device, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <device.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{device.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{device.location}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
            Sign out from all devices
          </button>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Need Help?</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit Rem.
            </p>
            <button className="text-orange-500 hover:text-orange-600 text-sm font-medium">Need Help?</button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
