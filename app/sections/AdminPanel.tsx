'use client'

import React, { useState } from 'react'
import { FiGrid, FiUsers, FiShoppingBag, FiPackage, FiBarChart2, FiSearch, FiCheck, FiX, FiTrendingUp, FiTrendingDown, FiMenu, FiEye } from 'react-icons/fi'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

const SIDEBAR_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: FiGrid },
  { key: 'users', label: 'Users', icon: FiUsers },
  { key: 'restaurants', label: 'Restaurants', icon: FiShoppingBag },
  { key: 'orders', label: 'Orders', icon: FiPackage },
  { key: 'reports', label: 'Reports', icon: FiBarChart2 },
]

const MOCK_USERS = [
  { id: 'u1', name: 'Priya Sharma', email: 'priya@email.com', role: 'Customer', orders: 24, status: 'active', joined: 'Jan 2024' },
  { id: 'u2', name: 'Rahul Verma', email: 'rahul@email.com', role: 'Customer', orders: 56, status: 'active', joined: 'Mar 2023' },
  { id: 'u3', name: 'Spice Kitchen', email: 'spice@kitchen.com', role: 'Restaurant', orders: 340, status: 'active', joined: 'Jun 2023' },
  { id: 'u4', name: 'Rajesh Kumar', email: 'rajesh@email.com', role: 'Delivery', orders: 890, status: 'active', joined: 'Aug 2022' },
  { id: 'u5', name: 'Sneha Patel', email: 'sneha@email.com', role: 'Customer', orders: 12, status: 'suspended', joined: 'Nov 2024' },
  { id: 'u6', name: 'Arjun Nair', email: 'arjun@email.com', role: 'Customer', orders: 38, status: 'active', joined: 'Feb 2024' },
]

const MOCK_RESTAURANTS_ADMIN = [
  { id: 'ra1', name: 'Spice Kitchen', owner: 'Chef Karan', cuisine: 'North Indian', status: 'approved', rating: 4.5, orders: 340 },
  { id: 'ra2', name: 'Wok Express', owner: 'Li Wei', cuisine: 'Chinese', status: 'pending', rating: 0, orders: 0 },
  { id: 'ra3', name: 'Pizza Palace', owner: 'Marco D.', cuisine: 'Italian', status: 'approved', rating: 4.2, orders: 210 },
  { id: 'ra4', name: 'Dosa Corner', owner: 'Lakshmi R.', cuisine: 'South Indian', status: 'pending', rating: 0, orders: 0 },
  { id: 'ra5', name: 'Burger Barn', owner: 'Sam K.', cuisine: 'American', status: 'approved', rating: 4.0, orders: 180 },
]

const MOCK_LIVE_ORDERS = [
  { id: 'ORD-2010', customer: 'Arun K.', restaurant: 'Spice Kitchen', amount: 560, status: 'preparing', time: '2 min ago' },
  { id: 'ORD-2009', customer: 'Meera S.', restaurant: 'Pizza Palace', amount: 890, status: 'on_way', time: '8 min ago' },
  { id: 'ORD-2008', customer: 'Dev P.', restaurant: 'Burger Barn', amount: 420, status: 'delivered', time: '15 min ago' },
  { id: 'ORD-2007', customer: 'Isha R.', restaurant: 'Dosa Corner', amount: 310, status: 'preparing', time: '3 min ago' },
  { id: 'ORD-2006', customer: 'Kiran M.', restaurant: 'Wok Express', amount: 640, status: 'placed', time: '1 min ago' },
]

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [userSearch, setUserSearch] = useState('')
  const [users, setUsers] = useState(MOCK_USERS)
  const [restaurants, setRestaurants] = useState(MOCK_RESTAURANTS_ADMIN)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u))
  }

  const approveRestaurant = (id: string) => {
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r))
  }

  const filteredUsers = users.filter(u => !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))

  const stats = [
    { label: 'Total Orders', value: '12,847', change: '+18%', up: true, color: '#FF6B35' },
    { label: 'Active Users', value: '3,291', change: '+5%', up: true, color: '#4CAF50' },
    { label: 'Revenue', value: 'Rs. 48.2L', change: '+22%', up: true, color: '#FFB347' },
    { label: 'Growth', value: '15.3%', change: '-2%', up: false, color: '#D4351C' },
  ]

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Mobile toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="fixed top-4 left-4 z-40 md:hidden w-10 h-10 rounded-lg bg-white shadow-md flex items-center justify-center" style={{ border: '1px solid #F0DED0' }}>
        <FiMenu className="w-5 h-5" style={{ color: '#2D1810' }} />
      </button>

      {/* Sidebar */}
      <div className={`fixed md:static z-30 w-56 h-full bg-white border-r shadow-sm flex-shrink-0 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`} style={{ borderColor: '#F0DED0' }}>
        <div className="p-4 border-b" style={{ borderColor: '#F0DED0' }}>
          <h2 className="font-bold text-lg" style={{ color: '#FF6B35' }}>Admin Panel</h2>
          <p className="text-xs" style={{ color: '#9C7A5A' }}>SwiggyClone Management</p>
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
                    <div className="flex items-center gap-1 mt-1">
                      {s.up ? <FiTrendingUp className="w-3 h-3" style={{ color: '#4CAF50' }} /> : <FiTrendingDown className="w-3 h-3" style={{ color: '#E53935' }} />}
                      <span className="text-xs" style={{ color: s.up ? '#4CAF50' : '#E53935' }}>{s.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Area */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                  <h3 className="font-bold text-sm mb-3" style={{ color: '#2D1810' }}>Orders Trend</h3>
                  <div className="flex items-end gap-1.5 h-32">
                    {[40, 55, 45, 70, 60, 80, 65, 90, 75, 85, 70, 95].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${h}%`, background: 'linear-gradient(to top, #FF6B35, #FFB347)' }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs" style={{ color: '#9C7A5A' }}>
                    <span>Jan</span><span>Jun</span><span>Dec</span>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                  <h3 className="font-bold text-sm mb-3" style={{ color: '#2D1810' }}>Revenue Distribution</h3>
                  <div className="space-y-3">
                    {[{ label: 'Food Orders', pct: 72, color: '#FF6B35' }, { label: 'Delivery Fees', pct: 18, color: '#FFB347' }, { label: 'Commissions', pct: 10, color: '#D4351C' }].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span style={{ color: '#6B4423' }}>{item.label}</span>
                          <span style={{ color: '#2D1810' }}>{item.pct}%</span>
                        </div>
                        <div className="h-2 rounded-full" style={{ backgroundColor: '#F0DED0' }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Users */}
          {activeSection === 'users' && (
            <>
              <div className="relative max-w-md">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9C7A5A' }} />
                <Input placeholder="Search users..." value={userSearch} onChange={e => setUserSearch(e.target.value)} className="pl-10 h-10" style={{ borderColor: '#F0DED0' }} />
              </div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ border: '1px solid #F0DED0' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: '#FFF8F0' }}>
                        <th className="text-left px-4 py-3 font-semibold" style={{ color: '#6B4423' }}>User</th>
                        <th className="text-left px-4 py-3 font-semibold hidden md:table-cell" style={{ color: '#6B4423' }}>Role</th>
                        <th className="text-left px-4 py-3 font-semibold hidden md:table-cell" style={{ color: '#6B4423' }}>Orders</th>
                        <th className="text-left px-4 py-3 font-semibold" style={{ color: '#6B4423' }}>Status</th>
                        <th className="text-left px-4 py-3 font-semibold" style={{ color: '#6B4423' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(u => (
                        <tr key={u.id} className="border-t" style={{ borderColor: '#F0DED0' }}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#FF6B35' }}>{u.name.charAt(0)}</div>
                              <div>
                                <p className="font-medium" style={{ color: '#2D1810' }}>{u.name}</p>
                                <p className="text-xs" style={{ color: '#9C7A5A' }}>{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell"><Badge variant="secondary" className="text-xs" style={{ backgroundColor: '#FFF8F0', color: '#6B4423' }}>{u.role}</Badge></td>
                          <td className="px-4 py-3 hidden md:table-cell" style={{ color: '#6B4423' }}>{u.orders}</td>
                          <td className="px-4 py-3">
                            <Badge className="text-xs" style={{ backgroundColor: u.status === 'active' ? '#E8F5E9' : '#FFEBEE', color: u.status === 'active' ? '#4CAF50' : '#E53935' }}>{u.status}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <button onClick={() => toggleUserStatus(u.id)} className="text-xs font-medium px-3 py-1 rounded-lg" style={{ color: u.status === 'active' ? '#E53935' : '#4CAF50', border: `1px solid ${u.status === 'active' ? '#E53935' : '#4CAF50'}` }}>
                              {u.status === 'active' ? 'Suspend' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Restaurants */}
          {activeSection === 'restaurants' && (
            <>
              {restaurants.filter(r => r.status === 'pending').length > 0 && (
                <div>
                  <h3 className="font-bold text-sm mb-3" style={{ color: '#D4351C' }}>Pending Approvals ({restaurants.filter(r => r.status === 'pending').length})</h3>
                  <div className="space-y-3">
                    {restaurants.filter(r => r.status === 'pending').map(r => (
                      <div key={r.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between" style={{ border: '2px solid #FFB347' }}>
                        <div>
                          <p className="font-bold text-sm" style={{ color: '#2D1810' }}>{r.name}</p>
                          <p className="text-xs" style={{ color: '#9C7A5A' }}>Owner: {r.owner} | {r.cuisine}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => approveRestaurant(r.id)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
                            <FiCheck className="w-4 h-4" style={{ color: '#4CAF50' }} />
                          </button>
                          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFEBEE' }}>
                            <FiX className="w-4 h-4" style={{ color: '#E53935' }} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ border: '1px solid #F0DED0' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ backgroundColor: '#FFF8F0' }}>
                        <th className="text-left px-4 py-3 font-semibold" style={{ color: '#6B4423' }}>Restaurant</th>
                        <th className="text-left px-4 py-3 font-semibold hidden md:table-cell" style={{ color: '#6B4423' }}>Cuisine</th>
                        <th className="text-left px-4 py-3 font-semibold hidden md:table-cell" style={{ color: '#6B4423' }}>Rating</th>
                        <th className="text-left px-4 py-3 font-semibold" style={{ color: '#6B4423' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {restaurants.map(r => (
                        <tr key={r.id} className="border-t" style={{ borderColor: '#F0DED0' }}>
                          <td className="px-4 py-3">
                            <p className="font-medium" style={{ color: '#2D1810' }}>{r.name}</p>
                            <p className="text-xs" style={{ color: '#9C7A5A' }}>{r.owner}</p>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell" style={{ color: '#6B4423' }}>{r.cuisine}</td>
                          <td className="px-4 py-3 hidden md:table-cell" style={{ color: '#6B4423' }}>{r.rating > 0 ? r.rating : '-'}</td>
                          <td className="px-4 py-3">
                            <Badge className="text-xs" style={{ backgroundColor: r.status === 'approved' ? '#E8F5E9' : '#FFF3E0', color: r.status === 'approved' ? '#4CAF50' : '#E65100' }}>{r.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Orders */}
          {activeSection === 'orders' && (
            <div className="space-y-3">
              <h3 className="font-bold text-sm" style={{ color: '#2D1810' }}>Live Order Feed</h3>
              {MOCK_LIVE_ORDERS.map(o => (
                <div key={o.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between" style={{ border: '1px solid #F0DED0' }}>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm" style={{ color: '#2D1810' }}>{o.id}</p>
                      <Badge className="text-xs capitalize" style={{ backgroundColor: o.status === 'placed' ? '#E3F2FD' : o.status === 'preparing' ? '#FFF3E0' : o.status === 'on_way' ? '#E8F5E9' : '#F3E5F5', color: o.status === 'placed' ? '#1976D2' : o.status === 'preparing' ? '#E65100' : o.status === 'on_way' ? '#4CAF50' : '#7B1FA2' }}>
                        {o.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs mt-1" style={{ color: '#6B4423' }}>{o.customer} from {o.restaurant}</p>
                    <p className="text-xs" style={{ color: '#9C7A5A' }}>{o.time}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <p className="font-bold" style={{ color: '#2D1810' }}>Rs. {o.amount}</p>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-50" style={{ border: '1px solid #F0DED0' }}>
                      <FiEye className="w-4 h-4" style={{ color: '#FF6B35' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reports */}
          {activeSection === 'reports' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                  <h3 className="font-bold text-sm mb-3" style={{ color: '#2D1810' }}>Top Restaurants</h3>
                  {[{ name: 'Spice Kitchen', orders: 340, rev: '1.2L' }, { name: 'Pizza Palace', orders: 210, rev: '89K' }, { name: 'Burger Barn', orders: 180, rev: '72K' }].map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: '#F0DED0' }}>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#FF6B35' }}>{i + 1}</span>
                        <span className="text-sm" style={{ color: '#2D1810' }}>{r.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold" style={{ color: '#2D1810' }}>Rs. {r.rev}</p>
                        <p className="text-xs" style={{ color: '#9C7A5A' }}>{r.orders} orders</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm" style={{ border: '1px solid #F0DED0' }}>
                  <h3 className="font-bold text-sm mb-3" style={{ color: '#2D1810' }}>Popular Cuisines</h3>
                  {[{ name: 'North Indian', pct: 35 }, { name: 'Chinese', pct: 22 }, { name: 'Italian', pct: 18 }, { name: 'South Indian', pct: 15 }, { name: 'Other', pct: 10 }].map((c, i) => (
                    <div key={i} className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: '#6B4423' }}>{c.name}</span>
                        <span style={{ color: '#2D1810' }}>{c.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: '#F0DED0' }}>
                        <div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: '#FF6B35' }} />
                      </div>
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
