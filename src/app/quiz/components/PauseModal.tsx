"use client";

import { useQuiz } from "@/app/quiz/components/QuizContext"
import { Button } from "@/app/quiz/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/quiz/components/ui/Card"
import { Play, Home, Coffee } from "lucide-react"

interface PauseModalProps {
  onResume: () => void
  onQuit: () => void
}

export function PauseModal({ onResume, onQuit }: PauseModalProps) {
  const { state, dispatch } = useQuiz()

  const handleResume = () => {
    dispatch({ type: "RESUME_QUIZ" })
    onResume()
  }

  const progress = ((state.currentQuestionIndex + 1) / state.questions.length) * 100

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Coffee className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-xl">Quiz Paused</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-gray-600">Take your time! Your progress is saved.</p>
            <div className="text-sm text-gray-500">Progress: {Math.round(progress)}% complete</div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleResume}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <Play className="w-4 h-4" />
              <span>Resume Quiz</span>
            </Button>

            <Button
              variant="outline"
              onClick={onQuit}
              className="w-full flex items-center justify-center space-x-2 bg-transparent"
            >
              <Home className="w-4 h-4" />
              <span>Exit Quiz</span>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">Your answers are automatically saved</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
