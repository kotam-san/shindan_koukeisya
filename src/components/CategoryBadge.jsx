import { categories } from '../data'

export default function CategoryBadge({ catId }) {
  const cat = categories.find((c) => c.id === catId)
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: cat.color + "12",
        border: `1px solid ${cat.color}30`,
        borderRadius: 20,
        padding: "4px 12px",
        marginBottom: 12,
      }}
    >
      <span style={{ fontSize: 14 }}>{cat.icon}</span>
      <span style={{ fontSize: 12, color: cat.color, fontWeight: 600 }}>{cat.label}</span>
    </div>
  )
}
