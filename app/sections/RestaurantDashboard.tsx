'use client'

import React, { useState } from 'react'
import { FiHome, FiList, FiShoppingBag, FiStar, FiDollarSign, FiCheck, FiX, FiPlus, FiEdit2, FiTrash2, FiClock, FiMenu } from 'react-icons/fi'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

const SIDEBAR_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: FiHome },
  { key: 'menu', label: 'Menu', icon: FiList },
  { key: 'orders', label: 'Orders', icon: FiShoppingBag },
  { key: 'reviews', label: 'Reviews', icon: FiStar },
  { key: 'earnings', label: 'Earnings', icon: FiDollarSign },
]

const MOCK_ORDERS = [
  { id: 'ORD-1001', customer: 'Priya Sharma', items: '2x Butter Chicken, 1x Naan', amount: 700, time: '5 min ago', status: 'pending' },
  { id: 'ORD-1002', customer: 'Rahul Verma', items: '1x Biryani, 1x Raita', amount: 400, time: '12 min ago', status: 'preparing' },
  { id: 'ORD-1003', customer: 'Anita Roy', items: '3x Paneer Tikka, 2x Roti', amount: 800, time: '25 min ago', status: 'completed' },
  { id: 'ORD-1004', customer: 'Vikram Singh', items: '1x Dal Makhani, 2x Naan', amount: 340, time: '30 min ago', status: 'completed' },
  { id: 'ORD-1005', customer: 'Sneha Patel', items: '2x Chicken Tikka, 1x Lassi', amount: 610, time: '2 min ago', status: 'pending' },
]

const MOCK_MENU_ITEMS = [
  { id: 'mi1', name: 'Butter Chicken', category: 'Main Course', price: 320, available: true },
  { id: 'mi2', name: 'Paneer Tikka', category: 'Starters', price: 240, available: true },
  { id: 'mi3', name: 'Chicken Biryani', category: 'Main Course', price: 350, available: true },
  { id: 'mi4', name: 'Garlic Naan', category: 'Breads', price: 60, available: true },
  { id: 'mi5', name: 'Gulab Jamun', category: 'Desserts', price: 120, available: false },
  { id: 'mi6', name: 'Mango Lassi', category: 'Beverages', price: 90, available: true },
  { id: 'mi7', name: 'Dal Makhani', category: 'Main Course', price: 220, available: true },
  { id: 'mi8', name: 'Masala Chai', category: 'Beverages', price: 50, available: true },
]

const MOCK_REVIEWS = [
  { id: 'r1', customer: 'Aditya M.', rating: 5, comment: 'Amazing butter chicken! Best in the area.', date: '2 days ago' },
  { id: 'r2', customer: 'Kavita S.', rating: 4, comment: 'Good food, delivery was slightly delayed.', date: '3 days ago' },
  { id: 'r3', customer: 'Rohan K.', rating: 5, comment: 'Paneer tikka was perfectly grilled. Will order again!', date: '5 days ago' },
  { id: 'r4', customer: 'Meera J.', rating: 3, comment: 'Naan could have been softer. Biryani was good.', date: '1 week ago' },
]

export default function RestaurantDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [orderTab, setOrderTab] = useState('all')
  const [menuItems, setMenuItems] = useState(MOCK_MENU_ITEMS)
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    { label: "Today's Orders", value: '47', change: '+12%', color: '#FF6B35' },
    { label: 'Revenue', value: 'Rs. 18,450', change: '+8%', color: '#4CAF50' },
    { label: 'Avg Rating', value: '4.5', change: '+0.2', color: '#FFB347' },
    { label: 'Pending', value: '5', change: '', color: '#D4351C' },
  ]

  const toggleAvailability = (id: string) => {
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, available: !m.available } : m))
  }

  const updateOrderStatus = (id: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  const filteredOrders = orderTab === 'all' ? orders :
    orderTab === 'active' ? orders.filter(o => o.status === 'pending' || o.status === 'preparing') :
    orders.filter(o => o.status === 'completed')

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Mobile sidebar toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed top-4 left-4 z-40 md:hidden w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center" style={{ border: '1px solid #F0DED0' }}>
        <FiMenu className="w-5 h-5" style={{ color: '#2D1810' }} />
      </button>

      {/* Sidebar */}
      <div className={`fixed md:static z-30 w-56 h-full bg-white border-r shadow-sm flex-shrink-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`} style={{ borderColor: '#F0DED0' }}>
        <div className="p-4 border-b" style={{ borderColor: '#F0DED0' }}>
          <h2 className="font-bold text-lg" style={{ color: '#FF6B35' }}>Restaurant</h2>
          <p className="text-xs" style={{ color: '#9C7A5A' }}>Spice Kitchen</p>
        </div>
        <nav className="p-2 space-y-1">
          {SIDEBAR_ITEMS.map(item => (
            <button key={item.key} onClick={() => { setActiveSection(item.key); setSidebarOpen(false) }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all" style={{ backgroundColor: activeSection === item.key ? '#FFF8F0' : 'transparent', color: activeSection === item.key ? '#FF6B35' : '#6B4423' }}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 md:py-6 space-y-6">
          <h1 className="text-xl font-bold pl-12 md:pl-0" style={{ color: '#2D1810' }}>
            {SIDEBAR_ITEMS.find(s => s.key === activeSection)?.label ?? 'Dashboard'}
          </h1>

          {/* Dashboard */}
          {activeSection === 'dashboard' && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                    <p className="text-xs font-medium" style={{ color: '#9C7A5A' }}>{s.label}</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
                    {s.change && <p className="text-xs mt-0.5" style={{ color: '#4CAF50' }}>{s.change}</p>}
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                <h3 className="font-bold text-sm mb-3" style={{ color: '#2D1810' }}>Recent Orders</h3>
                {orders.slice(0, 3).map(o => (
                  <div key={o.id} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: '#F0DED0' }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#2D1810' }}>{o.id} - {o.customer}</p>
                      <p className="text-xs" style={{ color: '#9C7A5A' }}>{o.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold" style={{ color: '#2D1810' }}>Rs. {o.amount}</p>
                      <Badge className="text-xs" style={{ backgroundColor: o.status === 'pending' ? '#FFB347' : o.status === 'preparing' ? '#FF6B35' : '#4CAF50', color: '#FFFFFF' }}>{o.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Orders */}
          {activeSection === 'orders' && (
            <>
              <div className="flex gap-2">
                {['all', 'active', 'completed'].map(tab => (
                  <button key={tab} onClick={() => setOrderTab(tab)} className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all" style={{ backgroundColor: orderTab === tab ? '#FF6B35' : '#FFFFFF', color: orderTab === tab ? '#FFFFFF' : '#6B4423', border: `1px solid ${orderTab === tab ? '#FF6B35' : '#F0DED0'}` }}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {filteredOrders.map(o => (
                  <div key={o.id} className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm" style={{ color: '#2D1810' }}>{o.id}</p>
                          <Badge className="text-xs capitalize" style={{ backgroundColor: o.status === 'pending' ? '#FFB347' : o.status === 'preparing' ? '#FF6B35' : '#4CAF50', color: '#FFFFFF' }}>{o.status}</Badge>
                        </div>
                        <p className="text-sm mt-1" style={{ color: '#6B4423' }}>{o.customer}</p>
                        <p className="text-xs" style={{ color: '#9C7A5A' }}>{o.items}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: '#9C7A5A' }}>
                          <FiClock className="w-3 h-3" />{o.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold" style={{ color: '#2D1810' }}>Rs. {o.amount}</p>
                        {o.status === 'pending' && (
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => updateOrderStatus(o.id, 'preparing')} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
                              <FiCheck className="w-4 h-4" style={{ color: '#4CAF50' }} />
                            </button>
                            <button onClick={() => updateOrderStatus(o.id, 'rejected')} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFEBEE' }}>
                              <FiX className="w-4 h-4" style={{ color: '#E53935' }} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Menu */}
          {activeSection === 'menu' && (
            <>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: '#FF6B35' }}>
                <FiPlus className="w-4 h-4" />Add Item
              </button>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ border: '1px solid #F0DED0' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: '#FFF8F0' }}>
                        <th className="text-left px-4 py-3 font-semibold" style={{ color: '#6B4423' }}>Item</th>
                        <th className="text-left px-4 py-3 font-semibold" style={{ color: '#6B4423' }}>Category</th>
                        <th className="text-left px-4 py-3 font-semibold" style={{ color: '#6B4423' }}>Price</th>
                        <th className="text-left px-4 py-3 font-semibold" style={{ color: '#6B4423' }}>Available</th>
                        <th className="text-left px-4 py-3 font-semibold" style={{ color: '#6B4423' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menuItems.map(m => (
                        <tr key={m.id} className="border-t" style={{ borderColor: '#F0DED0' }}>
                          <td className="px-4 py-3 font-medium" style={{ color: '#2D1810' }}>{m.name}</td>
                          <td className="px-4 py-3" style={{ color: '#9C7A5A' }}>{m.category}</td>
                          <td className="px-4 py-3" style={{ color: '#2D1810' }}>Rs. {m.price}</td>
                          <td className="px-4 py-3"><Switch checked={m.available} onCheckedChange={() => toggleAvailability(m.id)} /></td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="p-1.5 rounded hover:bg-orange-50"><FiEdit2 className="w-4 h-4" style={{ color: '#FF6B35' }} /></button>
                              <button className="p-1.5 rounded hover:bg-red-50"><FiTrash2 className="w-4 h-4" style={{ color: '#E53935' }} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Reviews */}
          {activeSection === 'reviews' && (
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-5 shadow-sm text-center" style={{ border: '1px solid #F0DED0' }}>
                <p className="text-4xl font-bold" style={{ color: '#FFB347' }}>4.5</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <FiStar key={s} className="w-5 h-5" style={{ color: s <= 4 ? '#FFB347' : '#F0DED0', fill: s <= 4 ? '#FFB347' : 'none' }} />
                  ))}
                </div>
                <p className="text-xs mt-1" style={{ color: '#9C7A5A' }}>Based on 156 reviews</p>
              </div>
              {MOCK_REVIEWS.map(r => (
                <div key={r.id} className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#FF6B35' }}>{r.customer.charAt(0)}</div>
                      <span className="font-medium text-sm" style={{ color: '#2D1810' }}>{r.customer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <FiStar key={s} className="w-3 h-3" style={{ color: s <= r.rating ? '#FFB347' : '#F0DED0', fill: s <= r.rating ? '#FFB347' : 'none' }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm" style={{ color: '#6B4423' }}>{r.comment}</p>
                  <p className="text-xs mt-1" style={{ color: '#9C7A5A' }}>{r.date}</p>
                </div>
              ))}
            </div>
          )}

          {/* Earnings */}
          {activeSection === 'earnings' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                  <p className="text-xs" style={{ color: '#9C7A5A' }}>Today</p>
                  <p className="text-2xl font-bold" style={{ color: '#4CAF50' }}>Rs. 18,450</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                  <p className="text-xs" style={{ color: '#9C7A5A' }}>This Week</p>
                  <p className="text-2xl font-bold" style={{ color: '#FF6B35' }}>Rs. 98,200</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                  <p className="text-xs" style={{ color: '#9C7A5A' }}>This Month</p>
                  <p className="text-2xl font-bold" style={{ color: '#2D1810' }}>Rs. 3,45,600</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                <h3 className="font-bold text-sm mb-3" style={{ color: '#2D1810' }}>Weekly Trend</h3>
                <div className="flex items-end gap-2 h-40">
                  {[65, 80, 55, 90, 75, 95, 70].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t-lg transition-all" style={{ height: `${h}%`, background: 'linear-gradient(to top, #FF6B35, #FFB347)' }} />
                      <span className="text-xs" style={{ color: '#9C7A5A' }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
