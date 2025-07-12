"use client";

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import { spmMathQuestions } from "@/lib/data";

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "easy" | "medium" | "hard"
}

export interface QuizState {
  questions: Question[]
  currentQuestionIndex: number
  answers: (number | null)[]
  startTime: number
  pausedTime: number
  totalPausedDuration: number
  isCompleted: boolean
  score: number
}

type QuizAction =
  | { type: "ANSWER_QUESTION"; questionIndex: number; answer: number }
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | { type: "PAUSE_QUIZ" }
  | { type: "RESUME_QUIZ" }
  | { type: "COMPLETE_QUIZ" }
  | { type: "RESET_QUIZ" }

const initialState: QuizState = {
  questions: spmMathQuestions,
  currentQuestionIndex: 0,
  answers: new Array(spmMathQuestions.length).fill(null),
  startTime: Date.now(),
  pausedTime: 0,
  totalPausedDuration: 0,
  isCompleted: false,
  score: 0,
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "ANSWER_QUESTION":
      const newAnswers = [...state.answers]
      newAnswers[action.questionIndex] = action.answer
      return { ...state, answers: newAnswers }

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1),
      }

    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      }

    case "PAUSE_QUIZ":
      return { ...state, pausedTime: Date.now() }

    case "RESUME_QUIZ":
      const pauseDuration = state.pausedTime > 0 ? Date.now() - state.pausedTime : 0
      return {
        ...state,
        pausedTime: 0,
        totalPausedDuration: state.totalPausedDuration + pauseDuration,
      }

    case "COMPLETE_QUIZ":
      const score = state.answers.reduce((acc, answer, index) => {
        return answer === state.questions[index].correctAnswer ? acc + 1 : acc
      }, 0)
      return { ...state, isCompleted: true, score }

    case "RESET_QUIZ":
      return { ...initialState, startTime: Date.now() }

    default:
      return state
  }
}

const QuizContext = createContext<{
  state: QuizState
  dispatch: React.Dispatch<QuizAction>
} | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  return <QuizContext.Provider value={{ state, dispatch }}>{children}</QuizContext.Provider>
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider")
  }
  return context
}
