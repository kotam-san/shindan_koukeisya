import { options } from '../data'
import CategoryBadge from './CategoryBadge'

export default function QuestionCard({ question, selected, onSelect, index }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "28px 24px 20px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        border: "1px solid #eef2f6",
      }}
    >
      <CategoryBadge catId={question.category} />
      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        <span
          style={{
            background: "#1a1a2e",
            color: "#fff",
            width: 28,
            height: 28,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {index}
        </span>
        <p style={{ margin: 0, fontSize: 16, color: "#1a1a2e", lineHeight: 1.5, fontWeight: 500 }}>
          {question.text}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "11px 16px",
              borderRadius: 10,
              border: selected === opt.value ? "2px solid #2a5e8a" : "1.5px solid #e0e5ea",
              background: selected === opt.value ? "#eef4fa" : "#fafbfc",
              cursor: "pointer",
              transition: "all 0.2s",
              textAlign: "left",
            }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: selected === opt.value ? "2px solid #2a5e8a" : "2px solid #cdd3da",
                background: selected === opt.value ? "#2a5e8a" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            >
              {selected === opt.value && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
            </span>
            <span style={{ fontSize: 14, color: selected === opt.value ? "#2a5e8a" : "#4a5568" }}>
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
