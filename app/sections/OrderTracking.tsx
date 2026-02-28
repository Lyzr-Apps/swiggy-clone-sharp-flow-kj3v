'use client'

import React, { useState, useEffect } from 'react'
import { FiCheck, FiClock, FiPackage, FiTruck, FiCheckCircle, FiPhone, FiMessageCircle, FiMapPin, FiArrowLeft } from 'react-icons/fi'

interface OrderTrackingProps {
  orderId: string
  onBack: () => void
}

const STAGES = [
  { key: 'placed', label: 'Order Placed', sublabel: 'Your order has been confirmed', icon: FiCheck },
  { key: 'preparing', label: 'Preparing', sublabel: 'Restaurant is preparing your food', icon: FiClock },
  { key: 'picked', label: 'Picked Up', sublabel: 'Delivery partner picked up your order', icon: FiPackage },
  { key: 'onway', label: 'On the Way', sublabel: 'Your order is on its way', icon: FiTruck },
  { key: 'delivered', label: 'Delivered', sublabel: 'Enjoy your meal!', icon: FiCheckCircle },
]

export default function OrderTracking({ orderId, onBack }: OrderTrackingProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const [eta, setEta] = useState(35)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage(prev => {
        if (prev < STAGES.length - 1) return prev + 1
        clearInterval(interval)
        return prev
      })
      setEta(prev => Math.max(0, prev - 8))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Header */}
      <div className="bg-white border-b shadow-sm" style={{ borderColor: '#F0DED0' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full hover:bg-orange-50 flex items-center justify-center">
            <FiArrowLeft className="w-5 h-5" style={{ color: '#2D1810' }} />
          </button>
          <div>
            <h1 className="text-lg font-bold" style={{ color: '#2D1810' }}>Track Order</h1>
            <p className="text-xs" style={{ color: '#9C7A5A' }}>Order #{orderId}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Map Area */}
        <div className="rounded-2xl overflow-hidden h-48 relative" style={{ background: 'linear-gradient(135deg, #FFB347 0%, #FF6B35 50%, #D4351C 100%)' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Restaurant pin */}
              <div className="absolute -left-16 top-2">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <FiMapPin className="w-5 h-5" style={{ color: '#D4351C' }} />
                </div>
                <p className="text-xs text-white/80 mt-1 text-center">Restaurant</p>
              </div>
              {/* Dotted line */}
              <div className="w-32 border-t-2 border-dashed border-white/40 mt-5" />
              {/* Delivery pin (animated) */}
              <div className="absolute -right-16 top-2">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg animate-bounce">
                  <FiTruck className="w-5 h-5" style={{ color: '#FF6B35' }} />
                </div>
                <p className="text-xs text-white/80 mt-1 text-center">You</p>
              </div>
            </div>
          </div>
          {/* ETA Badge */}
          <div className="absolute top-3 right-3 px-4 py-2 rounded-full bg-white/90 shadow-md">
            <p className="text-xs font-medium" style={{ color: '#9C7A5A' }}>Estimated Time</p>
            <p className="text-lg font-bold" style={{ color: '#FF6B35' }}>{eta > 0 ? `${eta} min` : 'Arriving!'}</p>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-xl p-5 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
          <h3 className="font-bold text-sm mb-4" style={{ color: '#2D1810' }}>Order Status</h3>
          <div className="space-y-0">
            {STAGES.map((stage, idx) => {
              const isCompleted = idx < currentStage
              const isCurrent = idx === currentStage
              const isPending = idx > currentStage
              const IconComp = stage.icon
              return (
                <div key={stage.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500" style={{ backgroundColor: isCompleted ? '#4CAF50' : isCurrent ? '#FF6B35' : '#F0DED0' }}>
                      <IconComp className="w-4 h-4" style={{ color: isCompleted || isCurrent ? '#FFFFFF' : '#9C7A5A' }} />
                    </div>
                    {idx < STAGES.length - 1 && (
                      <div className="w-0.5 h-8 transition-all duration-500" style={{ backgroundColor: isCompleted ? '#4CAF50' : '#F0DED0' }} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className="font-semibold text-sm transition-all duration-500" style={{ color: isPending ? '#9C7A5A' : '#2D1810' }}>{stage.label}</p>
                    <p className="text-xs" style={{ color: '#9C7A5A' }}>{stage.sublabel}</p>
                    {isCurrent && currentStage < STAGES.length - 1 && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#FF6B35' }} />
                        <span className="text-xs font-medium" style={{ color: '#FF6B35' }}>In progress...</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Delivery Partner */}
        <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: '#2D1810' }}>Delivery Partner</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #FF6B35, #FFB347)' }}>
                RK
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#2D1810' }}>Rajesh Kumar</p>
                <div className="flex items-center gap-1">
                  <FiCheck className="w-3 h-3" style={{ color: '#4CAF50' }} />
                  <span className="text-xs" style={{ color: '#9C7A5A' }}>4.8 rating | 2,340 deliveries</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:shadow-md transition-all" style={{ backgroundColor: '#FFF8F0', border: '1.5px solid #F0DED0' }}>
                <FiPhone className="w-4 h-4" style={{ color: '#FF6B35' }} />
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center hover:shadow-md transition-all" style={{ backgroundColor: '#FFF8F0', border: '1.5px solid #F0DED0' }}>
                <FiMessageCircle className="w-4 h-4" style={{ color: '#FF6B35' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
          <h3 className="font-bold text-sm mb-3" style={{ color: '#2D1810' }}>Order Summary</h3>
          <div className="space-y-2 text-sm" style={{ color: '#6B4423' }}>
            <div className="flex justify-between"><span>2x Butter Chicken</span><span>Rs. 640</span></div>
            <div className="flex justify-between"><span>1x Garlic Naan</span><span>Rs. 60</span></div>
            <div className="flex justify-between"><span>1x Mango Lassi</span><span>Rs. 90</span></div>
            <div className="border-t pt-2 mt-2 flex justify-between font-bold" style={{ borderColor: '#F0DED0', color: '#2D1810' }}>
              <span>Total Paid</span><span>Rs. 830</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
