import { useState } from 'react'
import { GAS_URL } from '../data'
import { getTier } from '../logic'

export default function ResultScreen({ answers, onRestart }) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [sending, setSending] = useState(false)

  const total = Object.values(answers).reduce((a, b) => a + b, 0)
  const tier = getTier(total)

  const handleSubmit = async () => {
    if (!email || !name || !agreed) {
      alert("お名前、メールアドレス、および規定への同意が必要です")
      return
    }

    setSending(true)
    try {
      const payload = {
        name,
        email,
        score: total,
        tier: tier.label,
        timestamp: new Date().toISOString(),
      }

      await fetch(GAS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      setEmailSent(true)

      // 親ページ（1planet.jp）へ診断完了を通知する。
      // 親側の Code Injection が受け取って GA4 の shindan_complete イベントを送る。
      // ここは計測目的なので、失敗しても診断本体の処理を絶対に止めない。
      // 個人情報（氏名・メール）は送らない。スコアと判定ラベルのみ。
      try {
        const message = { type: "shindan_complete", score: total, tier: tier.label }
        // targetOrigin が一致しない相手には黙って破棄されるため、www 有無の両方に送る
        for (const origin of ["https://www.1planet.jp", "https://1planet.jp"]) {
          window.parent.postMessage(message, origin)
        }
      } catch (e) {
        console.warn("計測通知に失敗（診断本体には影響しません）:", e)
      }
    } catch (error) {
      console.error("送信エラー:", error)
      alert("送信に失敗しました。もう一度お試しください。")
    } finally {
      setSending(false)
    }
  }

  const canSubmit = name && email && agreed && !sending

  return (
    <div style={{ padding: "20px 20px 32px" }}>
      {!emailSent ? (
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #eef2f6", padding: "28px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", textAlign: "center" }}>
          <h2 style={{ fontSize: "20px", color: "#1a1a2e", marginBottom: "12px", fontFamily: "'Noto Serif JP', serif" }}>
            診断が完了しました
          </h2>
          <p style={{ fontSize: "14px", color: "#5a6a7a", marginBottom: "24px", lineHeight: "1.6" }}>
            分析結果と詳細レポート（PDF）を<br />ご入力いただいたメールアドレスにお送りします。
          </p>

          <input
            type="text"
            placeholder="お名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "14px", borderRadius: 10, border: "1.5px solid #dde3ea", fontSize: "16px", marginBottom: "12px", outline: "none" }}
          />
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "14px", borderRadius: 10, border: "1.5px solid #dde3ea", fontSize: "16px", marginBottom: "16px", outline: "none" }}
          />

          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "20px", textAlign: "left" }}>
            <input
              type="checkbox"
              id="privacy"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ cursor: "pointer", width: "18px", height: "18px", marginTop: "2px" }}
            />
            <label htmlFor="privacy" style={{ fontSize: "13px", color: "#4a5568", cursor: "pointer", lineHeight: "1.5" }}>
              私は、<a href="https://www.1planet.jp/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#2a5e8a", textDecoration: "underline" }}>プライバシーポリシー</a>と個人情報の取り扱いに関する規定に同意します。
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              width: "100%", padding: "16px", borderRadius: 12, border: "none",
              background: canSubmit ? "linear-gradient(135deg, #1a1a2e, #2a5e8a)" : "#cdd3da",
              color: "#fff", fontSize: "16px", fontWeight: "700",
              cursor: canSubmit ? "pointer" : "default",
              boxShadow: canSubmit ? "0 4px 12px rgba(26,26,46,0.2)" : "none",
              transition: "all 0.3s"
            }}
          >
            {sending ? "送信中..." : "診断結果を受け取る"}
          </button>
        </div>
      ) : (
        <>
          <div style={{ background: "#eef6fc", borderRadius: 16, padding: "20px", marginBottom: 20, textAlign: "center", border: "1px solid #d4e3f0" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📧</div>
            <h3 style={{ fontSize: 18, color: "#2a5e8a", marginBottom: 8, fontWeight: 700 }}>送信完了</h3>
            <p style={{ fontSize: 14, color: "#4a5568", lineHeight: 1.6 }}>
              <strong>{email}</strong> 宛に<br />
              すべての診断結果と特典レポートをお送りしました。<br />
              <span style={{ fontSize: 12, color: "#7a8a9a" }}>※メールが届かない場合は迷惑メールフォルダもご確認ください。</span>
            </p>
          </div>

          <div style={{ background: tier.bg, border: `1px solid ${tier.color}30`, borderRadius: 18, padding: "28px 20px 24px", textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: tier.color, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 8 }}>診断結果</div>
            <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 22, color: "#1a1a2e", fontWeight: 700, marginBottom: 4 }}>{tier.label}</div>
            <div style={{ fontSize: 14, color: "#5a6a7a", marginBottom: 16 }}>{tier.subtitle}</div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4 }}>
              <span style={{ fontSize: 52, fontWeight: 800, color: tier.color, lineHeight: 1 }}>{total}</span>
              <span style={{ fontSize: 18, color: "#7a8a9a" }}>/60</span>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #eef2f6", padding: "20px", marginBottom: 16 }}>
            <p style={{ margin: 0, fontSize: 14, color: "#4a5568", lineHeight: 1.7 }}>{tier.message}</p>
          </div>

          <div style={{ background: "#f9f7f2", borderRadius: 16, border: "1px solid #efe9dc", padding: "20px", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: "#8a7a5a", fontWeight: 700 }}>{tier.story.title}</span>
            </div>
            <p style={{ margin: "0 0 6px", fontSize: 12, color: "#9a8a6a", fontStyle: "italic" }}>{tier.story.industry}</p>
            <p style={{ margin: 0, fontSize: 14, color: "#5a4a2a", lineHeight: 1.7 }}>{tier.story.text}</p>
          </div>

          <div style={{ background: "#1a1a2e", borderRadius: 16, padding: "24px 20px", marginBottom: 16 }}>
            <p style={{ margin: "0 0 16px", fontSize: 14, color: "#c8d4e0", textAlign: "center" }}>今の状況を、一緒に見直しましょう。</p>
            <a href="https://1planet.jp/contact" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", width: "100%", padding: "14px", borderRadius: 10, background: "linear-gradient(135deg, #2a5e8a, #3a7d6a)", color: "#fff", fontSize: 15, fontWeight: 700, textAlign: "center", textDecoration: "none" }}>
              {tier.cta.primary}
            </a>
          </div>
        </>
      )}

      <button onClick={onRestart} style={{ width: "100%", padding: "10px", borderRadius: 10, border: "1.5px solid #dde3ea", background: "#fff", color: "#7a8a9a", fontSize: 13, cursor: "pointer" }}>
        もう一度診断する
      </button>
    </div>
  )
}
