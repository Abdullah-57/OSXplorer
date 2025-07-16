"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Lock,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Target,
  Lightbulb,
  Zap,
  Shield,
  Flame,
} from "lucide-react"
import Link from "next/link"

// Level status types
type LevelStatus = "completed" | "in-progress" | "locked" | "available"

interface Level {
  id: string
  title: string
  description: string
  difficulty: number // 1-5 stars
  status: LevelStatus
  xpReward: number
  visualType?: "critical" | "mutex" | "semaphore" | "producer" | "dining"
}

interface LevelSection {
  id: string
  title: string
  subtitle: string
  levels: Level[]
}

const levelSections: LevelSection[] = [
  {
    id: "critical-section",
    title: "Critical Section",
    subtitle: "Manage concurrent access to resources",
    levels: [
      {
        id: "critical-section-l1",
        title: "Two Threads",
        description: "Basic critical section with two threads",
        difficulty: 2,
        status: "completed",
        xpReward: 70,
        visualType: "critical",
      },
      {
        id: "critical-section-l2",
        title: "Three Threads Shared Path",
        description: "Handle three concurrent threads",
        difficulty: 3,
        status: "completed",
        xpReward: 90,
        visualType: "critical",
      },
    ],
  },
  {
    id: "mutex",
    title: "Mutex",
    subtitle: "Mutual exclusion locks",
    levels: [
      {
        id: "mutex-l1",
        title: "Simple Lock",
        description: "Basic mutex implementation",
        difficulty: 2,
        status: "available",
        xpReward: 75,
        visualType: "mutex",
      },
      {
        id: "mutex-l2",
        title: "Multi-threaded Lock",
        description: "Multiple threads with mutex",
        difficulty: 3,
        status: "locked",
        xpReward: 95,
        visualType: "mutex",
      },
    ],
  },
  {
    id: "binary-semaphore",
    title: "Binary Semaphore",
    subtitle: "Binary signaling mechanisms",
    levels: [
      {
        id: "binary-semaphore-l1",
        title: "Simple Wait-Signal",
        description: "Basic binary semaphore operations",
        difficulty: 2,
        status: "locked",
        xpReward: 80,
        visualType: "semaphore",
      },
      {
        id: "binary-semaphore-l2",
        title: "Pre-loaded Queues",
        description: "Handle queued semaphore requests",
        difficulty: 3,
        status: "locked",
        xpReward: 100,
        visualType: "semaphore",
      },
    ],
  },
  {
    id: "counting-semaphore",
    title: "Counting Semaphore",
    subtitle: "Resource counting mechanisms",
    levels: [
      {
        id: "counting-semaphore-l1",
        title: "Parking Lot Scenario",
        description: "Manage limited parking spaces",
        difficulty: 3,
        status: "locked",
        xpReward: 85,
        visualType: "semaphore",
      },
      {
        id: "counting-semaphore-l2",
        title: "Resource Topology",
        description: "Complex resource management",
        difficulty: 4,
        status: "locked",
        xpReward: 110,
        visualType: "semaphore",
      },
    ],
  },
  {
    id: "producer-consumer",
    title: "Producer-Consumer",
    subtitle: "Buffer management problems",
    levels: [
      {
        id: "producer-consumer-l1",
        title: "One Producer-Consumer",
        description: "Single producer and consumer",
        difficulty: 3,
        status: "locked",
        xpReward: 90,
        visualType: "producer",
      },
      {
        id: "producer-consumer-l2",
        title: "Multiple Producers",
        description: "Handle multiple producer threads",
        difficulty: 4,
        status: "locked",
        xpReward: 115,
        visualType: "producer",
      },
      {
        id: "producer-consumer-l3",
        title: "Buffer Overflow",
        description: "Prevent buffer overflow scenarios",
        difficulty: 4,
        status: "locked",
        xpReward: 125,
        visualType: "producer",
      },
    ],
  },
  {
    id: "dining-philosophers",
    title: "Dining Philosophers",
    subtitle: "Classic deadlock scenarios",
    levels: [
      {
        id: "dining-philosophers-l1",
        title: "Circular Deadlock",
        description: "Identify and resolve circular deadlock",
        difficulty: 4,
        status: "locked",
        xpReward: 120,
        visualType: "dining",
      },
      {
        id: "dining-philosophers-l2",
        title: "Philosopher's Duty",
        description: "Implement deadlock prevention",
        difficulty: 5,
        status: "locked",
        xpReward: 150,
        visualType: "dining",
      },
    ],
  },
]

const statsData = {
  totalXP: 160,
  currentThreshold: 2,
  nextUnlock: 3,
  nextAchievement: {
    name: "Sync Master",
    progress: 33,
    description: "Master all synchronization primitives",
  },
}

const syncTips = [
  "Critical sections must be atomic operations",
  "Deadlocks occur with circular wait conditions",
  "Semaphores control access to shared resources",
  "Always release locks in reverse acquisition order",
  "Starvation can occur with unfair scheduling",
]

function SyncVisualization({ type, level }: { type?: string; level: Level }) {
  if (type === "critical") {
    return (
      <div className="flex items-center justify-center mb-3">
        <div className="relative">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>
    )
  }

  if (type === "mutex") {
    return (
      <div className="flex items-center justify-center mb-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Lock className="w-4 h-4 text-white" />
        </div>
      </div>
    )
  }

  if (type === "semaphore") {
    return (
      <div className="flex items-center justify-center space-x-1 mb-3">
        <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">S</span>
        </div>
        <div className="flex flex-col space-y-1">
          <div className="w-2 h-1 bg-cyan-400 rounded" />
          <div className="w-2 h-1 bg-cyan-400 rounded" />
          <div className="w-2 h-1 bg-gray-600 rounded" />
        </div>
      </div>
    )
  }

  if (type === "producer") {
    return (
      <div className="flex items-center justify-center space-x-2 mb-3">
        <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded" />
        <div className="flex space-x-1">
          <div className="w-2 h-4 bg-cyan-400 rounded-sm" />
          <div className="w-2 h-4 bg-cyan-400 rounded-sm" />
          <div className="w-2 h-4 bg-gray-600 rounded-sm" />
        </div>
        <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded" />
      </div>
    )
  }

  if (type === "dining") {
    return (
      <div className="flex items-center justify-center mb-3">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 border-2 border-yellow-400 rounded-full" />
          <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
          <div className="absolute bottom-1 left-2 w-1.5 h-1.5 bg-green-500 rounded-full" />
        </div>
      </div>
    )
  }

  // Default visualization
  return (
    <div className="flex items-center justify-center mb-3">
      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
        <Zap className="w-4 h-4 text-white" />
      </div>
    </div>
  )
}

function LevelCard({ level, sectionId }: { level: Level; sectionId: string }) {
  const getStatusIcon = () => {
    switch (level.status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "locked":
        return <Lock className="w-4 h-4 text-gray-500" />
      default:
        return <Play className="w-4 h-4 text-cyan-400" />
    }
  }

  const getStatusColor = () => {
    switch (level.status) {
      case "completed":
        return "border-green-500/50 bg-green-900/20"
      case "in-progress":
        return "border-yellow-500/50 bg-yellow-900/20"
      case "locked":
        return "border-gray-600/50 bg-gray-900/50"
      default:
        return "border-cyan-500/50 bg-cyan-900/20"
    }
  }

  const getStatusText = () => {
    switch (level.status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "locked":
        return "Locked"
      default:
        return "Available"
    }
  }

  const isPlayable = level.status === "available" || level.status === "in-progress"

  return (
    <Card className={`level-card transition-all duration-300 hover:scale-105 ${getStatusColor()}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {level.id.toUpperCase()}
          </Badge>
          <div className="flex items-center space-x-1">
            {getStatusIcon()}
            <span className="text-xs text-gray-400">{getStatusText()}</span>
          </div>
        </div>
        <SyncVisualization type={level.visualType} level={level} />
        <CardTitle className="text-lg text-white">{level.title}</CardTitle>
        <CardDescription className="text-gray-400 text-sm">{level.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < level.difficulty ? "text-yellow-400 fill-current" : "text-gray-600"}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400">+{level.xpReward} XP</span>
        </div>
        <Button
          className={`w-full ${
            isPlayable ? "neon-button-primary" : "bg-gray-700 text-gray-400 cursor-not-allowed hover:bg-gray-700"
          }`}
          disabled={!isPlayable}
        >
          <Play className="w-4 h-4 mr-2" />
          {level.status === "locked" ? "Locked" : "Play"}
        </Button>
        {level.status === "completed" && (
          <Button
            className="w-full mt-5 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
            variant="outline"
            asChild
          >
            <Link href="/level-results">View Results</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

function MiniQuestCard({ sectionIndex, unlocked }: { sectionIndex: number; unlocked: boolean }) {
  return (
    <div className="md:col-span-2 lg:col-span-3 mb-6">
      <Card className="w-full bg-gradient-to-r from-red-400 to-red-800 border-red-500/50 text-white shadow-lg transition-all duration-300 hover:scale-105">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Mini-Quest
            </CardTitle>
            <CardDescription className="text-gray-200 mt-1">
              Complete this Mini-Quest to unlock the next topic!
            </CardDescription>
          </div>
          <div>
            {unlocked ? (
              <Button
                className="neon-button-primary bg-white hover:bg-red-200 font-bold"
                asChild
              >
                <Link href={`/mini-quest/process-synchronization/overview`}>
                  <Flame className="w-4 h-4 mr-2 text-white" />
                  Start Mini-Quest
                </Link>
              </Button>
            ) : (
              <Button disabled className="bg-gray-700 text-gray-400 cursor-not-allowed">
                <Lock className="w-4 h-4 mr-2" />
                Locked
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export default function ProcessSynchronizationModule() {
  // Determine unlock state for each section's mini-quest
  const isSectionCompleted = (sectionIdx: number) => {
    if (sectionIdx === 0) return true // First section always unlocked
    // All levels in previous section must be completed
    const prevSection = levelSections[sectionIdx - 1]
    return prevSection.levels.every((lvl) => lvl.status === "completed")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="floating-particles"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-3">
            {/* Back Button and Title */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                Critical Chase
              </h1>
              <p className="text-xl text-gray-300">Master Process Synchronization</p>
            </div>

            {/* Level Sections with Mini-Quest Cards */}
            <div className="space-y-12">
              {levelSections.map((section, idx) => (
                <div key={section.id}>
                  {/* Mini-Quest Card before each section except the first */}
                  {idx > 0 && (
                    <MiniQuestCard sectionIndex={idx} unlocked={isSectionCompleted(idx)} />
                  )}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-1">{section.title}</h2>
                    <p className="text-gray-400">{section.subtitle}</p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.levels.map((level) => (
                      <LevelCard key={level.id} level={level} sectionId={section.id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Synchronization Stats */}
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Zap className="w-5 h-5 mr-2 text-red-500" />
                    Synchronization Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total XP:</span>
                    <span className="text-white font-bold">{statsData.totalXP}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Threshold:</span>
                    <span className="text-white font-bold">Level {statsData.currentThreshold}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Unlock:</span>
                    <span className="text-white font-bold">Level {statsData.nextUnlock}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Next Achievement */}
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Target className="w-5 h-5 mr-2 text-green-500" />
                    Next Achievement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">{statsData.nextAchievement.name}</span>
                      <span className="text-sm text-gray-400">{statsData.nextAchievement.progress}%</span>
                    </div>
                    <Progress value={statsData.nextAchievement.progress} className="h-2" />
                    <p className="text-sm text-gray-400">{statsData.nextAchievement.description}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Sync Tips */}
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Lightbulb className="w-5 h-5 mr-2 text-cyan-400" />
                    Sync Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {syncTips.map((tip, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Active Challenge */}
              <Card className="bg-gradient-to-r from-red-900 to-orange-900 border-red-500/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Trophy className="w-5 h-5 mr-2 text-red-400" />
                    Active Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Race Condition Master</h4>
                    <p className="text-sm text-gray-300">Solve critical section problems without deadlocks</p>
                    <div className="text-xs text-gray-400">Ends in 3 days</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
