'use client'

import React, { useState } from 'react'
import { FiArrowLeft, FiMinus, FiPlus, FiTrash2, FiMapPin, FiCreditCard, FiTag, FiCheck } from 'react-icons/fi'
/* plain HTML/Tailwind used instead of shadcn/ui */

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  restaurantId: string
}

interface CartCheckoutProps {
  cart: CartItem[]
  onAddItem: (itemId: string) => void
  onRemoveItem: (itemId: string) => void
  onDeleteItem: (itemId: string) => void
  onBack: () => void
  onPlaceOrder: () => void
}

const PAYMENT_OPTIONS = [
  { id: 'card', label: 'Credit/Debit Card', icon: FiCreditCard },
  { id: 'upi', label: 'UPI Payment', icon: FiTag },
  { id: 'cod', label: 'Cash on Delivery', icon: FiTag },
]

export default function CartCheckout({ cart, onAddItem, onRemoveItem, onDeleteItem, onBack, onPlaceOrder }: CartCheckoutProps) {
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponMsg, setCouponMsg] = useState('')
  const [selectedPayment, setSelectedPayment] = useState('upi')

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const deliveryFee = subtotal > 500 ? 0 : 40
  const taxes = Math.round(subtotal * 0.05)
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + deliveryFee + taxes - discount

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'WELCOME10' || couponCode.toUpperCase() === 'SWIGGY10') {
      setCouponApplied(true)
      setCouponMsg('Coupon applied! 10% discount added.')
    } else if (couponCode.trim()) {
      setCouponApplied(false)
      setCouponMsg('Invalid coupon code. Try WELCOME10.')
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b shadow-sm" style={{ borderColor: '#F0DED0' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-full hover:bg-orange-50 flex items-center justify-center transition-colors">
            <FiArrowLeft className="w-5 h-5" style={{ color: '#2D1810' }} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: '#2D1810' }}>Your Cart</h1>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FF6B35', color: '#FFFFFF' }}>{cart.length} items</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Empty Cart */}
        {cart.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F0DED0' }}>
              <FiTrash2 className="w-8 h-8" style={{ color: '#9C7A5A' }} />
            </div>
            <h3 className="font-bold text-lg mb-2" style={{ color: '#2D1810' }}>Your cart is empty</h3>
            <p className="text-sm mb-4" style={{ color: '#9C7A5A' }}>Add items from a restaurant to get started</p>
            <button onClick={onBack} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#FF6B35', color: '#FFFFFF' }}>Browse Restaurants</button>
          </div>
        )}

        {/* Cart Items */}
        {cart.length > 0 && (
          <>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ border: '1px solid #F0DED0' }}>
              {cart.map((item, idx) => (
                <div key={item.id} className="flex items-center justify-between p-4" style={{ borderBottom: idx < cart.length - 1 ? '1px solid #F0DED0' : 'none' }}>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm" style={{ color: '#2D1810' }}>{item.name}</h4>
                    <p className="text-sm font-medium mt-0.5" style={{ color: '#6B4423' }}>Rs. {item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border-2 overflow-hidden" style={{ borderColor: '#FF6B35' }}>
                      <button onClick={() => onRemoveItem(item.id)} className="px-2 py-1 hover:bg-orange-50 transition-colors" style={{ color: '#FF6B35' }}>
                        <FiMinus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-sm font-bold" style={{ color: '#FF6B35' }}>{item.qty}</span>
                      <button onClick={() => onAddItem(item.id)} className="px-2 py-1 hover:bg-orange-50 transition-colors" style={{ color: '#FF6B35' }}>
                        <FiPlus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-bold min-w-[60px] text-right" style={{ color: '#2D1810' }}>Rs. {item.price * item.qty}</span>
                    <button onClick={() => onDeleteItem(item.id)} className="p-1 rounded hover:bg-red-50 transition-colors">
                      <FiTrash2 className="w-4 h-4" style={{ color: '#E53935' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <FiMapPin className="w-5 h-5 mt-0.5" style={{ color: '#FF6B35' }} />
                  <div>
                    <h4 className="font-semibold text-sm" style={{ color: '#2D1810' }}>Deliver to Home</h4>
                    <p className="text-xs mt-0.5" style={{ color: '#9C7A5A' }}>42, Park Avenue, Koramangala 5th Block, Bangalore - 560095</p>
                  </div>
                </div>
                <button className="text-xs font-bold px-3 py-1 rounded-lg" style={{ color: '#FF6B35', border: '1px solid #FF6B35' }}>Change</button>
              </div>
            </div>

            {/* Coupon */}
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
              <div className="flex items-center gap-2">
                <FiTag className="w-5 h-5" style={{ color: '#FF6B35' }} />
                <input placeholder="Enter coupon code" value={couponCode} onChange={e => setCouponCode(e.target.value)} className="flex-1 h-9 text-sm px-3 rounded-md border outline-none" style={{ borderColor: '#F0DED0' }} />
                <button onClick={handleApplyCoupon} className="px-3 py-1.5 rounded-md text-sm font-medium" style={{ backgroundColor: '#FF6B35', color: '#FFFFFF' }}>Apply</button>
              </div>
              {couponMsg && (
                <p className="text-xs mt-2 flex items-center gap-1" style={{ color: couponApplied ? '#4CAF50' : '#E53935' }}>
                  {couponApplied && <FiCheck className="w-3 h-3" />}{couponMsg}
                </p>
              )}
              <p className="text-xs mt-1" style={{ color: '#9C7A5A' }}>Try: WELCOME10 or SWIGGY10</p>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-3" style={{ border: '1px solid #F0DED0' }}>
              <h4 className="font-semibold text-sm" style={{ color: '#2D1810' }}>Payment Method</h4>
              {PAYMENT_OPTIONS.map(opt => (
                <label key={opt.id} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-orange-50 transition-colors" style={{ backgroundColor: selectedPayment === opt.id ? '#FFF8F0' : 'transparent' }}>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: selectedPayment === opt.id ? '#FF6B35' : '#F0DED0' }}>
                    {selectedPayment === opt.id && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF6B35' }} />}
                  </div>
                  <opt.icon className="w-4 h-4" style={{ color: '#6B4423' }} />
                  <span className="text-sm" style={{ color: '#2D1810' }}>{opt.label}</span>
                </label>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-xl p-4 shadow-sm space-y-2" style={{ border: '1px solid #F0DED0' }}>
              <h4 className="font-semibold text-sm mb-3" style={{ color: '#2D1810' }}>Bill Details</h4>
              <div className="flex justify-between text-sm" style={{ color: '#6B4423' }}>
                <span>Item Total</span><span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: '#6B4423' }}>
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? <span style={{ color: '#4CAF50' }}>FREE</span> : `Rs. ${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: '#6B4423' }}>
                <span>Taxes & Charges</span><span>Rs. {taxes}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm" style={{ color: '#4CAF50' }}>
                  <span>Discount</span><span>-Rs. {discount}</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2 flex justify-between font-bold" style={{ borderColor: '#F0DED0', color: '#2D1810' }}>
                <span>Total</span><span>Rs. {total}</span>
              </div>
            </div>

            {/* Place Order */}
            <button onClick={onPlaceOrder} className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98]" style={{ background: 'linear-gradient(135deg, #FF6B35, #E55A2B)' }}>
              Place Order - Rs. {total}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
