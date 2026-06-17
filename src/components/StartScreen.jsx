export default function StartScreen({ onStart }) {
  return (
    <div style={{ padding: "48px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 8 }}>📋</div>
      <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 24, color: "#1a1a2e", margin: "0 0 8px", lineHeight: 1.3 }}>
        後継者準備度診断
      </h1>
      <p style={{ fontSize: 15, color: "#2a5e8a", fontWeight: 600, margin: "0 0 24px" }}>
        あなたの事業承継リスクスコア
      </p>
      <div style={{ background: "#f4f7fa", borderRadius: 14, padding: "20px", marginBottom: 28, textAlign: "left" }}>
        <p style={{ margin: "0 0 12px", fontSize: 14, color: "#4a5568", lineHeight: 1.6 }}>
          こんな状態が続いていませんか？
        </p>
        {[
          "意思決定に迷い、時間だけが過ぎていく",
          "幹部や従業員との関係がうまくいかない",
          "事業は回っているが、何かが満たされない",
          "後継者として期待されているが、自信が持てない",
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
            <span style={{ color: "#c0392b", fontWeight: 700, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 14, color: "#4a5568" }}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{ background: "#eef6fc", borderRadius: 12, padding: "16px", marginBottom: 28, textAlign: "left" }}>
        <p style={{ margin: 0, fontSize: 13, color: "#2a5e8a", lineHeight: 1.6 }}>
          この診断は、後継者が抱える「見えない課題」を可視化し、<strong>次の一歩を明確にする</strong>ためのツールです。
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 28 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e" }}>15問</div>
          <div style={{ fontSize: 12, color: "#7a8a9a" }}>質問数</div>
        </div>
        <div style={{ width: 1, background: "#dde3ea" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e" }}>約3分</div>
          <div style={{ fontSize: 12, color: "#7a8a9a" }}>所要時間</div>
        </div>
        <div style={{ width: 1, background: "#dde3ea" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e" }}>無料</div>
          <div style={{ fontSize: 12, color: "#7a8a9a" }}>費用</div>
        </div>
      </div>
      <button
        onClick={onStart}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: 12,
          border: "none",
          background: "linear-gradient(135deg, #1a1a2e, #2a5e8a)",
          color: "#fff",
          fontSize: 17,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(26,26,46,0.35)",
          letterSpacing: "0.02em",
        }}
      >
        診断を開始する
      </button>
    </div>
  )
}
