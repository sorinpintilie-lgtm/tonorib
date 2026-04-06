'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, ChevronRight, Upload, X, Image as ImageIcon,
  Fish, DollarSign, Package, Truck, CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categories, deliveryRegions, speciesOptions } from '@/lib/mock-data';

const steps = [
  { id: 1, name: 'Basic Info', icon: Fish },
  { id: 2, name: 'Price & Stock', icon: DollarSign },
  { id: 3, name: 'Delivery', icon: Truck },
  { id: 4, name: 'Review', icon: CheckCircle },
];

export default function AddProductPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    species: '',
    category: '',
    description: '',
    // Step 2
    pricePerKg: '',
    stockKg: '',
    minOrderKg: '',
    freshnessDate: '',
    // Step 3
    deliveryRegions: [] as string[],
    origin: '',
    // Step 4
    images: [] as string[],
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleDeliveryRegion = (region: string) => {
    setFormData(prev => ({
      ...prev,
      deliveryRegions: prev.deliveryRegions.includes(region)
        ? prev.deliveryRegions.filter(r => r !== region)
        : [...prev.deliveryRegions, region]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.species && formData.category && formData.description;
      case 2:
        return formData.pricePerKg && formData.stockKg && formData.minOrderKg;
      case 3:
        return formData.deliveryRegions.length > 0 && formData.origin;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    console.log('Submitting product:', formData);
    router.push('/dashboard/products');
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/products" className="p-2 hover:bg-seafoam rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate" />
        </Link>
        <div>
          <h1 className="font-manrope font-bold text-2xl text-slate mb-1">Add New Product</h1>
          <p className="text-slate-500">Fill in your product details</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="card mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-3 ${currentStep >= step.id ? 'text-ocean' : 'text-slate-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep > step.id 
                      ? 'bg-fresh text-white' 
                      : currentStep === step.id 
                        ? 'bg-ocean text-white'
                        : 'bg-seafoam'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="hidden md:block font-medium text-sm">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 lg:w-24 h-0.5 mx-2 ${currentStep > step.id ? 'bg-fresh' : 'bg-seafoam'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Steps */}
      <div className="card">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="p-6">
            <h2 className="font-manrope font-semibold text-lg text-slate mb-6">Basic Information</h2>
            <div className="space-y-6">
              <Input
                label="Product Name"
                placeholder="e.g. Rainbow Trout - Fresh"
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
              />
              
              <div>
                <label className="block text-sm font-medium text-slate mb-2">Fish Species</label>
                <select
                  value={formData.species}
                  onChange={(e) => updateFormData('species', e.target.value)}
                  className="w-full px-4 py-3 border border-silver rounded-input bg-white"
                >
                  <option value="">Select species</option>
                  {speciesOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate mb-2">Category</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFormData('category', cat.id)}
                      className={`p-4 border rounded-card text-left transition-colors ${
                        formData.category === cat.id
                          ? 'border-ocean bg-ocean-50 text-ocean'
                          : 'border-silver hover:border-teal'
                      }`}
                    >
                      <span className="font-medium">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate mb-2">Product Description</label>
                <textarea
                  placeholder="Describe your product, farming method, taste..."
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-silver rounded-input bg-white resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Price & Stock */}
        {currentStep === 2 && (
          <div className="p-6">
            <h2 className="font-manrope font-semibold text-lg text-slate mb-6">Price and Stock</h2>
            <div className="space-y-6">
              <Input
                label="Price per kg (€)"
                type="number"
                step="0.01"
                placeholder="e.g. 18.50"
                value={formData.pricePerKg}
                onChange={(e) => updateFormData('pricePerKg', e.target.value)}
              />

              <Input
                label="Stock (kg)"
                type="number"
                placeholder="e.g. 100"
                value={formData.stockKg}
                onChange={(e) => updateFormData('stockKg', e.target.value)}
              />

              <Input
                label="Minimum Order (kg)"
                type="number"
                placeholder="e.g. 5"
                value={formData.minOrderKg}
                onChange={(e) => updateFormData('minOrderKg', e.target.value)}
              />

              <Input
                label="Freshness / Harvest Date"
                type="date"
                value={formData.freshnessDate}
                onChange={(e) => updateFormData('freshnessDate', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Step 3: Delivery */}
        {currentStep === 3 && (
          <div className="p-6">
            <h2 className="font-manrope font-semibold text-lg text-slate mb-6">Delivery</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate mb-2">Delivery Regions</label>
                <p className="text-sm text-slate-500 mb-3">Select regions you can deliver to</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                  {deliveryRegions.map((region) => (
                    <button
                      key={region}
                      onClick={() => toggleDeliveryRegion(region)}
                      className={`p-3 border rounded-lg text-left text-sm transition-colors ${
                        formData.deliveryRegions.includes(region)
                          ? 'border-ocean bg-ocean-50 text-ocean'
                          : 'border-silver hover:border-teal'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Origin / Location"
                placeholder="e.g. Planina, Postojna"
                value={formData.origin}
                onChange={(e) => updateFormData('origin', e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-slate mb-2">Product Images</label>
                <div className="border-2 border-dashed border-silver rounded-card p-8 text-center hover:border-teal transition-colors cursor-pointer">
                  <ImageIcon className="w-10 h-10 text-silver mx-auto mb-3" />
                  <p className="text-slate-600 mb-1">Click or drag images here</p>
                  <p className="text-sm text-slate-400">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="p-6">
            <h2 className="font-manrope font-semibold text-lg text-slate mb-6">Review</h2>
            <div className="space-y-4">
              <div className="p-4 bg-seafoam rounded-lg">
                <h3 className="font-medium text-slate mb-3">Basic Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-slate-500">Name:</span>
                  <span className="text-slate">{formData.name}</span>
                  <span className="text-slate-500">Species:</span>
                  <span className="text-slate">{formData.species}</span>
                  <span className="text-slate-500">Category:</span>
                  <span className="text-slate">{formData.category}</span>
                </div>
              </div>

              <div className="p-4 bg-seafoam rounded-lg">
                <h3 className="font-medium text-slate mb-3">Price and Stock</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-slate-500">Price/kg:</span>
                  <span className="text-slate">€{formData.pricePerKg}</span>
                  <span className="text-slate-500">Stock:</span>
                  <span className="text-slate">{formData.stockKg} kg</span>
                  <span className="text-slate-500">Min. Order:</span>
                  <span className="text-slate">{formData.minOrderKg} kg</span>
                </div>
              </div>

              <div className="p-4 bg-seafoam rounded-lg">
                <h3 className="font-medium text-slate mb-3">Delivery</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-slate-500">Regions:</span>
                  <span className="text-slate">{formData.deliveryRegions.join(', ')}</span>
                  <span className="text-slate-500">Origin:</span>
                  <span className="text-slate">{formData.origin}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="p-6 border-t border-silver/50 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          {currentStep < 4 ? (
            <Button
              variant="primary"
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button variant="coral" onClick={handleSubmit}>
              Publish Product
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}