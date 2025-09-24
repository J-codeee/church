'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Post } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import PostModal from './PostModal'

export default function Dashboard() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedDate, setSelectedDate] = useState('latest')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  // Fetch posts from database on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/daily-content/all')
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        } else {
          console.error('Failed to fetch posts')
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Get unique dates from posts and sort them (latest first)
  const availableDates = useMemo(() => {
    const uniqueDates = Array.from(new Set(posts.map(post => post.date)))
    return uniqueDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  }, [posts])

  // Get the latest date for default selection
  const latestDate = availableDates[0] || null

  // Update selectedDate when posts change and we have a latest date
  useEffect(() => {
    if (latestDate && selectedDate === 'latest') {
      // Keep it as 'latest' for display purposes
    }
  }, [latestDate, selectedDate])

  // Filter posts based on selected date
  const filteredPosts = useMemo(() => {
    if (selectedDate === 'latest') {
      return latestDate ? posts.filter(post => post.date === latestDate) : []
    }
    return posts.filter(post => post.date === selectedDate)
  }, [posts, selectedDate, latestDate])

  const handleAddPost = () => {
    setEditingPost(null)
    setIsModalOpen(true)
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setIsModalOpen(true)
  }

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`/api/daily-content/delete?id=${postId}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          // Refresh posts from database
          const postsResponse = await fetch('/api/daily-content/all')
          if (postsResponse.ok) {
            const updatedPosts = await postsResponse.json()
            setPosts(updatedPosts)
          }
        } else {
          console.error('Failed to delete post')
          alert('Failed to delete post. Please try again.')
        }
      } catch (error) {
        console.error('Error deleting post:', error)
        alert('Error deleting post. Please try again.')
      }
    }
  }

  const handleSavePost = async (postData: Omit<Post, 'id'>) => {
    try {
      const response = await fetch('/api/daily-content/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        // Refresh posts from database
        const postsResponse = await fetch('/api/daily-content/all')
        if (postsResponse.ok) {
          const updatedPosts = await postsResponse.json()
          setPosts(updatedPosts)
        }

        setIsModalOpen(false)
        setEditingPost(null)
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('Failed to save post:', errorData)
        alert(`Failed to save post: ${errorData.error || 'Please try again.'}${errorData.details ? `\n\nDetails: ${errorData.details}` : ''}`)
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert(`Error saving post: ${error instanceof Error ? error.message : 'Please try again.'}`)
    }
  }

  const renderSection = (title: string, verses: string[], icon?: string) => {
    if (!verses || verses.length === 0) return null

    return (
      <div className="mb-6">
        <div className="section-title">
          {icon && <span className="text-lg">{icon}</span>}
          {title}
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-accent">
          {title === 'Intercessor' ? (
            <div className="p-2">{verses[0]}</div>
          ) : (
            verses.map((verse, index) => (
              <div key={index} className="py-2 px-3 mb-2 last:mb-0 bg-white rounded border font-medium text-primary">
                {verse}
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-center text-primary mb-12 relative">
          Church Dashboard
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gold rounded-full"></div>
        </h1>

        {/* Controls */}
        <div className="card p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <label htmlFor="dateSelect" className="font-medium text-primary">
              Select Date:
            </label>
            <select
              id="dateSelect"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input w-auto min-w-48"
            >
              {availableDates.length > 0 && latestDate ? (
                <>
                  <option value="latest">Latest ({formatDate(latestDate)})</option>
                  {availableDates.map((date, index) => (
                    <option key={date} value={date}>
                      {formatDate(date)} {index === 0 ? '(Latest)' : ''}
                    </option>
                  ))}
                </>
              ) : (
                <option value="latest">No posts available</option>
              )}
            </select>
          </div>
          {user && (
            <button
              onClick={handleAddPost}
              className="btn btn-success flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New Post
            </button>
          )}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {loading ? (
            <div className="card p-12 text-center">
              <p className="text-slate-500 text-lg">Loading posts...</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
            <div key={post.id} className="card p-6 hover:shadow-xl transition-all duration-300">
              {/* Post Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-200">
                <div className="bg-accent/10 text-accent px-3 py-1.5 rounded-lg font-medium">
                  {formatDate(post.date)}
                </div>
                {user && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="btn btn-danger flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Post Content */}
              {post.intercessor && renderSection('Intercessor', [post.intercessor])}
              {renderSection('Opening', post.opening, '📖')}
              {renderSection('Lessons', post.lessons, '📖')}
              {renderSection('Vision(Vediente)', post.vision, '📖')}
              {renderSection('Speaker(Parlante)', post.speaker, '📖')}

              {/* Custom Sections */}
              {post.customSections.map((section, index) => (
                <div key={index}>
                  {renderSection(section.title, section.verses, '📖')}
                </div>
              ))}
            </div>
          ))
          )}

          {!loading && filteredPosts.length === 0 && (
            <div className="card p-12 text-center">
              <p className="text-slate-500 text-lg italic">
                {posts.length === 0 ? 'No posts available' : 'No posts found for selected date'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <PostModal
          post={editingPost}
          onSave={handleSavePost}
          onClose={() => {
            setIsModalOpen(false)
            setEditingPost(null)
          }}
        />
      )}
    </div>
  )
}