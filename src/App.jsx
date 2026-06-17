import { useState, useEffect } from 'react'
import { questions } from './data'
import TopBar from './components/TopBar'
import StartScreen from './components/StartScreen'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'

export default function App() {
  const [screen, setScreen] = useState("start")
  const [answers, setAnswers] = useState({})
  const [history, setHistory] = useState([])

  function handleStart() {
    setScreen("quiz")
    setAnswers({})
    setHistory([])
  }

  function handleAnswer(qId, val) {
    setAnswers((prev) => ({ ...prev, [qId]: val }))
    if (!history.includes(qId)) {
      setHistory((prev) => [...prev, qId])
    }
  }

  function handleBack() {
    if (history.length === 0) return
    const lastQId = history[history.length - 1]
    setAnswers((prev) => {
      const next = { ...prev }
      delete next[lastQId]
      return next
    })
    setHistory((prev) => prev.slice(0, -1))
  }

  function handleFinish() {
    setScreen("result")
  }

  function handleRestart() {
    setScreen("start")
    setAnswers({})
    setHistory([])
  }

  useEffect(() => {
    const answered = Object.keys(answers).length
    if (answered === questions.length && screen === "quiz") {
      const t = setTimeout(() => setScreen("result"), 400)
      return () => clearTimeout(t)
    }
  }, [answers, screen])

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", minHeight: "100vh", background: "#f0f3f7" }}>
      <TopBar />
      {screen === "start" && <StartScreen onStart={handleStart} />}
      {screen === "quiz" && (
        <QuizScreen
          answers={answers}
          onAnswer={(qId, val) => {
            handleAnswer(qId, val)
            setTimeout(() => {
              const newAnswers = { ...answers, [qId]: val }
              if (Object.keys(newAnswers).length === questions.length) {
                setScreen("result")
              }
            }, 350)
          }}
          onBack={handleBack}
          onFinish={handleFinish}
        />
      )}
      {screen === "result" && <ResultScreen answers={answers} onRestart={handleRestart} />}
    </div>
  )
}
