"use client"

import { OSGameLabLogo } from "@/components/ui/os-gamelab-logo"

export default function MiniQuestLoading() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute inset-0 floating-particles"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <OSGameLabLogo size="sm" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Mini-Quest System
              </h1>
              <p className="text-gray-400 text-sm">Loading...</p>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center space-y-6">
          {/* Loading Animation */}
          <div className="relative">
            <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
            <div className="w-16 h-16 border-4 border-purple-500/30 border-b-purple-500 rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2 animate-reverse"></div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Preparing Quest</h2>
            <p className="text-gray-400">Initializing challenge parameters...</p>
          </div>

          {/* Loading Steps */}
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>Loading questions...</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-200"></div>
              <span>Preparing interface...</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse animation-delay-400"></div>
              <span>Initializing timer...</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
