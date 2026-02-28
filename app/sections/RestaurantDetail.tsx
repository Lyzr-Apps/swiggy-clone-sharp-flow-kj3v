'use client'

import React, { useState } from 'react'
import { FiStar, FiClock, FiArrowLeft, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi'
/* plain HTML/Tailwind used instead of shadcn/ui */

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  isVeg: boolean
  isBestseller?: boolean
}

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
  restaurantId: string
}

interface RestaurantDetailProps {
  restaurant: { id: string; name: string; cuisine: string; rating: number; deliveryTime: string; priceRange: string; gradient: string }
  cart: CartItem[]
  onAddToCart: (item: MenuItem) => void
  onRemoveFromCart: (itemId: string) => void
  onBack: () => void
  onOpenCart: () => void
}

const MENU_CATEGORIES = ['Recommended', 'Starters', 'Main Course', 'Breads', 'Desserts', 'Beverages']

const MOCK_MENU: MenuItem[] = [
  { id: 'm1', name: 'Butter Chicken', description: 'Tender chicken in rich tomato-butter gravy with aromatic spices', price: 320, category: 'Recommended', isVeg: false, isBestseller: true },
  { id: 'm2', name: 'Paneer Tikka Masala', description: 'Grilled cottage cheese cubes in spiced tomato gravy', price: 280, category: 'Recommended', isVeg: true, isBestseller: true },
  { id: 'm3', name: 'Chicken Biryani', description: 'Fragrant basmati rice layered with spiced chicken and saffron', price: 350, category: 'Recommended', isVeg: false, isBestseller: true },
  { id: 'm4', name: 'Crispy Veg Spring Rolls', description: 'Crunchy rolls filled with mixed vegetables', price: 180, category: 'Starters', isVeg: true },
  { id: 'm5', name: 'Chicken 65', description: 'Spicy deep-fried chicken with curry leaves and red chillies', price: 220, category: 'Starters', isVeg: false },
  { id: 'm6', name: 'Paneer Tikka', description: 'Chargrilled cottage cheese marinated in tandoori spices', price: 240, category: 'Starters', isVeg: true },
  { id: 'm7', name: 'Mutton Seekh Kebab', description: 'Minced mutton skewers with fresh herbs and spices', price: 280, category: 'Starters', isVeg: false },
  { id: 'm8', name: 'Dal Makhani', description: 'Slow-cooked black lentils in creamy buttery gravy', price: 220, category: 'Main Course', isVeg: true },
  { id: 'm9', name: 'Chicken Tikka', description: 'Tandoori chicken pieces in smoky charcoal flavor', price: 260, category: 'Main Course', isVeg: false },
  { id: 'm10', name: 'Palak Paneer', description: 'Fresh spinach puree with soft cottage cheese cubes', price: 240, category: 'Main Course', isVeg: true },
  { id: 'm11', name: 'Lamb Rogan Josh', description: 'Slow-cooked lamb in aromatic Kashmiri spices', price: 380, category: 'Main Course', isVeg: false },
  { id: 'm12', name: 'Veg Kolhapuri', description: 'Mixed vegetables in spicy Kolhapuri masala', price: 200, category: 'Main Course', isVeg: true },
  { id: 'm13', name: 'Garlic Naan', description: 'Soft leavened bread with garlic and butter', price: 60, category: 'Breads', isVeg: true },
  { id: 'm14', name: 'Butter Roti', description: 'Whole wheat flatbread with butter', price: 40, category: 'Breads', isVeg: true },
  { id: 'm15', name: 'Cheese Naan', description: 'Naan stuffed with melted cheese', price: 80, category: 'Breads', isVeg: true },
  { id: 'm16', name: 'Laccha Paratha', description: 'Layered flaky flatbread', price: 50, category: 'Breads', isVeg: true },
  { id: 'm17', name: 'Gulab Jamun', description: 'Soft milk dumplings soaked in rose-cardamom syrup', price: 120, category: 'Desserts', isVeg: true },
  { id: 'm18', name: 'Rasmalai', description: 'Soft cheese patties in saffron-flavored milk', price: 140, category: 'Desserts', isVeg: true },
  { id: 'm19', name: 'Brownie Sundae', description: 'Warm chocolate brownie with vanilla ice cream', price: 180, category: 'Desserts', isVeg: true },
  { id: 'm20', name: 'Masala Chai', description: 'Traditional Indian spiced tea', price: 50, category: 'Beverages', isVeg: true },
  { id: 'm21', name: 'Mango Lassi', description: 'Thick yogurt drink blended with alphonso mango', price: 90, category: 'Beverages', isVeg: true },
  { id: 'm22', name: 'Fresh Lime Soda', description: 'Refreshing lime with soda water', price: 60, category: 'Beverages', isVeg: true },
  { id: 'm23', name: 'Cold Coffee', description: 'Chilled coffee blended with ice cream', price: 120, category: 'Beverages', isVeg: true },
]

export default function RestaurantDetail({ restaurant, cart, onAddToCart, onRemoveFromCart, onBack, onOpenCart }: RestaurantDetailProps) {
  const [activeCategory, setActiveCategory] = useState('Recommended')

  const getItemQty = (itemId: string) => {
    const found = cart.find(c => c.id === itemId)
    return found?.qty ?? 0
  }

  const filteredItems = MOCK_MENU.filter(m => m.category === activeCategory)
  const cartTotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0)
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0)

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Hero */}
      <div className="relative h-48 flex items-end" style={{ background: restaurant.gradient }}>
        <button onClick={onBack} className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors">
          <FiArrowLeft className="w-5 h-5" style={{ color: '#2D1810' }} />
        </button>
        <div className="w-full px-4 pb-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm">
            <h1 className="text-xl font-bold" style={{ color: '#2D1810' }}>{restaurant.name}</h1>
            <p className="text-sm" style={{ color: '#6B4423' }}>{restaurant.cuisine}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-white font-semibold" style={{ backgroundColor: '#4CAF50' }}>
                <FiStar className="w-3 h-3" />{restaurant.rating}
              </span>
              <span className="flex items-center gap-1" style={{ color: '#9C7A5A' }}>
                <FiClock className="w-3 h-3" />{restaurant.deliveryTime}
              </span>
              <span style={{ color: '#9C7A5A' }}>{restaurant.priceRange}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-0 z-20 bg-white border-b shadow-sm" style={{ borderColor: '#F0DED0' }}>
        <div className="w-full overflow-x-auto">
          <div className="flex px-4 py-2 gap-1">
            {MENU_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all" style={{ backgroundColor: activeCategory === cat ? '#FF6B35' : 'transparent', color: activeCategory === cat ? '#FFFFFF' : '#6B4423' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-3xl mx-auto px-4 py-4 space-y-3">
        {filteredItems.map(item => {
          const qty = getItemQty(item.id)
          return (
            <div key={item.id} className="bg-white rounded-xl p-4 flex justify-between items-start gap-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-sm border-2 flex items-center justify-center" style={{ borderColor: item.isVeg ? '#4CAF50' : '#E53935' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.isVeg ? '#4CAF50' : '#E53935' }} />
                  </span>
                  <h3 className="font-semibold text-sm" style={{ color: '#2D1810' }}>{item.name}</h3>
                  {item.isBestseller && <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#FFD93D', color: '#2D1810' }}>Bestseller</span>}
                </div>
                <p className="text-sm font-semibold" style={{ color: '#2D1810' }}>Rs. {item.price}</p>
                <p className="text-xs" style={{ color: '#9C7A5A' }}>{item.description}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-24 h-20 rounded-lg flex items-center justify-center" style={{ background: item.isVeg ? 'linear-gradient(135deg, #4CAF50, #81C784)' : 'linear-gradient(135deg, #FF6B35, #FFB347)' }}>
                  <span className="text-white/40 text-2xl font-bold">{item.name.charAt(0)}</span>
                </div>
                {qty === 0 ? (
                  <button onClick={() => onAddToCart(item)} className="px-6 py-1.5 rounded-lg text-sm font-bold border-2 hover:shadow-md transition-all" style={{ color: '#FF6B35', borderColor: '#FF6B35', backgroundColor: '#FFF8F0' }}>
                    ADD
                  </button>
                ) : (
                  <div className="flex items-center rounded-lg overflow-hidden border-2" style={{ borderColor: '#FF6B35' }}>
                    <button onClick={() => onRemoveFromCart(item.id)} className="px-2 py-1 hover:bg-orange-50 transition-colors" style={{ color: '#FF6B35' }}>
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 text-sm font-bold" style={{ color: '#FF6B35' }}>{qty}</span>
                    <button onClick={() => onAddToCart(item)} className="px-2 py-1 hover:bg-orange-50 transition-colors" style={{ color: '#FF6B35' }}>
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Sticky Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 p-4" style={{ backgroundColor: '#FFF8F0' }}>
          <button onClick={onOpenCart} className="w-full max-w-3xl mx-auto flex items-center justify-between px-5 py-3.5 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transition-all" style={{ background: 'linear-gradient(135deg, #FF6B35, #E55A2B)' }}>
            <span className="flex items-center gap-2">
              <FiShoppingCart className="w-5 h-5" />
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
            <span>View Cart - Rs. {cartTotal}</span>
          </button>
        </div>
      )}
    </div>
  )
}
