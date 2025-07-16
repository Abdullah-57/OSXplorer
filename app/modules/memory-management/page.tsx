"use client"
import { useState } from "react"
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
  Flame,
  HardDrive,
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
  visualType?: "blocks" | "segments" | "pages"
}

interface LevelSection {
  id: string
  title: string
  subtitle: string
  levels: Level[]
}

const levelSections: LevelSection[] = [
  {
    id: "first-fit",
    title: "First Fit",
    subtitle: "First available memory hole",
    levels: [
      {
        id: "first-fit-l1",
        title: "Basic Allocation",
        description: "Simple first-fit memory allocation",
        difficulty: 2,
        status: "completed",
        xpReward: 60,
        visualType: "blocks",
      },
      {
        id: "first-fit-l2",
        title: "High Fragmentation",
        description: "Handle memory fragmentation issues",
        difficulty: 3,
        status: "completed",
        xpReward: 80,
        visualType: "blocks",
      },
    ],
  },
  {
    id: "best-fit",
    title: "Best Fit",
    subtitle: "Find smallest suitable hole",
    levels: [
      {
        id: "best-fit-l1",
        title: "Perfect Holes",
        description: "Find exact-size memory holes",
        difficulty: 2,
        status: "available",
        xpReward: 65,
        visualType: "blocks",
      },
      {
        id: "best-fit-l2",
        title: "Hole Minimization",
        description: "Minimize leftover hole sizes",
        difficulty: 3,
        status: "locked",
        xpReward: 85,
        visualType: "blocks",
      },
    ],
  },
  {
    id: "worst-fit",
    title: "Worst Fit",
    subtitle: "Use largest available hole",
    levels: [
      {
        id: "worst-fit-l1",
        title: "Blast Match",
        description: "Allocate using largest holes",
        difficulty: 2,
        status: "locked",
        xpReward: 70,
        visualType: "blocks",
      },
      {
        id: "worst-fit-l2",
        title: "Fragmentation Evolution",
        description: "Observe fragmentation patterns",
        difficulty: 3,
        status: "locked",
        xpReward: 90,
        visualType: "blocks",
      },
    ],
  },
  {
    id: "paging",
    title: "Paging",
    subtitle: "Fixed-size memory blocks",
    levels: [
      {
        id: "paging-l1",
        title: "Simple Load Pages",
        description: "Basic page loading mechanism",
        difficulty: 3,
        status: "locked",
        xpReward: 75,
        visualType: "pages",
      },
      {
        id: "paging-l2",
        title: "Page Faults",
        description: "Handle page fault scenarios",
        difficulty: 4,
        status: "locked",
        xpReward: 95,
        visualType: "pages",
      },
      {
        id: "paging-l3",
        title: "Page Table Mapping",
        description: "Manage page table translations",
        difficulty: 4,
        status: "locked",
        xpReward: 110,
        visualType: "pages",
      },
    ],
  },
  {
    id: "segmentation",
    title: "Segmentation",
    subtitle: "Variable-size memory segments",
    levels: [
      {
        id: "segmentation-l1",
        title: "Basic Segment Loading",
        description: "Simple segment allocation",
        difficulty: 3,
        status: "locked",
        xpReward: 80,
        visualType: "segments",
      },
      {
        id: "segmentation-l2",
        title: "Overlapping & Gaps",
        description: "Handle segment overlaps and gaps",
        difficulty: 4,
        status: "locked",
        xpReward: 100,
        visualType: "segments",
      },
    ],
  },
  {
    id: "fragmentation",
    title: "Fragmentation & Compaction",
    subtitle: "Memory optimization techniques",
    levels: [
      {
        id: "fragmentation-l1",
        title: "Fragmentation Metrics",
        description: "Analyze memory fragmentation",
        difficulty: 4,
        status: "locked",
        xpReward: 105,
        visualType: "blocks",
      },
      {
        id: "fragmentation-l2",
        title: "Compaction Logic",
        description: "Implement memory compaction",
        difficulty: 5,
        status: "locked",
        xpReward: 130,
        visualType: "blocks",
      },
    ],
  },
]

const statsData = {
  totalXP: 140,
  levelsCompleted: 2,
  currentStreak: 5,
  nextAchievement: {
    name: "Memory Master",
    progress: 40,
    description: "Complete all allocation algorithms",
  },
}

const memoryTips = [
  "First Fit is fastest but causes fragmentation",
  "Best Fit minimizes wasted space",
  "Worst Fit reduces small unusable holes",
  "Paging eliminates external fragmentation",
  "Segmentation supports logical program structure",
]

function MemoryVisualization({ type, level }: { type?: string; level: Level }) {
  if (type === "pages") {
    return (
      <div className="flex space-x-1 mb-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-6 rounded-sm ${i < 5 ? "bg-gradient-to-b from-cyan-400 to-cyan-600" : "bg-gray-700"}`}
          />
        ))}
      </div>
    )
  }

  if (type === "segments") {
    return (
      <div className="flex space-x-1 mb-3">
        <div className="w-8 h-6 bg-gradient-to-r from-purple-400 to-purple-600 rounded-sm" />
        <div className="w-12 h-6 bg-gradient-to-r from-pink-400 to-pink-600 rounded-sm" />
        <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-sm" />
        <div className="w-4 h-6 bg-gray-700 rounded-sm" />
      </div>
    )
  }

  // Default blocks visualization
  return (
    <div className="flex space-x-1 mb-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={`w-4 h-6 rounded-sm ${
            level.status === "completed"
              ? "bg-gradient-to-b from-green-400 to-green-600"
              : level.status === "available" || level.status === "in-progress"
                ? "bg-gradient-to-b from-cyan-400 to-cyan-600"
                : "bg-gray-700"
          }`}
        />
      ))}
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
        <MemoryVisualization type={level.visualType} level={level} />
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
                <Link href={`/mini-quest/memory-management/overview`}>
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

export default function MemoryManagementModule() {
    const [notifications] = useState(3)

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
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Memory Stackers
              </h1>
              <p className="text-xl text-gray-300">Master Memory Management Algorithms</p>
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
              {/* Memory Master Stats */}
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <HardDrive className="w-5 h-5 mr-2 text-purple-500" />
                    Memory Master Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total XP:</span>
                    <span className="text-white font-bold">{statsData.totalXP}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Levels Completed:</span>
                    <span className="text-white font-bold">{statsData.levelsCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Streak:</span>
                    <span className="text-white font-bold flex items-center">
                      <Flame className="w-4 h-4 text-orange-500 mr-1" />
                      {statsData.currentStreak} days
                    </span>
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

              {/* Memory Tips */}
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Lightbulb className="w-5 h-5 mr-2 text-cyan-400" />
                    Memory Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {memoryTips.map((tip, index) => (
                      <li key={index} className="text-sm text-gray-400 flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Current Challenge */}
              <Card className="bg-gradient-to-r from-purple-900 to-pink-900 border-purple-500/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Trophy className="w-5 h-5 mr-2 text-purple-400" />
                    Current Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="text-white font-medium">Memory Optimization</h4>
                    <p className="text-sm text-gray-300">Achieve minimum fragmentation in allocation algorithms</p>
                    <div className="text-xs text-gray-400">Ends in 6 days</div>
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
