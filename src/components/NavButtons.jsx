export default function NavButtons({ canBack, canNext, onBack, onNext, nextLabel = "次へ →" }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12 }}>
      {canBack ? (
        <button
          onClick={onBack}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "1.5px solid #dde3ea",
            background: "#fff",
            color: "#5a6a7a",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          ← 戻る
        </button>
      ) : (
        <span />
      )}
      <button
        onClick={onNext}
        disabled={!canNext}
        style={{
          padding: "10px 28px",
          borderRadius: 10,
          border: "none",
          background: canNext ? "linear-gradient(135deg, #1a1a2e, #2a5e8a)" : "#ccc",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          cursor: canNext ? "pointer" : "not-allowed",
          boxShadow: canNext ? "0 2px 10px rgba(26,26,46,0.3)" : "none",
        }}
      >
        {nextLabel}
      </button>
    </div>
  )
}
