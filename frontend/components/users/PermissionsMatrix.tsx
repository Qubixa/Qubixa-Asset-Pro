"use client"

import { motion } from "framer-motion"
import { UserCheck, Check, X } from "lucide-react"

const roles = ["Admin", "Manager", "Employee", "Viewer"]
const permissions = [
  "View Assets",
  "Add Assets",
  "Edit Assets",
  "Delete Assets",
  "View Reports",
  "Generate Reports",
  "Manage Users",
  "System Settings",
  "Maintenance",
  "Transfers",
]

const permissionMatrix = {
  Admin: [true, true, true, true, true, true, true, true, true, true],
  Manager: [true, true, true, false, true, true, false, false, true, true],
  Employee: [true, false, false, false, true, false, false, false, true, false],
  Viewer: [true, false, false, false, true, false, false, false, false, false],
}

export default function PermissionsMatrix() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
          <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Permissions Matrix</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage role-based permissions</p>
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
                  Permission
                </th>
                {roles.map((role) => (
                  <th
                    key={role}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {permissions.map((permission, permIndex) => (
                <motion.tr
                  key={permission}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: permIndex * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {permission}
                  </td>
                  {roles.map((role, roleIndex) => (
                    <td key={role} className="px-6 py-4 whitespace-nowrap text-center">
                      {permissionMatrix[role as keyof typeof permissionMatrix][permIndex] ? (
                        <Check className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-600 dark:text-red-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
