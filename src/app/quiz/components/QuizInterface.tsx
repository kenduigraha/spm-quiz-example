"use client";

import { useState, useEffect } from "react"
import { useQuiz } from "@/app/quiz/components/QuizContext"
import { ProgressBar } from "@/app/quiz/components/ProgressBar"
import { QuestionCard } from "@/app/quiz/components/QuestionCard"
import { Button } from "@/app/quiz/components/ui/Button"
import { Pause, ChevronLeft, ChevronRight } from "lucide-react"

interface QuizInterfaceProps {
  onComplete: () => void
  onPause: () => void
}

export function QuizInterface({ onComplete, onPause }: QuizInterfaceProps) {
  const { state, dispatch } = useQuiz()
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.pausedTime === 0) {
        setTimeElapsed(Date.now() - state.startTime - state.totalPausedDuration)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [state.startTime, state.totalPausedDuration, state.pausedTime])

  const handleAnswer = (answer: number) => {
    dispatch({ type: "ANSWER_QUESTION", questionIndex: state.currentQuestionIndex, answer })
  }

  const handleNext = () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      dispatch({ type: "NEXT_QUESTION" })
    } else {
      // Complete quiz
      dispatch({ type: "COMPLETE_QUIZ" })
      onComplete()
    }
  }

  const handlePrevious = () => {
    dispatch({ type: "PREVIOUS_QUESTION" })
  }

  const handlePause = () => {
    dispatch({ type: "PAUSE_QUIZ" })
    onPause()
  }

  const currentQuestion = state.questions[state.currentQuestionIndex]
  const currentAnswer = state.answers[state.currentQuestionIndex]
  const progress = ((state.currentQuestionIndex + 1) / state.questions.length) * 100

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">SPM Math Quiz</h1>
          <p className="text-sm text-gray-600">
            Question {state.currentQuestionIndex + 1} of {state.questions.length}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">Time: {formatTime(timeElapsed)}</div>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePause}
            className="flex items-center space-x-2 bg-transparent"
          >
            <Pause className="w-4 h-4" />
            <span className="hidden sm:inline">Pause</span>
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar
        progress={progress}
        currentQuestion={state.currentQuestionIndex + 1}
        totalQuestions={state.questions.length}
      />

      {/* Question Card */}
      <QuestionCard
        question={currentQuestion}
        selectedAnswer={currentAnswer}
        onAnswer={handleAnswer}
        questionNumber={state.currentQuestionIndex + 1}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={state.currentQuestionIndex === 0}
          className="flex items-center space-x-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        <div className="text-sm text-gray-600">
          {state.answers.filter((a) => a !== null).length} of {state.questions.length} answered
        </div>

        <Button
          onClick={handleNext}
          disabled={currentAnswer === null}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
        >
          <span>{state.currentQuestionIndex === state.questions.length - 1 ? "Finish" : "Next"}</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
