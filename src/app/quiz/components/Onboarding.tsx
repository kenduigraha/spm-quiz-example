"use client";
import { useState } from "react"
import { Button } from "@/app/quiz/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/quiz/components/ui/Card"
import { Clock, Target, Trophy, CheckCircle } from "lucide-react"

interface OnboardingProps {
  onStart: () => void
}

export function Onboarding({ onStart }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Welcome to SPM Math Quiz",
      content: (
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <Trophy className="w-10 h-10 text-blue-600" />
          </div>
          <p className="text-gray-600">Test your SPM Mathematics knowledge with 5 carefully selected questions</p>
        </div>
      ),
    },
    {
      title: "What to Expect",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <div>
              <h4 className="font-medium">Estimated Time: 10-15 minutes</h4>
              <p className="text-sm text-gray-600">Take your time, no rush!</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-green-600" />
            <div>
              <h4 className="font-medium">5 Questions</h4>
              <p className="text-sm text-gray-600">Mixed difficulty levels</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-purple-600" />
            <div>
              <h4 className="font-medium">Instant Feedback</h4>
              <p className="text-sm text-gray-600">See explanations after completion</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Quiz Features",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Progress Tracking</h4>
            <p className="text-sm text-blue-700">Visual progress bar with motivational milestones</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Pause & Resume</h4>
            <p className="text-sm text-green-700">Take breaks whenever you need</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Detailed Results</h4>
            <p className="text-sm text-purple-700">Get insights and next steps for improvement</p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-lg min-h-[500px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">{slides[currentSlide].title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[284px] flex items-center justify-center">{slides[currentSlide].content}</div>

          <div className="flex justify-center space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className={currentSlide === 0 ? "invisible" : "px-6"}
            >
              Previous
            </Button>

            {currentSlide === slides.length - 1 ? (
              <Button onClick={onStart} className="px-8 bg-blue-600 hover:bg-blue-700">
                Start Quiz
              </Button>
            ) : (
              <Button onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))} className="px-6 cursor-pointer">
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
