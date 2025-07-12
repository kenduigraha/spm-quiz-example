'use client'

import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 text-gray-900">
      {children}
    </main>
  )
}
