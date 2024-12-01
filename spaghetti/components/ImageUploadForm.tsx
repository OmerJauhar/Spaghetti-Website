'use client'

import { useState, FormEvent } from 'react'
import { Upload, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ImageUploadForm() {
  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<number | null>(null)
  const [showOptionalParams, setShowOptionalParams] = useState(false)
  const [optionalParams, setOptionalParams] = useState({
    param1: '',
    param2: '',
    param3: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!image) {
      alert('Please select an image first.')
      return
    }
    setIsLoading(true)
    try {
      // Simulate API call
      const formData = new FormData()
      formData.append('image', image)
      // Append optional parameters if they are filled
      Object.entries(optionalParams).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })
      const response = await fetch('/api/predict', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      setPrediction(data.weight)
    } catch (error) {
      console.error('Error predicting weight:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOptionalParamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionalParams({
      ...optionalParams,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Normal Mode: Image Upload</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-8">
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 mb-3 text-gray-300" />
              <p className="mb-2 text-sm text-gray-300"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
          {image && (
            <p className="mt-2 text-sm text-gray-400">
              Selected file: {image.name}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full flex justify-between items-center"
            onClick={() => setShowOptionalParams(!showOptionalParams)}
          >
            <span>Optional Parameters</span>
            {showOptionalParams ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>

          {showOptionalParams && (
            <div className="space-y-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <div className="space-y-2">
                <Label htmlFor="param1">Optional Parameter 1</Label>
                <Input
                  id="param1"
                  name="param1"
                  type="text"
                  placeholder="Enter parameter 1"
                  value={optionalParams.param1}
                  onChange={handleOptionalParamChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="param2">Optional Parameter 2</Label>
                <Input
                  id="param2"
                  name="param2"
                  type="text"
                  placeholder="Enter parameter 2"
                  value={optionalParams.param2}
                  onChange={handleOptionalParamChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="param3">Optional Parameter 3</Label>
                <Input
                  id="param3"
                  name="param3"
                  type="text"
                  placeholder="Enter parameter 3"
                  value={optionalParams.param3}
                  onChange={handleOptionalParamChange}
                />
              </div>
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Predicting...' : 'Predict Weight'}
        </Button>
      </form>

      {prediction !== null && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">Prediction Results</h2>
          <p className="text-lg">Predicted weight: <span className="font-bold text-green-400">{prediction} kg</span></p>
        </div>
      )}
    </div>
  )
}

