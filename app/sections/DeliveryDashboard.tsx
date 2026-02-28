'use client'

import React, { useState } from 'react'
import { FiNavigation, FiPhone, FiMapPin, FiClock, FiStar, FiCheck, FiPackage, FiDollarSign, FiTruck } from 'react-icons/fi'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const MOCK_ACTIVE_DELIVERY = {
  orderId: 'ORD-1005',
  restaurant: 'Spice Kitchen',
  restaurantAddress: '23, MG Road, Koramangala',
  customer: 'Sneha Patel',
  customerAddress: '88, 5th Cross, HSR Layout',
  items: '2x Chicken Tikka, 1x Lassi',
  amount: 610,
  distance: '4.2 km',
  earnings: 65,
}

const MOCK_RECENT = [
  { id: 'ORD-1004', restaurant: 'Biryani House', customer: 'Vikram Singh', amount: 45, time: '30 min ago', distance: '3.1 km' },
  { id: 'ORD-1003', restaurant: 'Tandoori Express', customer: 'Anita Roy', amount: 55, time: '1 hr ago', distance: '5.0 km' },
  { id: 'ORD-1002', restaurant: 'Spice Kitchen', customer: 'Rahul Verma', amount: 40, time: '1.5 hr ago', distance: '2.8 km' },
  { id: 'ORD-1001', restaurant: 'Green Bowl', customer: 'Priya Sharma', amount: 50, time: '2 hr ago', distance: '3.5 km' },
  { id: 'ORD-1000', restaurant: 'Pizza Place', customer: 'Aakash D.', amount: 60, time: '3 hr ago', distance: '6.2 km' },
]

export default function DeliveryDashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const [deliveryStatus, setDeliveryStatus] = useState<'pickup' | 'delivering' | 'idle'>('pickup')
  const [statusMsg, setStatusMsg] = useState('')

  const todayEarnings = 485
  const todayDeliveries = 8
  const rating = 4.8

  const handlePickedUp = () => {
    setDeliveryStatus('delivering')
    setStatusMsg('Order picked up! Navigate to customer.')
    setTimeout(() => setStatusMsg(''), 3000)
  }

  const handleDelivered = () => {
    setDeliveryStatus('idle')
    setStatusMsg('Order delivered successfully!')
    setTimeout(() => setStatusMsg(''), 3000)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Header */}
      <div className="bg-white border-b shadow-sm" style={{ borderColor: '#F0DED0' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold" style={{ color: '#2D1810' }}>Delivery Dashboard</h1>
            <p className="text-xs" style={{ color: '#9C7A5A' }}>Welcome back, Rajesh</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium" style={{ color: isOnline ? '#4CAF50' : '#9C7A5A' }}>{isOnline ? 'Online' : 'Offline'}</span>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Status Message */}
        {statusMsg && (
          <div className="rounded-xl p-3 text-sm font-medium text-center" style={{ backgroundColor: '#E8F5E9', color: '#4CAF50' }}>
            <FiCheck className="w-4 h-4 inline mr-1" />{statusMsg}
          </div>
        )}

        {/* Online Status */}
        {!isOnline && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F0DED0' }}>
              <FiTruck className="w-8 h-8" style={{ color: '#9C7A5A' }} />
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ color: '#2D1810' }}>You are offline</h3>
            <p className="text-sm" style={{ color: '#9C7A5A' }}>Go online to start receiving delivery requests</p>
          </div>
        )}

        {isOnline && (
          <>
            {/* Active Delivery */}
            {deliveryStatus !== 'idle' && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden" style={{ border: '2px solid #FF6B35' }}>
                <div className="px-4 py-2 flex items-center justify-between" style={{ backgroundColor: '#FF6B35' }}>
                  <span className="text-white font-bold text-sm">Active Delivery</span>
                  <Badge className="text-xs" style={{ backgroundColor: '#FFD93D', color: '#2D1810' }}>
                    {deliveryStatus === 'pickup' ? 'Pick Up' : 'Delivering'}
                  </Badge>
                </div>

                <div className="p-4 space-y-4">
                  {/* Route */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: deliveryStatus === 'pickup' ? '#FF6B35' : '#4CAF50' }}>
                          <FiMapPin className="w-4 h-4 text-white" />
                        </div>
                        <div className="w-0.5 h-6" style={{ backgroundColor: '#F0DED0' }} />
                      </div>
                      <div>
                        <p className="text-xs font-medium" style={{ color: '#9C7A5A' }}>PICKUP FROM</p>
                        <p className="font-semibold text-sm" style={{ color: '#2D1810' }}>{MOCK_ACTIVE_DELIVERY.restaurant}</p>
                        <p className="text-xs" style={{ color: '#9C7A5A' }}>{MOCK_ACTIVE_DELIVERY.restaurantAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: deliveryStatus === 'delivering' ? '#FF6B35' : '#F0DED0' }}>
                        <FiMapPin className="w-4 h-4" style={{ color: deliveryStatus === 'delivering' ? '#FFFFFF' : '#9C7A5A' }} />
                      </div>
                      <div>
                        <p className="text-xs font-medium" style={{ color: '#9C7A5A' }}>DELIVER TO</p>
                        <p className="font-semibold text-sm" style={{ color: '#2D1810' }}>{MOCK_ACTIVE_DELIVERY.customer}</p>
                        <p className="text-xs" style={{ color: '#9C7A5A' }}>{MOCK_ACTIVE_DELIVERY.customerAddress}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ backgroundColor: '#FFF8F0' }}>
                    <div>
                      <p className="text-xs" style={{ color: '#9C7A5A' }}>{MOCK_ACTIVE_DELIVERY.items}</p>
                      <p className="text-xs mt-0.5" style={{ color: '#9C7A5A' }}>{MOCK_ACTIVE_DELIVERY.distance} away</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm" style={{ color: '#4CAF50' }}>+Rs. {MOCK_ACTIVE_DELIVERY.earnings}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-md transition-all" style={{ backgroundColor: '#FFF8F0', color: '#FF6B35', border: '1.5px solid #FF6B35' }}>
                      <FiNavigation className="w-4 h-4" />Navigate
                    </button>
                    <button className="w-12 rounded-xl flex items-center justify-center hover:shadow-md transition-all" style={{ backgroundColor: '#FFF8F0', border: '1.5px solid #F0DED0' }}>
                      <FiPhone className="w-4 h-4" style={{ color: '#6B4423' }} />
                    </button>
                    {deliveryStatus === 'pickup' ? (
                      <button onClick={handlePickedUp} className="flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 hover:shadow-md transition-all" style={{ background: 'linear-gradient(135deg, #FF6B35, #E55A2B)' }}>
                        <FiPackage className="w-4 h-4" />Picked Up
                      </button>
                    ) : (
                      <button onClick={handleDelivered} className="flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 hover:shadow-md transition-all" style={{ background: 'linear-gradient(135deg, #4CAF50, #388E3C)' }}>
                        <FiCheck className="w-4 h-4" />Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {deliveryStatus === 'idle' && (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
                  <FiCheck className="w-8 h-8" style={{ color: '#4CAF50' }} />
                </div>
                <h3 className="font-bold text-lg" style={{ color: '#2D1810' }}>All caught up!</h3>
                <p className="text-sm" style={{ color: '#9C7A5A' }}>Waiting for new delivery requests...</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#4CAF50' }} />
                  <span className="text-xs" style={{ color: '#4CAF50' }}>Listening for orders</span>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                <FiDollarSign className="w-5 h-5 mx-auto" style={{ color: '#4CAF50' }} />
                <p className="text-lg font-bold mt-1" style={{ color: '#2D1810' }}>Rs. {todayEarnings}</p>
                <p className="text-xs" style={{ color: '#9C7A5A' }}>Earnings</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                <FiPackage className="w-5 h-5 mx-auto" style={{ color: '#FF6B35' }} />
                <p className="text-lg font-bold mt-1" style={{ color: '#2D1810' }}>{todayDeliveries}</p>
                <p className="text-xs" style={{ color: '#9C7A5A' }}>Deliveries</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                <FiStar className="w-5 h-5 mx-auto" style={{ color: '#FFB347' }} />
                <p className="text-lg font-bold mt-1" style={{ color: '#2D1810' }}>{rating}</p>
                <p className="text-xs" style={{ color: '#9C7A5A' }}>Rating</p>
              </div>
            </div>

            {/* Recent Deliveries */}
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: '#2D1810' }}>Recent Deliveries</h3>
              <div className="space-y-3">
                {MOCK_RECENT.map(d => (
                  <div key={d.id} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: '#F0DED0' }}>
                    <div>
                      <p className="font-medium text-sm" style={{ color: '#2D1810' }}>{d.restaurant}</p>
                      <p className="text-xs" style={{ color: '#9C7A5A' }}>{d.customer} | {d.distance}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm" style={{ color: '#4CAF50' }}>+Rs. {d.amount}</p>
                      <p className="text-xs" style={{ color: '#9C7A5A' }}>{d.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
