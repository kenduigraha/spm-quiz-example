"use client";

import { useState } from "react"
import { QuizProvider } from "@/app/quiz/components/QuizContext"
import { Onboarding } from "@/app/quiz/components/Onboarding"
import { QuizInterface } from "@/app/quiz/components/QuizInterface"
import { Results } from "@/app/quiz/components/Results"
import { PauseModal } from "@/app/quiz/components/PauseModal"

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState<"onboarding" | "quiz" | "results">("onboarding")
  const [showPauseModal, setShowPauseModal] = useState(false)

  return (
    <QuizProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {currentStep === "onboarding" && <Onboarding onStart={() => setCurrentStep("quiz")} />}

          {currentStep === "quiz" && (
            <QuizInterface onComplete={() => setCurrentStep("results")} onPause={() => setShowPauseModal(true)} />
          )}

          {currentStep === "results" && <Results onRestart={() => setCurrentStep("onboarding")} />}

          {showPauseModal && (
            <PauseModal
              onResume={() => setShowPauseModal(false)}
              onQuit={() => {
                setShowPauseModal(false)
                setCurrentStep("onboarding")
              }}
            />
          )}
        </div>
      </div>
    </QuizProvider>
  )
}
