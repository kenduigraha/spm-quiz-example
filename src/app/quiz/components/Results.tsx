"use client";

import { useQuiz } from "@/app/quiz/components/QuizContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/quiz/components/ui/Card"
import { Button } from "@/app/quiz/components/ui/Button"
import { Trophy, Target, Clock, BookOpen, TrendingUp, RefreshCw } from "lucide-react"

interface ResultsProps {
  onRestart: () => void
}

export function Results({ onRestart }: ResultsProps) {
  const { state, dispatch } = useQuiz()

  const totalTime = Date.now() - state.startTime - state.totalPausedDuration
  const averageTimePerQuestion = totalTime / state.questions.length
  const percentage = Math.round((state.score || 0 / state.questions.length) * 100)

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`
  }

  const getPerformanceLevel = () => {
    if (percentage >= 80) return { level: "Excellent", color: "text-green-600", bg: "bg-green-50" }
    if (percentage >= 60) return { level: "Good", color: "text-blue-600", bg: "bg-blue-50" }
    if (percentage >= 40) return { level: "Fair", color: "text-yellow-600", bg: "bg-yellow-50" }
    return { level: "Needs Improvement", color: "text-red-600", bg: "bg-red-50" }
  }

  const getRecommendations = () => {
    const incorrect = state.questions.filter((q, i) => state.answers[i] !== q.correctAnswer)
    const topics = new Set(
      incorrect.map((q) => {
        if (q.question.includes("log")) return "Logarithms"
        if (q.question.includes("quadratic")) return "Quadratic Equations"
        if (q.question.includes("gradient")) return "Coordinate Geometry"
        if (q.question.includes("area") || q.question.includes("circle")) return "Mensuration"
        return "Algebra"
      }),
    )

    return Array.from(topics)
  }

  const performance = getPerformanceLevel()
  const recommendations = getRecommendations()

  const handleRestart = () => {
    dispatch({ type: "RESET_QUIZ" })
    onRestart()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-10 h-10 text-blue-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
        <p className="text-gray-600">Here&apos;s how you performed</p>
      </div>

      {/* Score Overview */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Your Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-blue-600">
              {state.score}/{state.questions.length}
            </div>
            <div className={`inline-block px-4 py-2 rounded-full ${performance.bg}`}>
              <span className={`font-medium ${performance.color}`}>
                {percentage}% - {performance.level}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{formatTime(totalTime)}</div>
            <div className="text-sm text-gray-600">Total Time</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{formatTime(averageTimePerQuestion)}</div>
            <div className="text-sm text-gray-600">Avg per Question</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{state.score}</div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </CardContent>
        </Card>
      </div>

      {/* Question Review */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Question Review</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.questions.map((question, index) => {
            const userAnswer = state.answers[index]
            const isCorrect = userAnswer === question.correctAnswer

            return (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800">Question {index + 1}</h4>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{question.question}</p>
                {!isCorrect && (
                  <div className="bg-blue-50 p-3 rounded text-sm">
                    <p className="font-medium text-blue-800 mb-1">Explanation:</p>
                    <p className="text-blue-700">{question.explanation}</p>
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Recommended Study Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Based on your performance, consider reviewing these topics:</p>
            <div className="grid gap-2">
              {recommendations.map((topic, index) => (
                <div key={index} className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800 font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={handleRestart} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700">
          <RefreshCw className="w-4 h-4" />
          <span>Take Quiz Again</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => window.open("https://www.example.com/spm-math-resources", "_blank")}
          className="flex items-center space-x-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>Study Resources</span>
        </Button>
      </div>
    </div>
  )
}
