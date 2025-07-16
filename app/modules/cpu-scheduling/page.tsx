"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Play,
  Lock,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Target,
  Lightbulb,
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
}

interface LevelSection {
  id: string
  title: string
  subtitle: string
  levels: Level[]
}

const levelSections: LevelSection[] = [
  {
    id: "fcfs",
    title: "FCFS",
    subtitle: "First Come First Serve",
    levels: [
      {
        id: "fcfs-l1",
        title: "Pure FCFS",
        description: "Basic first-come-first-serve scheduling",
        difficulty: 2,
        status: "completed",
        xpReward: 50,
      },
      {
        id: "fcfs-l2",
        title: "Arrival Overlap",
        description: "Processes arriving at different times",
        difficulty: 3,
        status: "completed",
        xpReward: 75,
      },
      {
        id: "fcfs-l3",
        title: "Large Processes",
        description: "Many processes with long burst times",
        difficulty: 4,
        status: "completed",
        xpReward: 100,
      },
    ],
  },
  {
    id: "sjf",
    title: "SJF",
    subtitle: "Shortest Job First Non-Preemptive",
    levels: [
      {
        id: "sjf-l1",
        title: "Equal Arrival",
        description: "All processes arriving together",
        difficulty: 2,
        status: "completed",
        xpReward: 60,
      },
      {
        id: "sjf-l2",
        title: "Arrival Spread",
        description: "Staggered process arrival times",
        difficulty: 3,
        status: "available",
        xpReward: 80,
      },
      {
        id: "sjf-l3",
        title: "Starvation Traps",
        description: "Handle processes that never execute",
        difficulty: 4,
        status: "locked",
        xpReward: 120,
      },
    ],
  },
  {
    id: "srtf",
    title: "SRTF",
    subtitle: "Shortest Remaining Time First Preemptive",
    levels: [
      {
        id: "srtf-l1",
        title: "Simple Burst",
        description: "Basic preemptive scheduling",
        difficulty: 2,
        status: "locked",
        xpReward: 70,
      },
      {
        id: "srtf-l2",
        title: "Frequent Interrupts",
        description: "Handle multiple preemptions",
        difficulty: 3,
        status: "locked",
        xpReward: 90,
      },
      {
        id: "srtf-l3",
        title: "Runtime Arrival",
        description: "Processes arriving during execution",
        difficulty: 4,
        status: "locked",
        xpReward: 110,
      },
      {
        id: "srtf-l4",
        title: "Large Queues",
        description: "Manage complex queue management",
        difficulty: 5,
        status: "locked",
        xpReward: 150,
      },
    ],
  },
  {
    id: "priority",
    title: "Priority",
    subtitle: "Priority Scheduling",
    levels: [
      {
        id: "priority-l1",
        title: "Non-Preemptive",
        description: "Priority without interruption",
        difficulty: 3,
        status: "locked",
        xpReward: 85,
      },
      {
        id: "priority-l2",
        title: "Preemptive",
        description: "Priority with preemption",
        difficulty: 4,
        status: "locked",
        xpReward: 105,
      },
      {
        id: "priority-l3",
        title: "Broken Averages",
        description: "Handle low priority starvation",
        difficulty: 5,
        status: "locked",
        xpReward: 130,
      },
    ],
  },
  {
    id: "round-robin",
    title: "Round Robin",
    subtitle: "Round Robin Scheduling",
    levels: [
      {
        id: "rr-l1",
        title: "Big Time Quantum",
        description: "Large time slice scheduling",
        difficulty: 2,
        status: "locked",
        xpReward: 65,
      },
      {
        id: "rr-l2",
        title: "Small Quantum",
        description: "Frequent context switching",
        difficulty: 3,
        status: "locked",
        xpReward: 85,
      },
      {
        id: "rr-l3",
        title: "Mixed Quantum",
        description: "Arrive and quantum tuning",
        difficulty: 4,
        status: "locked",
        xpReward: 115,
      },
    ],
  },
]

const statsData = {
  totalXP: 150,
  levelsCompleted: 4,
  currentStreak: 3,
  nextAchievement: {
    name: "SJF Master",
    progress: 66,
    description: "Complete all SJF levels",
  },
}

const schedulerTips = [
  "FCFS is simple but can cause convoy effect",
  "SJF minimizes average waiting time",
  "SRTF can cause starvation",
  "Round Robin prevents starvation",
]

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
                <Link href={`/mini-quest/cpu-scheduling/overview`}>
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

export default function CPUSchedulingModule() {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Scheduler Dash
              </h1>
              <p className="text-xl text-gray-300">Master CPU Scheduling Algorithms</p>
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
              {/* Scheduler Stats */}
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    Scheduler Stats
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

              {/* Scheduler Tips */}
              <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Lightbulb className="w-5 h-5 mr-2 text-cyan-400" />
                    Scheduler Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {schedulerTips.map((tip, index) => (
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
                    <h4 className="text-white font-medium">Weekly Competition</h4>
                    <p className="text-sm text-gray-300">Achieve the highest efficiency in Round Robin scheduling</p>
                    <div className="text-xs text-gray-400">Ends in 4 days</div>
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
