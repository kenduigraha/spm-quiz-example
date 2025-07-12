import type { Question } from "@/app/quiz/components/QuizContext"

export const spmMathQuestions: Question[] = [
  {
    id: 1,
    question: "Solve for x: 2x + 5 = 17",
    options: ["x = 4", "x = 6", "x = 8", "x = 10"],
    correctAnswer: 1,
    explanation: "2x + 5 = 17, so 2x = 12, therefore x = 6",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "Find the area of a circle with radius 7 cm. (Use π = 22/7)",
    options: ["154 cm²", "144 cm²", "164 cm²", "174 cm²"],
    correctAnswer: 0,
    explanation: "Area = πr² = (22/7) × 7² = (22/7) × 49 = 154 cm²",
    difficulty: "medium",
  },
  {
    id: 3,
    question: "If log₂ 8 = x, find the value of x.",
    options: ["x = 2", "x = 3", "x = 4", "x = 5"],
    correctAnswer: 1,
    explanation: "log₂ 8 = x means 2ˣ = 8. Since 2³ = 8, x = 3",
    difficulty: "medium",
  },
  {
    id: 4,
    question: "Find the gradient of the line passing through points A(2, 5) and B(6, 13).",
    options: ["m = 1", "m = 2", "m = 3", "m = 4"],
    correctAnswer: 1,
    explanation: "Gradient = (y₂ - y₁)/(x₂ - x₁) = (13 - 5)/(6 - 2) = 8/4 = 2",
    difficulty: "hard",
  },
  {
    id: 5,
    question: "Solve the quadratic equation: x² - 5x + 6 = 0",
    options: ["x = 1, 6", "x = 2, 3", "x = 1, 5", "x = 2, 4"],
    correctAnswer: 1,
    explanation: "Factoring: (x - 2)(x - 3) = 0, so x = 2 or x = 3",
    difficulty: "hard",
  },
]