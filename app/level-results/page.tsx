"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Clock,
  Cpu,
  RotateCcw,
  Star,
  Trophy,
  Target,
  Flame,
  Play,
  BookOpen,
  Award,
  TrendingUp,
  Zap,
} from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from props/API
const levelData = {
  id: "fcfs-l1",
  title: "FCFS Level 1: Pure FCFS Results",
  module: "Scheduler Dash",
  moduleId: "cpu-scheduling",
  score: 92,
  maxScore: 100,
  xpEarned: 75,
  performance: "Excellent Performance!",
  stars: 3,
  metrics: [
    { label: "Average Waiting Time", value: "5.2s", icon: Clock, color: "text-cyan-400" },
    { label: "Turnaround Time", value: "12.8s", icon: TrendingUp, color: "text-green-400" },
    { label: "CPU Utilization", value: "85%", icon: Cpu, color: "text-blue-400" },
    { label: "Context Switches", value: "8", icon: RotateCcw, color: "text-orange-400" },
  ],
  analysis: {
    text: "Excellent work! You followed FCFS correctly, maintaining process order and minimizing idle time. Your CPU utilization of 85% shows efficient resource management.",
    comparison: "Compare with Optimal",
  },
  unlocked: {
    level: "FCFS Level 2: Arrival Overlap",
    description: "New level unlocked in Scheduler Dash",
  },
  progressToNext: 66,
}

const userStats = {
  totalXP: 225,
  levelsCompleted: 8,
  nextUnlock: "Level 3",
  currentStreak: 4,
}

const recentAchievements = [
  {
    id: "fcfs-master",
    name: "FCFS Master",
    description: "Complete all FCFS levels",
    icon: Trophy,
    color: "text-yellow-400",
  },
  {
    id: "perfect-score",
    name: "Perfect Score",
    description: "Score 90+ on any level",
    icon: Star,
    color: "text-purple-400",
  },
]

const nextChallenge = {
  name: "Algorithm Expert",
  description: "Complete 3 more levels with 85+ score",
  progress: 33,
  timeLeft: "1/3 Complete",
}

function PerformanceMetric({ metric }: { metric: any }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gray-700/50 ${metric.color}`}>
            <metric.icon className="w-4 h-4" />
          </div>
          <span className="text-gray-300 text-sm">{metric.label}</span>
        </div>
        <span className={`font-bold text-lg ${metric.color}`}>{metric.value}</span>
      </div>
    </div>
  )
}

function ScoreDisplay({ score, maxScore, stars, performance }: any) {
  return (
    <div className="text-center">
      <div className="text-6xl font-bold text-white mb-4">
        {score}
        <span className="text-3xl text-gray-400">/{maxScore}</span>
      </div>
      <div className="flex justify-center space-x-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-6 h-6 ${i < stars ? "text-yellow-400 fill-current" : "text-gray-600"}`} />
        ))}
      </div>
      <Badge className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50 text-green-300 px-4 py-2 text-sm">
        {performance}
      </Badge>
    </div>
  )
}

export default function LevelResults() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedScore, setAnimatedScore] = useState(0)
  const [notifications] = useState(3)

  useEffect(() => {
    setIsVisible(true)
    // Animate score counting up
    const timer = setTimeout(() => {
      let current = 0
      const increment = levelData.score / 30
      const scoreTimer = setInterval(() => {
        current += increment
        if (current >= levelData.score) {
          setAnimatedScore(levelData.score)
          clearInterval(scoreTimer)
        } else {
          setAnimatedScore(Math.floor(current))
        }
      }, 50)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

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
          {/* Main Results Area */}
          <div className="xl:col-span-3">
            {/* Header */}
            <div
              className={`mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {levelData.title}
              </h1>
              <p className="text-xl text-gray-300">{levelData.module}</p>
            </div>

            {/* Performance Metrics */}
            <Card
              className={`bg-gray-900/50 border-gray-700/50 backdrop-blur-sm mb-8 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {levelData.metrics.map((metric, index) => (
                    <PerformanceMetric key={index} metric={metric} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Solution Analysis */}
            <Card
              className={`bg-gray-900/50 border-gray-700/50 backdrop-blur-sm mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <div className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-500" />
                    Solution Analysis
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
                  >
                    {levelData.analysis.comparison}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{levelData.analysis.text}</p>
              </CardContent>
            </Card>

            {/* Results Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Final Score */}
              <Card
                className={`bg-gray-900/50 border-gray-700/50 backdrop-blur-sm transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Final Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScoreDisplay
                    score={animatedScore}
                    maxScore={levelData.maxScore}
                    stars={levelData.stars}
                    performance={levelData.performance}
                  />
                </CardContent>
              </Card>

              {/* Progression */}
              <Card
                className={`bg-gray-900/50 border-gray-700/50 backdrop-blur-sm transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <TrendingUp className="w-5 h-5 mr-2 text-cyan-500" />
                    Progression
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">XP Earned</span>
                    <Badge className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/50 text-cyan-300 px-3 py-1">
                      +{levelData.xpEarned}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Level Unlocked</span>
                      <span className="text-green-400">✓ {levelData.unlocked.level}</span>
                    </div>
                    <p className="text-xs text-gray-500">{levelData.unlocked.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progress to Next Achievement</span>
                      <span className="text-cyan-400">{levelData.progressToNext}%</span>
                    </div>
                    <Progress value={levelData.progressToNext} className="h-2" />
                    <p className="text-xs text-gray-500">5/8 levels completed</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 bg-transparent"
              >
                <Link href={`/modules/${levelData.moduleId}`}>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to {levelData.module}
                </Link>
              </Button>
              <Button size="lg" className="neon-button-primary group">
                <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Replay Level
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Updated Stats */}
              <Card
                className={`bg-gray-900/50 border-gray-700/50 backdrop-blur-sm transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <TrendingUp className="w-5 h-5 mr-2 text-cyan-500" />
                    Updated Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total XP:</span>
                    <span className="text-white font-bold">{userStats.totalXP}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Levels Completed:</span>
                    <span className="text-white font-bold">{userStats.levelsCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Unlock:</span>
                    <span className="text-white font-bold">{userStats.nextUnlock}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Streak:</span>
                    <span className="text-white font-bold flex items-center">
                      <Flame className="w-4 h-4 text-orange-500 mr-1" />
                      {userStats.currentStreak} days
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card
                className={`bg-gray-900/50 border-gray-700/50 backdrop-blur-sm transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 achievement-item">
                      <div className={`p-2 rounded-lg bg-gray-800/50 ${achievement.color}`}>
                        <achievement.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{achievement.name}</p>
                        <p className="text-gray-400 text-xs">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Next Challenge */}
              <Card
                className={`bg-gradient-to-r from-orange-900 to-red-900 border-orange-500/50 backdrop-blur-sm transition-all duration-1000 delay-900 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <Zap className="w-5 h-5 mr-2 text-orange-400" />
                    Next Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="text-white font-medium">{nextChallenge.name}</h4>
                    <p className="text-sm text-gray-300">{nextChallenge.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-orange-400">{nextChallenge.timeLeft}</span>
                      </div>
                      <Progress value={nextChallenge.progress} className="h-2" />
                    </div>
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
