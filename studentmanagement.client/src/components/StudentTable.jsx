import { useState } from "react";
import StudentForm from "./StudentForm";

const COLORS = [
    ["#7c6cfc", "#13131a"], ["#e85d75", "#13131a"], ["#2dd4bf", "#0c0c10"],
    ["#f59e0b", "#0c0c10"], ["#818cf8", "#13131a"], ["#34d399", "#0c0c10"],
];

function avatarColor(name = "") {
    let h = 0;
    for (const c of name) h = ((h << 5) - h) + c.charCodeAt(0);
    return COLORS[Math.abs(h) % COLORS.length];
}

function initials(name = "") {
    return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const STATUS_COLOR = { active: "#22d3a0", graduated: "#7c6cfc", inactive: "#6b6b85" };

// ── Edit Modal ────────────────────────────────────────────────────────────────
function EditModal({ student, onClose, onSubmit, loading }) {
    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed", inset: 0, zIndex: 200,
                    background: "rgba(0,0,0,0.65)",
                    backdropFilter: "blur(6px)",
                    animation: "fadeIn 0.2s ease",
                }}
            />

            {/* Panel */}
            <div style={{
                position: "fixed", inset: 0, zIndex: 201,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "1rem",
                pointerEvents: "none",
            }}>
                <div style={{
                    width: "100%", maxWidth: 420,
                    pointerEvents: "all",
                    animation: "slideUp 0.25s cubic-bezier(0.22,1,0.36,1)",
                }}>
                    {/* Close row */}
                    <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", marginBottom: "0.75rem",
                    }}>
                        <span style={{
                            fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
                            color: "#6b6b85", letterSpacing: 1,
                            textTransform: "uppercase",
                        }}>Edit Record</span>
                        <button
                            onClick={onClose}
                            style={{
                                width: 28, height: 28, borderRadius: 6,
                                border: "1px solid #2a2a3a", background: "#13131a",
                                color: "#6b6b85", cursor: "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "1rem", lineHeight: 1,
                                transition: "all 0.15s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = "#e8e8f0"; e.currentTarget.style.borderColor = "#6b6b85"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "#6b6b85"; e.currentTarget.style.borderColor = "#2a2a3a"; }}
                        >✕</button>
                    </div>

                    {/* Reuse StudentForm — sticky override not needed inside modal */}
                    <div style={{ position: "relative" }}>
                        <StudentForm
                            selected={student}
                            onSubmit={onSubmit}
                            onCancel={onClose}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: translateY(0) } }
            `}</style>
        </>
    );
}

// ── Main Table ────────────────────────────────────────────────────────────────
export default function StudentTable({ students, loading, onEdit, onDelete }) {
    const [search, setSearch]         = useState("");
    const [hoveredRow, setHoveredRow] = useState(null);
    const [hoveredBtn, setHoveredBtn] = useState(null);
    const [editTarget, setEditTarget] = useState(null);   // student being edited

    const filtered = students.filter((s) =>
        (s.name  ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (s.email ?? "").toLowerCase().includes(search.toLowerCase())
    );

    const handleModalSubmit = (dto) => {
        onEdit({ id: editTarget.id, ...dto });   // bubble up to Dashboard
        setEditTarget(null);
    };

    return (
        <>
            {/* Edit Modal */}
            {editTarget && (
                <EditModal
                    student={editTarget}
                    loading={loading}
                    onClose={() => setEditTarget(null)}
                    onSubmit={handleModalSubmit}
                />
            )}

            {/* Table header */}
            <div style={{
                padding: "1.25rem 1.5rem", borderBottom: "1px solid #2a2a3a",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <span style={{
                    fontFamily: "'Syne', sans-serif", fontSize: "0.85rem", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: 2, color: "#6b6b85",
                }}>Records</span>

                <div style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    background: "#1a1a24", border: "1px solid #2a2a3a",
                    borderRadius: 8, padding: "0.5rem 0.875rem",
                }}>
                    <svg width="14" height="14" fill="none" stroke="#6b6b85" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text" placeholder="search students..." value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            fontFamily: "'DM Mono', monospace", fontSize: "0.8rem",
                            background: "transparent", border: "none", outline: "none",
                            color: "#e8e8f0", width: 180,
                        }}
                    />
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid #2a2a3a" }}>
                            {["Student", "Email", "Age", "Course", "Actions"].map((h, i) => (
                                <th key={h} style={{
                                    padding: "0.9rem 1.25rem",
                                    textAlign: i === 4 ? "right" : "left",
                                    fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", fontWeight: 700,
                                    textTransform: "uppercase", letterSpacing: 2, color: "#6b6b85",
                                    whiteSpace: "nowrap",
                                }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: "center", padding: "4rem 2rem", color: "#6b6b85" }}>
                                    <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>◻</div>
                                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem" }}>
                                        no records found
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filtered.map((s) => {
                                const [bg, fg] = avatarColor(s.name);
                                const isHovered = hoveredRow === s.id;
                                return (
                                    <tr
                                        key={s.id}
                                        onMouseEnter={() => setHoveredRow(s.id)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                        style={{
                                            borderBottom: "1px solid rgba(42,42,58,0.5)",
                                            background: isHovered ? "#1a1a24" : "transparent",
                                            transition: "background 0.15s",
                                        }}
                                    >
                                        {/* Student */}
                                        <td style={{ padding: "1rem 1.25rem", verticalAlign: "middle" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                                <div style={{
                                                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                                                    background: bg, color: fg,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontSize: "0.75rem", fontWeight: 700,
                                                    fontFamily: "'Syne', sans-serif",
                                                }}>{initials(s.name)}</div>
                                                <span style={{
                                                    fontFamily: "'Syne', sans-serif",
                                                    fontSize: "0.875rem", fontWeight: 600, color: "#e8e8f0",
                                                }}>{s.name}</span>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td style={{
                                            padding: "1rem 1.25rem", verticalAlign: "middle",
                                            fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "#6b6b85",
                                        }}>{s.email}</td>

                                        {/* Age */}
                                        <td style={{
                                            padding: "1rem 1.25rem", verticalAlign: "middle",
                                            fontFamily: "'DM Mono', monospace", fontSize: "0.85rem",
                                        }}>
                                            <span style={{
                                                display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: 4,
                                                fontSize: "0.75rem", fontWeight: 700,
                                                fontFamily: "'Syne', sans-serif",
                                                background: "rgba(45,212,191,0.08)", color: "#2dd4bf",
                                            }}>{s.age}</span>
                                        </td>

                                        {/* Course */}
                                        <td style={{
                                            padding: "1rem 1.25rem", verticalAlign: "middle",
                                            fontFamily: "'DM Mono', monospace", fontSize: "0.8rem",
                                            color: "#a0a0c0", maxWidth: 180,
                                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                                        }}>{s.course}</td>

                                        {/* Actions */}
                                        <td style={{ padding: "1rem 1.25rem", verticalAlign: "middle" }}>
                                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>

                                                {/* Edit → opens modal */}
                                                <button
                                                    title="Edit" disabled={loading}
                                                    onClick={() => setEditTarget({ ...s })}
                                                    onMouseEnter={() => setHoveredBtn(`edit-${s.id}`)}
                                                    onMouseLeave={() => setHoveredBtn(null)}
                                                    style={{
                                                        width: 32, height: 32, borderRadius: 6, border: "1px solid",
                                                        borderColor: hoveredBtn === `edit-${s.id}` ? "#7c6cfc" : "#2a2a3a",
                                                        background: hoveredBtn === `edit-${s.id}` ? "rgba(124,108,252,0.08)" : "transparent",
                                                        color: hoveredBtn === `edit-${s.id}` ? "#7c6cfc" : "#6b6b85",
                                                        cursor: loading ? "not-allowed" : "pointer",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        transition: "all 0.15s", opacity: loading ? 0.5 : 1,
                                                    }}
                                                >
                                                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    title="Delete" disabled={loading}
                                                    onClick={() => onDelete(s.id)}
                                                    onMouseEnter={() => setHoveredBtn(`del-${s.id}`)}
                                                    onMouseLeave={() => setHoveredBtn(null)}
                                                    style={{
                                                        width: 32, height: 32, borderRadius: 6, border: "1px solid",
                                                        borderColor: hoveredBtn === `del-${s.id}` ? "#e85d75" : "#2a2a3a",
                                                        background: hoveredBtn === `del-${s.id}` ? "rgba(232,93,117,0.08)" : "transparent",
                                                        color: hoveredBtn === `del-${s.id}` ? "#e85d75" : "#6b6b85",
                                                        cursor: loading ? "not-allowed" : "pointer",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        transition: "all 0.15s", opacity: loading ? 0.5 : 1,
                                                    }}
                                                >
                                                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <polyline points="3 6 5 6 21 6" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M19 6l-1 14H6L5 6m5 0V4h4v2" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}