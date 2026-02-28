'use client'

import React, { useState, useCallback } from 'react'
import { FiShoppingBag, FiTruck, FiGrid, FiUser, FiInfo } from 'react-icons/fi'
import CustomerHome from './sections/CustomerHome'
import RestaurantDetail from './sections/RestaurantDetail'
import CartCheckout from './sections/CartCheckout'
import OrderTracking from './sections/OrderTracking'
import OrderSupport from './sections/OrderSupport'
import RestaurantDashboard from './sections/RestaurantDashboard'
import DeliveryDashboard from './sections/DeliveryDashboard'
import AdminPanel from './sections/AdminPanel'

import type { Restaurant } from './sections/CustomerHome'

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: '' }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF8F0', color: '#2D1810' }}>
          <div className="text-center p-8 max-w-md">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-sm mb-4" style={{ color: '#9C7A5A' }}>{this.state.error}</p>
            <button onClick={() => this.setState({ hasError: false, error: '' })} className="px-4 py-2 rounded-md text-sm text-white" style={{ backgroundColor: '#FF6B35' }}>Try again</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

type Role = 'customer' | 'restaurant' | 'delivery' | 'admin'
type CustomerView = 'home' | 'detail' | 'cart' | 'tracking'

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  restaurantId: string
}

const ROLES: { key: Role; label: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }[] = [
  { key: 'customer', label: 'Customer', icon: FiUser },
  { key: 'restaurant', label: 'Restaurant', icon: FiShoppingBag },
  { key: 'delivery', label: 'Delivery', icon: FiTruck },
  { key: 'admin', label: 'Admin', icon: FiGrid },
]

const MOCK_RESTAURANTS: Restaurant[] = [
  { id: 'r1', name: 'Spice Kitchen', cuisine: 'North Indian', rating: 4.5, deliveryTime: '25-30 min', priceRange: 'Rs. 200-500', tags: ['Butter Chicken', 'Biryani', 'Naan'], gradient: 'linear-gradient(135deg, #FF6B35, #D4351C)', popularDishes: ['Butter Chicken', 'Biryani'], promoted: true },
  { id: 'r2', name: 'Wok Express', cuisine: 'Chinese', rating: 4.2, deliveryTime: '20-25 min', priceRange: 'Rs. 150-400', tags: ['Noodles', 'Manchurian', 'Fried Rice'], gradient: 'linear-gradient(135deg, #FFB347, #FF6B35)', popularDishes: ['Hakka Noodles', 'Manchurian'] },
  { id: 'r3', name: 'Pizza Palace', cuisine: 'Italian, Pizza', rating: 4.3, deliveryTime: '30-35 min', priceRange: 'Rs. 250-600', tags: ['Pizza', 'Pasta', 'Garlic Bread'], gradient: 'linear-gradient(135deg, #D4351C, #FF6B35)', popularDishes: ['Margherita', 'Pepperoni'] },
  { id: 'r4', name: 'Burger Barn', cuisine: 'Burgers, American', rating: 4.0, deliveryTime: '15-20 min', priceRange: 'Rs. 100-350', tags: ['Burgers', 'Fries', 'Shakes'], gradient: 'linear-gradient(135deg, #FFD93D, #FFB347)', popularDishes: ['Classic Burger', 'Cheese Fries'] },
  { id: 'r5', name: 'Dosa Corner', cuisine: 'South Indian', rating: 4.6, deliveryTime: '20-25 min', priceRange: 'Rs. 80-250', tags: ['Dosa', 'Idli', 'Vada'], gradient: 'linear-gradient(135deg, #4CAF50, #81C784)', popularDishes: ['Masala Dosa', 'Idli Sambar'] },
  { id: 'r6', name: 'Biryani House', cuisine: 'Biryani, Mughlai', rating: 4.7, deliveryTime: '35-40 min', priceRange: 'Rs. 200-500', tags: ['Biryani', 'Kebabs', 'Raita'], gradient: 'linear-gradient(135deg, #FF6B35, #FFD93D)', popularDishes: ['Hyderabadi Biryani', 'Seekh Kebab'], promoted: true },
  { id: 'r7', name: 'Thai Basil', cuisine: 'Thai', rating: 4.1, deliveryTime: '30-35 min', priceRange: 'Rs. 300-600', tags: ['Thai Curry', 'Pad Thai', 'Tom Yum'], gradient: 'linear-gradient(135deg, #FFB347, #4CAF50)', popularDishes: ['Green Curry', 'Pad Thai'] },
  { id: 'r8', name: 'Dessert Paradise', cuisine: 'Desserts, Bakery', rating: 4.4, deliveryTime: '15-20 min', priceRange: 'Rs. 100-400', tags: ['Cakes', 'Ice Cream', 'Pastries'], gradient: 'linear-gradient(135deg, #FFD93D, #FF6B35)', popularDishes: ['Chocolate Cake', 'Tiramisu'] },
  { id: 'r9', name: 'Tandoori Express', cuisine: 'North Indian, Tandoor', rating: 4.3, deliveryTime: '25-30 min', priceRange: 'Rs. 200-450', tags: ['Tandoori', 'Kebabs', 'Naan'], gradient: 'linear-gradient(135deg, #D4351C, #FFB347)', popularDishes: ['Tandoori Chicken', 'Garlic Naan'] },
  { id: 'r10', name: 'Green Bowl', cuisine: 'Healthy, Salads', rating: 4.2, deliveryTime: '15-20 min', priceRange: 'Rs. 150-350', tags: ['Salads', 'Bowls', 'Smoothies'], gradient: 'linear-gradient(135deg, #4CAF50, #FFD93D)', popularDishes: ['Quinoa Bowl', 'Caesar Salad'] },
  { id: 'r11', name: 'Rolls & Wraps', cuisine: 'Street Food', rating: 3.9, deliveryTime: '10-15 min', priceRange: 'Rs. 80-200', tags: ['Rolls', 'Wraps', 'Momos'], gradient: 'linear-gradient(135deg, #FFB347, #D4351C)', popularDishes: ['Chicken Roll', 'Paneer Wrap'] },
  { id: 'r12', name: 'Chettinad Kitchen', cuisine: 'South Indian, Chettinad', rating: 4.5, deliveryTime: '30-35 min', priceRange: 'Rs. 200-500', tags: ['Chettinad', 'Pepper Chicken', 'Fish Curry'], gradient: 'linear-gradient(135deg, #D4351C, #FF6B35)', popularDishes: ['Chettinad Chicken', 'Fish Fry'] },
  { id: 'r13', name: 'Momos Junction', cuisine: 'Chinese, Tibetan', rating: 4.0, deliveryTime: '15-20 min', priceRange: 'Rs. 80-200', tags: ['Momos', 'Thukpa', 'Dumplings'], gradient: 'linear-gradient(135deg, #FFD93D, #4CAF50)', popularDishes: ['Steamed Momos', 'Fried Momos'] },
  { id: 'r14', name: 'Chai & Snacks', cuisine: 'Beverages, Snacks', rating: 4.1, deliveryTime: '10-15 min', priceRange: 'Rs. 50-150', tags: ['Tea', 'Samosa', 'Pakora'], gradient: 'linear-gradient(135deg, #FFB347, #FF6B35)', popularDishes: ['Masala Chai', 'Samosa'] },
  { id: 'r15', name: 'Royal Mughlai', cuisine: 'Mughlai, North Indian', rating: 4.6, deliveryTime: '35-40 min', priceRange: 'Rs. 300-700', tags: ['Mughlai', 'Korma', 'Biryani'], gradient: 'linear-gradient(135deg, #FF6B35, #D4351C)', popularDishes: ['Shahi Paneer', 'Mutton Korma'], promoted: true },
]

const SAMPLE_CART: CartItem[] = [
  { id: 'm1', name: 'Butter Chicken', price: 320, qty: 2, restaurantId: 'r1' },
  { id: 'm13', name: 'Garlic Naan', price: 60, qty: 3, restaurantId: 'r1' },
  { id: 'm21', name: 'Mango Lassi', price: 90, qty: 1, restaurantId: 'r1' },
]

export default function Page() {
  const [role, setRole] = useState<Role>('customer')
  const [customerView, setCustomerView] = useState<CustomerView>('home')
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orderId, setOrderId] = useState('')
  const [sampleMode, setSampleMode] = useState(false)
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null)
  const [showAgentInfo, setShowAgentInfo] = useState(false)

  const displayCart = sampleMode && cart.length === 0 ? SAMPLE_CART : cart

  const handleSelectRestaurant = useCallback((r: Restaurant) => {
    setSelectedRestaurant(r)
    setCustomerView('detail')
  }, [])

  const handleAddToCart = useCallback((item: { id: string; name: string; price: number }) => {
    const restId = selectedRestaurant?.id ?? 'unknown'
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1, restaurantId: restId }]
    })
  }, [selectedRestaurant])

  const handleRemoveFromCart = useCallback((itemId: string) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === itemId)
      if (existing && existing.qty > 1) {
        return prev.map(c => c.id === itemId ? { ...c, qty: c.qty - 1 } : c)
      }
      return prev.filter(c => c.id !== itemId)
    })
  }, [])

  const handleDeleteFromCart = useCallback((itemId: string) => {
    setCart(prev => prev.filter(c => c.id !== itemId))
  }, [])

  const handleAddItemById = useCallback((itemId: string) => {
    setCart(prev => prev.map(c => c.id === itemId ? { ...c, qty: c.qty + 1 } : c))
  }, [])

  const handlePlaceOrder = useCallback(() => {
    const oid = `ORD-${Math.floor(1000 + Math.random() * 9000)}`
    setOrderId(oid)
    setCart([])
    setCustomerView('tracking')
  }, [])

  const handleOpenCart = useCallback(() => {
    setCustomerView('cart')
  }, [])

  const handleBackToHome = useCallback(() => {
    setCustomerView('home')
    setSelectedRestaurant(null)
  }, [])

  const agents = [
    { id: '69a2cb5a235ba026f0ab6145', name: 'Restaurant Recommendation Agent', purpose: 'AI-powered personalized restaurant recommendations' },
    { id: '69a2cb5b978d93f884782db2', name: 'Order Support Agent', purpose: 'Customer support for orders, refunds, and inquiries' },
  ]

  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ backgroundColor: '#FFF8F0' }}>
        {/* Top Nav */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b" style={{ borderColor: '#F0DED0' }}>
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-4 overflow-x-auto">
              <h1 className="text-xl font-bold flex-shrink-0" style={{ color: '#FF6B35' }}>SwiggyClone</h1>
              <div className="flex gap-1">
                {ROLES.map(r => {
                  const IconComp = r.icon
                  return (
                    <button key={r.key} onClick={() => { setRole(r.key); if (r.key === 'customer') { setCustomerView('home'); setSelectedRestaurant(null) } }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all" style={{ backgroundColor: role === r.key ? '#FF6B35' : 'transparent', color: role === r.key ? '#FFFFFF' : '#6B4423' }}>
                      <IconComp className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{r.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium" style={{ color: '#9C7A5A' }}>Sample Data</span>
                <button onClick={() => setSampleMode(!sampleMode)} className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200" style={{ backgroundColor: sampleMode ? '#FF6B35' : '#F0DED0' }}><span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200" style={{ transform: sampleMode ? 'translateX(20px)' : 'translateX(2px)' }} /></button>
              </div>
              <button onClick={() => setShowAgentInfo(!showAgentInfo)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors" style={{ border: '1px solid #F0DED0' }}>
                <FiInfo className="w-4 h-4" style={{ color: '#9C7A5A' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Agent Info */}
        {showAgentInfo && (
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: '#2D1810' }}>AI Agents Powering This App</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {agents.map(a => (
                  <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: '#FFF8F0', border: '1px solid #F0DED0' }}>
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: activeAgentId === a.id ? '#4CAF50' : '#F0DED0' }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#2D1810' }}>{a.name}</p>
                      <p className="text-xs" style={{ color: '#9C7A5A' }}>{a.purpose}</p>
                      <p className="text-xs font-mono mt-0.5" style={{ color: '#C4A882' }}>{a.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative">
          {role === 'customer' && (
            <>
              {customerView === 'home' && (
                <CustomerHome restaurants={MOCK_RESTAURANTS} cart={displayCart} onSelectRestaurant={handleSelectRestaurant} onOpenCart={handleOpenCart} sampleMode={sampleMode} />
              )}
              {customerView === 'detail' && selectedRestaurant && (
                <RestaurantDetail restaurant={selectedRestaurant} cart={displayCart} onAddToCart={handleAddToCart} onRemoveFromCart={handleRemoveFromCart} onBack={handleBackToHome} onOpenCart={handleOpenCart} />
              )}
              {customerView === 'cart' && (
                <CartCheckout cart={displayCart} onAddItem={handleAddItemById} onRemoveItem={handleRemoveFromCart} onDeleteItem={handleDeleteFromCart} onBack={() => setCustomerView(selectedRestaurant ? 'detail' : 'home')} onPlaceOrder={handlePlaceOrder} />
              )}
              {customerView === 'tracking' && (
                <OrderTracking orderId={orderId} onBack={handleBackToHome} />
              )}
              <OrderSupport />
            </>
          )}
          {role === 'restaurant' && <RestaurantDashboard />}
          {role === 'delivery' && <DeliveryDashboard />}
          {role === 'admin' && <AdminPanel />}
        </div>
      </div>
    </ErrorBoundary>
  )
}
