"use client";

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/quiz/components/ui/Card"
import { Button } from "@/app/quiz/components/ui/Button"
import type { Question } from "@/app/quiz/components/QuizContext"
import { AlertCircle } from "lucide-react"

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | null
  onAnswer: (answer: number) => void
  questionNumber: number
}

export function QuestionCard({ question, selectedAnswer, onAnswer, questionNumber }: QuestionCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleAnswer = async (answerIndex: number) => {
    setIsLoading(true)
    // Simulate processing time for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))
    onAnswer(answerIndex)
    setIsLoading(false)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="shadow-lg min-h-[496px]">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-lg md:text-xl">Question {questionNumber}</CardTitle>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-base md:text-lg font-medium text-gray-800 leading-relaxed">{question.question}</p>
        </div>

        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className={`p-4 h-auto text-left justify-start transition-all ${
                selectedAnswer === index
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "hover:bg-blue-50 hover:border-blue-300"
              }`}
              onClick={() => !isLoading && handleAnswer(index)}
              disabled={isLoading}
            >
              <div className="flex items-center space-x-3 w-full">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    selectedAnswer === index ? "border-white bg-white text-blue-600" : "border-gray-400"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1 text-sm md:text-base">{option}</span>
              </div>
            </Button>
          ))}
        </div>

        {selectedAnswer === null && (
          <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">Please select an answer to continue</span>
          </div>
        )}
        <div className={!isLoading ? "invisible" : "text-center text-sm text-gray-600"}>Processing your answer...</div>
      </CardContent>
    </Card>
  )
}
