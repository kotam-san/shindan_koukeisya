export const GAS_URL = "https://script.google.com/macros/s/AKfycbyk62xuMqp_-hb8gsjfzAhDMe3K7gLOkPl5McVxgynv0zGa1L8mB0Gfdi-J9KzKxbDlJQ/exec"

export const categories = [
  { id: "foundation", label: "経営基盤の理解", icon: "📊", color: "#2a5e8a" },
  { id: "leadership", label: "リーダーシップ", icon: "🧭", color: "#3a7d6a" },
  { id: "vision", label: "ビジョンと戦略", icon: "🔭", color: "#6a5a8a" },
  { id: "organization", label: "人材・組織づくり", icon: "🏗️", color: "#8a6a3a" },
  { id: "mental", label: "メンタル・自己管理", icon: "🌱", color: "#5a8a6a" },
]

export const questions = [
  { id: 1, category: "foundation", text: "会社の財務状況（売上・利益・キャッシュフロー）を正確に把握していますか？" },
  { id: 2, category: "foundation", text: "主要取引先との関係を、自分の名前で構築できていますか？" },
  { id: 3, category: "foundation", text: "会社の強みと弱みを明確に説明できますか？" },
  { id: 4, category: "leadership", text: "従業員から信頼され、相談される関係を築けていますか？" },
  { id: 5, category: "leadership", text: "前経営者（親世代など）と、経営方針について率直に話し合えていますか？" },
  { id: 6, category: "leadership", text: "自分なりの経営スタイルやリーダーシップを確立できていますか？" },
  { id: 7, category: "vision", text: "今後3〜5年の事業計画が明確にありますか？" },
  { id: 8, category: "vision", text: "業界の変化やトレンドに対応できる準備ができていますか？" },
  { id: 9, category: "vision", text: "自社の存在意義（ミッション・ビジョン）を明確に語れますか？" },
  { id: 10, category: "organization", text: "幹部人材の育成計画がありますか？" },
  { id: 11, category: "organization", text: "組織の世代交代（若手の登用など）を進められていますか？" },
  { id: 12, category: "organization", text: "社内のコミュニケーションは円滑ですか？" },
  { id: 13, category: "mental", text: "経営のプレッシャーやストレスをコントロールできていますか？" },
  { id: 14, category: "mental", text: "相談できる経営者仲間や、信頼できるアドバイザーがいますか？" },
  { id: 15, category: "mental", text: "経営者としての自分の強みと弱みを理解していますか？" },
]

export const options = [
  { label: "はい", value: 4 },
  { label: "どちらかといえばはい", value: 3 },
  { label: "どちらかといえばいいえ", value: 2 },
  { label: "いいえ", value: 1 },
]

export const resultTiers = [
  {
    id: "critical",
    label: "危険水域",
    range: [0, 24],
    color: "#c0392b",
    bg: "#fdf2f2",
    badge: "🔴",
    subtitle: "今の状況を、じっくり見直す価値があります",
    message: "事業承継には、今時点で気になるポイントがいくつかあります。一緒に確認していきましょう。",
    story: {
      title: "似たような状況を乗り越えた事例",
      industry: "3代目社長の後継者",
      text: "「まだ早い」と言い続けられた後継者が、対話と実績で信頼を獲得し、社長交代を実現。その後、売上は7倍へと成長しました。",
    },
    cta: { primary: "今すぐ無料相談を予約する", secondary: null },
  },
  {
    id: "warning",
    label: "要注意",
    range: [25, 39],
    color: "#e67e22",
    bg: "#fef6ee",
    badge: "🟡",
    subtitle: "いくつかのポイントが、今後の経営に影響する可能性があります",
    message: "経営の流れの中で、気になるポイントが見えています。早めに把握しておくと強みになります。",
    story: {
      title: "似たような状況を乗り越えた事例",
      industry: "学校法人の3代目後継者",
      text: "「同じ課題が何年も解決せず」と感じていた後継者が、組織への関わり方を振り返り、信頼関係が修復され組織全体が変わっていった。",
    },
    cta: { primary: "無料相談を予約する", secondary: null },
  },
  {
    id: "improvement",
    label: "改善の余地あり",
    range: [40, 49],
    color: "#27ae60",
    bg: "#f0faf4",
    badge: "🟢",
    subtitle: "経営の土台ができている状態です",
    message: "基本的な準備はできています。あとは「一押し」があれば、スムーズな事業承継が実現できます。",
    story: {
      title: "似たような状況を乗り越えた事例",
      industry: "3代目社長の後継者",
      text: "社長交代後も組織変革には時間がかかった後継者が、ナンバー2の育成で「ここからが本番」と感じた事例があります。",
    },
    cta: { primary: "無料相談を予約する", secondary: null },
  },
  {
    id: "good",
    label: "良好",
    range: [50, 60],
    color: "#2980b9",
    bg: "#eef6fc",
    badge: "🔵",
    subtitle: "次の段階へ動く準備が整っています",
    message: "経営の土台がしっかりできている状態です。この基盤を活かして、次のステージへ進むタイミングです。",
    story: {
      title: "似たような状況から「次のステージ」へ",
      industry: "中小企業の社長",
      text: "振り返りの習慣が整った経営者が、不確実な環境にも柔軟に対応し、経営の器へと成長していった事例があります。",
    },
    cta: { primary: "無料相談を予約する", secondary: null },
  },
]
