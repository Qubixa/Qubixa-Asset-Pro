"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { Globe, Clock, Calendar, DollarSign, Save } from "lucide-react"

export default function LocalizationSettings() {
  const [language, setLanguage] = useState("en-US")
  const [timeZone, setTimeZone] = useState("UTC")
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY")
  const [timeFormat, setTimeFormat] = useState("12h")
  const [currency, setCurrency] = useState("USD")
  const [firstDayOfWeek, setFirstDayOfWeek] = useState("sunday")
  const [numberFormat, setNumberFormat] = useState("1,234.56")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)

    toast({
      title: "Saving Changes",
      description: "Updating localization settings...",
      variant: "default",
    })

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Changes Saved",
        description: "Your localization settings have been updated successfully.",
        variant: "default",
      })
    }, 1000)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Localization Settings</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="language">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="language">
            <Globe className="mr-2 h-4 w-4" />
            Language & Region
          </TabsTrigger>
          <TabsTrigger value="datetime">
            <Calendar className="mr-2 h-4 w-4" />
            Date & Time
          </TabsTrigger>
          <TabsTrigger value="numbers">
            <DollarSign className="mr-2 h-4 w-4" />
            Numbers & Currency
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Clock className="mr-2 h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="language" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>Configure your preferred language and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Display Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (United States)</SelectItem>
                      <SelectItem value="en-GB">English (United Kingdom)</SelectItem>
                      <SelectItem value="es-ES">Spanish (Spain)</SelectItem>
                      <SelectItem value="fr-FR">French (France)</SelectItem>
                      <SelectItem value="de-DE">German (Germany)</SelectItem>
                      <SelectItem value="ja-JP">Japanese (Japan)</SelectItem>
                      <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select defaultValue="us">
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="eu">European Union</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="cn">China</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Select value={timeZone} onValueChange={setTimeZone}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                    <SelectItem value="MST">MST (Mountain Standard Time)</SelectItem>
                    <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                    <SelectItem value="GMT">GMT (Greenwich Mean Time)</SelectItem>
                    <SelectItem value="CET">CET (Central European Time)</SelectItem>
                    <SelectItem value="JST">JST (Japan Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datetime" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Date & Time Format</CardTitle>
              <CardDescription>Configure how dates and times are displayed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Date Format</Label>
                <RadioGroup
                  value={dateFormat}
                  onValueChange={setDateFormat}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MM/DD/YYYY" id="date-format-1" />
                    <Label htmlFor="date-format-1">MM/DD/YYYY (06/04/2025)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="DD/MM/YYYY" id="date-format-2" />
                    <Label htmlFor="date-format-2">DD/MM/YYYY (04/06/2025)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="YYYY-MM-DD" id="date-format-3" />
                    <Label htmlFor="date-format-3">YYYY-MM-DD (2025-06-04)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MMM DD, YYYY" id="date-format-4" />
                    <Label htmlFor="date-format-4">MMM DD, YYYY (Jun 04, 2025)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>Time Format</Label>
                <RadioGroup
                  value={timeFormat}
                  onValueChange={setTimeFormat}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="12h" id="time-format-1" />
                    <Label htmlFor="time-format-1">12-hour (2:08 PM)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="24h" id="time-format-2" />
                    <Label htmlFor="time-format-2">24-hour (14:08)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <Label>First Day of Week</Label>
                <RadioGroup
                  value={firstDayOfWeek}
                  onValueChange={setFirstDayOfWeek}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sunday" id="week-start-1" />
                    <Label htmlFor="week-start-1">Sunday</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monday" id="week-start-2" />
                    <Label htmlFor="week-start-2">Monday</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="numbers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Numbers & Currency</CardTitle>
              <CardDescription>Configure how numbers and currency values are displayed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Number Format</Label>
                <RadioGroup
                  value={numberFormat}
                  onValueChange={setNumberFormat}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1,234.56" id="number-format-1" />
                    <Label htmlFor="number-format-1">1,234.56 (comma as thousands separator)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1.234,56" id="number-format-2" />
                    <Label htmlFor="number-format-2">1.234,56 (period as thousands separator)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">EUR - Euro (€)</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound (£)</SelectItem>
                    <SelectItem value="JPY">JPY - Japanese Yen (¥)</SelectItem>
                    <SelectItem value="CAD">CAD - Canadian Dollar (C$)</SelectItem>
                    <SelectItem value="AUD">AUD - Australian Dollar (A$)</SelectItem>
                    <SelectItem value="CNY">CNY - Chinese Yuan (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Currency Display</Label>
                <RadioGroup defaultValue="symbol" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="symbol" id="currency-display-1" />
                    <Label htmlFor="currency-display-1">Symbol ($123.45)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="code" id="currency-display-2" />
                    <Label htmlFor="currency-display-2">Code (USD 123.45)</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure additional localization preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-detect" />
                  <Label htmlFor="auto-detect">Auto-detect locale from browser</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="use-24h" />
                  <Label htmlFor="use-24h">Use 24-hour time format for all users</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="show-timezone" />
                  <Label htmlFor="show-timezone">Show timezone with timestamps</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-separator">Custom Date Separator</Label>
                <Input id="date-separator" placeholder="/" className="max-w-xs" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="decimal-places">Default Decimal Places</Label>
                <Select defaultValue="2">
                  <SelectTrigger id="decimal-places" className="max-w-xs">
                    <SelectValue placeholder="Select decimal places" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 (1234)</SelectItem>
                    <SelectItem value="1">1 (1234.5)</SelectItem>
                    <SelectItem value="2">2 (1234.56)</SelectItem>
                    <SelectItem value="3">3 (1234.567)</SelectItem>
                    <SelectItem value="4">4 (1234.5678)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
