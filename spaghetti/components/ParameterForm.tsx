'use client'

import { useState, FormEvent } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ParameterForm() {
  const [params, setParams] = useState({
    length: '',
    width: '',
    height: '',
    material: '',
    loadPosition: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<number | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulate API call
      const response = await fetch('/api/predict-params', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })
      const data = await response.json()
      setPrediction(data.weight)
    } catch (error) {
      console.error('Error predicting weight:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Advanced Mode: Parameter Input</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="length">Bridge Length (cm)</Label>
            <Input
              id="length"
              name="length"
              type="number"
              placeholder="Enter bridge length"
              value={params.length}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="width">Bridge Width (cm)</Label>
            <Input
              id="width"
              name="width"
              type="number"
              placeholder="Enter bridge width"
              value={params.width}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Bridge Height (cm)</Label>
            <Input
              id="height"
              name="height"
              type="number"
              placeholder="Enter bridge height"
              value={params.height}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="material">Material Type</Label>
            <Input
              id="material"
              name="material"
              type="text"
              placeholder="Enter material type"
              value={params.material}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loadPosition">Load Position (%)</Label>
            <Input
              id="loadPosition"
              name="loadPosition"
              type="number"
              placeholder="Enter load position"
              value={params.loadPosition}
              onChange={handleChange}
            />
          </div>
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

