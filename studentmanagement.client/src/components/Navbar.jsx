export default function Navbar({ onLogout }) {
    return (
        <nav style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 2.5rem", height: "64px",
            borderBottom: "1px solid #2a2a3a",
            background: "rgba(12,12,16,0.85)",
            backdropFilter: "blur(12px)",
            position: "sticky", top: 0, zIndex: 100,
            fontFamily: "'Syne', sans-serif",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: "linear-gradient(135deg, #7c6cfc, #e85d75)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", fontWeight: 800, color: "#fff",
                }}>S</div>
                <span style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.3px", color: "#e8e8f0" }}>
                    Student<span style={{ color: "#7c6cfc" }}>OS</span>
                </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
                    color: "#6b6b85", background: "#1a1a24",
                    border: "1px solid #2a2a3a", padding: "0.25rem 0.75rem",
                    borderRadius: 999,
                }}>admin · session active</span>

                <button onClick={onLogout} style={{
                    fontFamily: "'Syne', sans-serif", fontSize: "0.8rem", fontWeight: 600,
                    color: "#e85d75", background: "transparent",
                    border: "1px solid rgba(232,93,117,0.3)",
                    padding: "0.4rem 1rem", borderRadius: 6, cursor: "pointer",
                    letterSpacing: "0.5px", transition: "all 0.2s",
                }}
                    onMouseEnter={e => { e.target.style.background = "rgba(232,93,117,0.1)"; e.target.style.borderColor = "#e85d75"; }}
                    onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(232,93,117,0.3)"; }}
                >↪ Logout</button>
            </div>
        </nav>
    );
}