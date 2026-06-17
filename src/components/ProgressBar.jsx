export default function ProgressBar({ current, total }) {
  const pct = (current / total) * 100
  return (
    <div style={{ padding: "20px 24px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "#7a8a9a" }}>進行状況</span>
        <span style={{ fontSize: 12, color: "#2a5e8a", fontWeight: 600 }}>
          {current} / {total}
        </span>
      </div>
      <div style={{ height: 4, background: "#e8edf2", borderRadius: 2 }}>
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg, #2a5e8a, #3a7d6a)",
            borderRadius: 2,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  )
}
