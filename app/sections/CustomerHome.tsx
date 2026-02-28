'use client'

import React, { useState } from 'react'
import { FiSearch, FiStar, FiClock, FiMapPin, FiShoppingCart, FiChevronDown, FiHeart, FiFilter } from 'react-icons/fi'
import { callAIAgent } from '@/lib/aiAgent'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  deliveryTime: string
  priceRange: string
  tags: string[]
  gradient: string
  popularDishes: string[]
  promoted?: boolean
}

interface CustomerHomeProps {
  restaurants: Restaurant[]
  cart: { id: string; name: string; price: number; qty: number; restaurantId: string }[]
  onSelectRestaurant: (r: Restaurant) => void
  onOpenCart: () => void
  sampleMode: boolean
}

const CATEGORIES = ['All', 'Pizza', 'Biryani', 'Chinese', 'Burgers', 'Desserts', 'South Indian', 'North Indian', 'Thai', 'Italian']
const LOCATIONS = ['Koramangala, Bangalore', 'Indiranagar, Bangalore', 'HSR Layout, Bangalore', 'Whitefield, Bangalore', 'Bandra, Mumbai']

const RECOMMENDATION_AGENT_ID = '69a2cb5a235ba026f0ab6145'

export default function CustomerHome({ restaurants, cart, onSelectRestaurant, onOpenCart, sampleMode }: CustomerHomeProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0])
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [aiRecommendations, setAiRecommendations] = useState<any[]>([])
  const [aiSummary, setAiSummary] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || r.cuisine.toLowerCase().includes(selectedCategory.toLowerCase()) || (Array.isArray(r.tags) && r.tags.some(t => t.toLowerCase().includes(selectedCategory.toLowerCase())))
    return matchesSearch && matchesCategory
  })

  const handleGetRecommendations = async () => {
    setAiLoading(true)
    setAiError('')
    setAiRecommendations([])
    setAiSummary('')
    try {
      const result = await callAIAgent(
        `I am located in ${selectedLocation}. I enjoy diverse cuisines. Please recommend restaurants for me with good ratings and fast delivery.`,
        RECOMMENDATION_AGENT_ID
      )
      if (result.success) {
        const data = result?.response?.result
        const recs = Array.isArray(data?.recommendations) ? data.recommendations : []
        setAiRecommendations(recs)
        setAiSummary(data?.summary ?? '')
      } else {
        setAiError(result?.error ?? 'Failed to get recommendations')
      }
    } catch {
      setAiError('Network error. Please try again.')
    }
    setAiLoading(false)
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF8F0' }}>
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white shadow-sm border-b" style={{ borderColor: '#F0DED0' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold" style={{ color: '#FF6B35' }}>SwiggyClone</h1>
            <div className="relative">
              <button onClick={() => setShowLocationDropdown(!showLocationDropdown)} className="flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg hover:bg-orange-50 transition-colors" style={{ color: '#2D1810' }}>
                <FiMapPin className="w-4 h-4" style={{ color: '#FF6B35' }} />
                <span className="max-w-[180px] truncate">{selectedLocation}</span>
                <FiChevronDown className="w-3 h-3" style={{ color: '#9C7A5A' }} />
              </button>
              {showLocationDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border py-1 z-50 min-w-[240px]" style={{ borderColor: '#F0DED0' }}>
                  {LOCATIONS.map(loc => (
                    <button key={loc} onClick={() => { setSelectedLocation(loc); setShowLocationDropdown(false) }} className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 transition-colors" style={{ color: loc === selectedLocation ? '#FF6B35' : '#2D1810' }}>
                      <FiMapPin className="w-3 h-3 inline mr-2" />{loc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button onClick={onOpenCart} className="relative p-2 rounded-full hover:bg-orange-50 transition-colors">
            <FiShoppingCart className="w-5 h-5" style={{ color: '#2D1810' }} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold" style={{ backgroundColor: '#D4351C' }}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#9C7A5A' }} />
          <Input placeholder="Search for restaurants, cuisines..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 h-12 rounded-xl text-sm border-2 focus:ring-2 focus:ring-orange-200" style={{ borderColor: '#F0DED0', backgroundColor: '#FFFFFF', color: '#2D1810' }} />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-orange-50">
            <FiFilter className="w-4 h-4" style={{ color: '#9C7A5A' }} />
          </button>
        </div>

        {/* Category Chips */}
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200" style={{ backgroundColor: selectedCategory === cat ? '#FF6B35' : '#FFFFFF', color: selectedCategory === cat ? '#FFFFFF' : '#6B4423', border: `1.5px solid ${selectedCategory === cat ? '#FF6B35' : '#F0DED0'}` }}>
                {cat}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* AI Recommendation CTA */}
        <div className="rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FFB347 50%, #FFD93D 100%)' }} onClick={!aiLoading ? handleGetRecommendations : undefined}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <FiStar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Get Personalized Picks</h3>
              <p className="text-white/80 text-sm">AI-powered restaurant recommendations just for you</p>
            </div>
          </div>
        </div>

        {/* AI Loading */}
        {aiLoading && (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse" style={{ border: '1px solid #F0DED0' }}>
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg" style={{ backgroundColor: '#F0DED0' }} />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 rounded w-3/4" style={{ backgroundColor: '#F0DED0' }} />
                    <div className="h-3 rounded w-1/2" style={{ backgroundColor: '#F0DED0' }} />
                    <div className="h-3 rounded w-1/4" style={{ backgroundColor: '#F0DED0' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Error */}
        {aiError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm" style={{ color: '#E53935' }}>
            {aiError}
          </div>
        )}

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <div className="space-y-3">
            {aiSummary && <p className="text-sm font-medium" style={{ color: '#6B4423' }}>{aiSummary}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiRecommendations.map((rec, idx) => (
                <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer" style={{ border: '1.5px solid #FFB347' }} onClick={() => onSelectRestaurant({ id: `ai-${idx}`, name: rec?.restaurant_name ?? 'Restaurant', cuisine: rec?.cuisine_type ?? '', rating: rec?.rating ?? 0, deliveryTime: `${rec?.delivery_time_minutes ?? 30} min`, priceRange: rec?.price_range ?? '', tags: Array.isArray(rec?.popular_dishes) ? rec.popular_dishes : [], gradient: 'linear-gradient(135deg, #FF6B35, #FFB347)', popularDishes: Array.isArray(rec?.popular_dishes) ? rec.popular_dishes : [] })}>
                  <div className="h-32 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6B35, #FFB347)' }}>
                    <FiStar className="w-10 h-10 text-white/50" />
                  </div>
                  <div className="p-3 space-y-2">
                    <h4 className="font-bold text-sm" style={{ color: '#2D1810' }}>{rec?.restaurant_name ?? 'Restaurant'}</h4>
                    <p className="text-xs" style={{ color: '#6B4423' }}>{rec?.cuisine_type ?? ''}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold text-white" style={{ backgroundColor: '#4CAF50' }}><FiStar className="w-3 h-3" />{rec?.rating ?? '-'}</span>
                      <span className="flex items-center gap-1" style={{ color: '#9C7A5A' }}><FiClock className="w-3 h-3" />{rec?.delivery_time_minutes ?? '-'} min</span>
                      <span style={{ color: '#9C7A5A' }}>{rec?.price_range ?? ''}</span>
                    </div>
                    {rec?.recommendation_reason && <p className="text-xs italic" style={{ color: '#9C7A5A' }}>{rec.recommendation_reason}</p>}
                    {Array.isArray(rec?.popular_dishes) && rec.popular_dishes.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {rec.popular_dishes.slice(0, 3).map((d: string, di: number) => (
                          <Badge key={di} variant="secondary" className="text-xs" style={{ backgroundColor: '#FFF8F0', color: '#FF6B35', border: '1px solid #FFB347' }}>{d}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Restaurant Grid */}
        <div>
          <h2 className="text-lg font-bold mb-4" style={{ color: '#2D1810' }}>
            {selectedCategory === 'All' ? 'All Restaurants' : selectedCategory + ' Restaurants'}
            <span className="text-sm font-normal ml-2" style={{ color: '#9C7A5A' }}>({filteredRestaurants.length} places)</span>
          </h2>
          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <FiSearch className="w-12 h-12 mx-auto mb-3" style={{ color: '#F0DED0' }} />
              <p className="font-medium" style={{ color: '#6B4423' }}>No restaurants found</p>
              <p className="text-sm" style={{ color: '#9C7A5A' }}>Try a different search or category</p>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRestaurants.map(r => (
              <div key={r.id} onClick={() => onSelectRestaurant(r)} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group" style={{ border: '1px solid #F0DED0' }}>
                <div className="h-40 relative flex items-center justify-center" style={{ background: r.gradient }}>
                  {r.promoted && <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold text-white" style={{ backgroundColor: '#D4351C' }}>PROMOTED</span>}
                  <button onClick={e => { e.stopPropagation(); toggleFavorite(r.id) }} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
                    <FiHeart className="w-4 h-4" style={{ color: favorites.has(r.id) ? '#D4351C' : '#9C7A5A', fill: favorites.has(r.id) ? '#D4351C' : 'none' }} />
                  </button>
                  <span className="text-4xl text-white/30 font-bold group-hover:scale-110 transition-transform">{r.cuisine.charAt(0)}</span>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-sm" style={{ color: '#2D1810' }}>{r.name}</h3>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold text-white" style={{ backgroundColor: r.rating >= 4 ? '#4CAF50' : '#FFB347' }}><FiStar className="w-3 h-3" />{r.rating}</span>
                  </div>
                  <p className="text-xs" style={{ color: '#6B4423' }}>{r.cuisine}</p>
                  <div className="flex items-center gap-3 text-xs" style={{ color: '#9C7A5A' }}>
                    <span className="flex items-center gap-1"><FiClock className="w-3 h-3" />{r.deliveryTime}</span>
                    <span>{r.priceRange}</span>
                  </div>
                  {Array.isArray(r.tags) && r.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {r.tags.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFF8F0', color: '#9C7A5A', border: '1px solid #F0DED0' }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
