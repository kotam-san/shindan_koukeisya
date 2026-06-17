import { questions } from '../data'
import ProgressBar from './ProgressBar'
import QuestionCard from './QuestionCard'
import NavButtons from './NavButtons'

export default function QuizScreen({ answers, onAnswer, onBack, onFinish }) {
  let currentQ = null
  let currentQIndex = 0
  for (let i = 0; i < questions.length; i++) {
    if (answers[questions[i].id] === undefined) {
      currentQ = questions[i]
      currentQIndex = i
      break
    }
  }
  if (!currentQ) return null

  const answered = Object.keys(answers).length
  const isLast = answered === questions.length - 1

  return (
    <div style={{ padding: "16px 20px 24px" }}>
      <ProgressBar current={answered} total={questions.length} />
      <div style={{ marginTop: 20 }}>
        <QuestionCard
          question={currentQ}
          selected={answers[currentQ.id]}
          onSelect={(val) => onAnswer(currentQ.id, val)}
          index={currentQIndex + 1}
        />
      </div>
      <NavButtons
        canBack={answered > 0}
        onBack={onBack}
        canNext={answers[currentQ.id] !== undefined}
        onNext={isLast && answers[currentQ.id] !== undefined ? onFinish : () => { }}
        nextLabel={isLast ? "結果を見る" : "次へ →"}
      />
    </div>
  )
}
