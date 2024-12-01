'use client'

import { useState } from 'react'
import Header from '../components/Header'
import ImageUploadForm from '../components/ImageUploadForm'
import ParameterForm from '../components/ParameterForm'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Home() {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto p-6 md:p-8">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Label htmlFor="mode-toggle" className={`text-sm ${!isAdvancedMode ? 'font-bold' : ''}`}>Normal Mode</Label>
          <Switch
            id="mode-toggle"
            checked={isAdvancedMode}
            onCheckedChange={setIsAdvancedMode}
          />
          <Label htmlFor="mode-toggle" className={`text-sm ${isAdvancedMode ? 'font-bold' : ''}`}>Advanced Mode</Label>
        </div>
        {isAdvancedMode ? <ParameterForm /> : <ImageUploadForm />}
      </main>
    </div>
  )
}

