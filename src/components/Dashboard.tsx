'use client'

import React, { useState } from 'react'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Post } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import PostModal from './PostModal'

export default function Dashboard() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])

  const [selectedDate, setSelectedDate] = useState('latest')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const handleAddPost = () => {
    setEditingPost(null)
    setIsModalOpen(true)
  }

  const handleEditPost = (post: Post) => {
    setEditingPost(post)
    setIsModalOpen(true)
  }

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== postId))
    }
  }

  const handleSavePost = (postData: Omit<Post, 'id'>) => {
    if (editingPost) {
      setPosts(posts.map(p =>
        p.id === editingPost.id
          ? { ...postData, id: editingPost.id }
          : p
      ))
    } else {
      const newPost: Post = {
        ...postData,
        id: Date.now().toString()
      }
      setPosts([newPost, ...posts])
    }
    setIsModalOpen(false)
    setEditingPost(null)
  }

  const renderSection = (title: string, verses: string[], icon?: string) => {
    if (!verses || verses.length === 0) return null

    return (
      <div className="mb-8">
        <div className="section-title text-xl font-bold">
          {icon && <span className="text-2xl">{icon}</span>}
          <span className="gradient-text">{title}</span>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/30 shadow-lg">
          {title === 'Intercessor' ? (
            <div className="p-4 glass rounded-xl bg-accent/5 border border-accent/20 font-medium text-primary italic text-lg leading-relaxed">
              "{verses[0]}"
            </div>
          ) : (
            <div className="space-y-3">
              {verses.map((verse, index) => (
                <div key={index} className="p-4 glass rounded-xl bg-gradient-to-r from-white/50 to-blue-50/30 border border-white/40 font-medium text-primary hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]">
                  <span className="text-accent font-bold mr-2">{index + 1}.</span>
                  {verse}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-primary mb-4 relative">
            <span className="gradient-text">Church Dashboard</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-accent via-purple to-electric rounded-full mx-auto"></div>
          <p className="text-slate-600 text-lg mt-4 max-w-2xl mx-auto">
            Explore our spiritual content, daily verses, and community updates
          </p>
        </div>

        {/* Controls */}
        <div className="card p-8 mb-12 animate-fade-in [animation-delay:200ms]">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <label htmlFor="dateSelect" className="font-semibold text-primary text-lg flex items-center gap-2">
                <span className="text-accent">📅</span>
                Select Date:
              </label>
              <select
                id="dateSelect"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="input min-w-52 text-base"
              >
                <option value="latest">✨ Latest Content</option>
                <option value="2024-01-15">January 15, 2024</option>
                <option value="2024-01-08">January 8, 2024</option>
                <option value="2024-01-01">January 1, 2024</option>
              </select>
            </div>
            {user && (
              <button
                onClick={handleAddPost}
                className="btn-success flex items-center gap-3 text-base px-8 py-3"
              >
                <Plus className="w-5 h-5" />
                Create New Post
              </button>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-10">
          {posts.map((post, index) => (
            <div key={post.id} className="card p-8 animate-slide-up" style={{animationDelay: `${(index + 1) * 100}ms`}}>
              {/* Post Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 pb-6 border-b border-white/30">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-accent to-purple text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg">
                    {formatDate(post.date)}
                  </div>
                  <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                </div>
                {user && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="btn-primary flex items-center gap-2 text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Post
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="btn-danger flex items-center gap-2 text-sm"
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
          ))}

          {posts.length === 0 && (
            <div className="card p-16 text-center animate-fade-in">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-accent/20 to-purple/20 rounded-full mx-auto flex items-center justify-center mb-4">
                  <span className="text-4xl">📖</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3 gradient-text">No Posts Yet</h3>
              <p className="text-slate-600 text-lg mb-6 max-w-md mx-auto">
                Start sharing spiritual content with your community by creating your first post.
              </p>
              {user && (
                <button
                  onClick={handleAddPost}
                  className="btn-primary flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Post
                </button>
              )}
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