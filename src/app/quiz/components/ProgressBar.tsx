"use client";

import { Trophy, Star, Target } from "lucide-react"

interface ProgressBarProps {
  progress: number
  currentQuestion: number
  totalQuestions: number
}

export function ProgressBar({ progress, currentQuestion, totalQuestions }: ProgressBarProps) {
  const getMotivationalMessage = () => {
    if (progress <= 20) return "Great start! You've got this! 🚀"
    if (progress <= 40) return "You're making excellent progress! 💪"
    if (progress <= 60) return "Halfway there! Keep up the momentum! ⭐"
    if (progress <= 80) return "Almost done! You're doing amazing! 🎯"
    return "Final stretch! Finish strong! 🏆"
  }

  const getMilestoneIcon = () => {
    if (progress <= 40) return <Target className="w-5 h-5 text-blue-600" />
    if (progress <= 80) return <Star className="w-5 h-5 text-yellow-600" />
    return <Trophy className="w-5 h-5 text-gold-600" />
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getMilestoneIcon()}
          <span className="text-sm font-medium text-gray-700">
            Progress: {currentQuestion}/{totalQuestions}
          </span>
        </div>
        <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-gray-700 mb-2">{getMotivationalMessage()}</p>
        <div className="flex justify-center space-x-1">
          {Array.from({ length: totalQuestions }, (_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index < currentQuestion ? "bg-green-500" : index === currentQuestion - 1 ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
