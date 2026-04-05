import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import { getStudents, addStudent, updateStudent, deleteStudent } from "../services/api";

export default function Dashboard({ setAuth }) {
    const [students, setStudents] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const showError = (msg) => { setError(msg); setTimeout(() => setError(""), 4000); };
    const showSuccess = (msg) => { setSuccessMsg(msg); setTimeout(() => setSuccessMsg(""), 3000); };

    const loadStudents = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getStudents();
            setStudents(data);
        } catch {
            showError("Failed to load students");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let alive = true;
        if (alive) loadStudents();
        return () => { alive = false; };
    }, [loadStudents]);

    const handleSubmit = async (dto) => {
        try {
            setLoading(true);
            if (selected) {
                await updateStudent(selected.id, dto);
                showSuccess("Student updated successfully");
                setSelected(null);
            } else {
                await addStudent(dto);
                showSuccess("Student created successfully");
            }
            await loadStudents();
        } catch {
            showError(selected ? "Update failed" : "Add failed");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this student?")) return;
        try {
            setLoading(true);
            await deleteStudent(id);
            showSuccess("Student deleted");
            await loadStudents();
        } catch {
            showError("Delete failed");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuth(false);
    };

    const activeCount = students.filter((s) => s.status === "active").length;

    return (
        <div style={{ minHeight: "100vh", background: "#0c0c10", color: "#e8e8f0", fontFamily: "'Syne', sans-serif", position: "relative", overflow: "hidden" }}>
            {/* Google Fonts */}
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');`}</style>

            {/* Glow blobs */}
            <div style={{ position: "fixed", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,108,252,0.06) 0%, transparent 70%)", top: -100, right: -100, pointerEvents: "none", zIndex: 0 }} />
            <div style={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,93,117,0.04) 0%, transparent 70%)", bottom: -100, left: -100, pointerEvents: "none", zIndex: 0 }} />

            <Navbar onLogout={handleLogout} />

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 2rem", position: "relative", zIndex: 1 }}>
                {/* Page Header */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem" }}>
                    <div>
                        <h1 style={{
                            fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1, margin: 0,
                            background: "linear-gradient(90deg, #7c6cfc, #e85d75)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        }}>Students</h1>
                        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", color: "#6b6b85", marginTop: "0.4rem" }}>
                            // manage enrollment records
                        </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                        {[{ num: students.length, lbl: "Total" }, { num: activeCount, lbl: "Active" }].map(({ num, lbl }) => (
                            <div key={lbl} style={{
                                display: "flex", flexDirection: "column", alignItems: "flex-end",
                                background: "#13131a", border: "1px solid #2a2a3a",
                                borderRadius: 10, padding: "0.6rem 1rem",
                            }}>
                                <span style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-1px", color: "#2dd4bf" }}>{num}</span>
                                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: "#6b6b85", textTransform: "uppercase", letterSpacing: 1 }}>{lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Toasts */}
                {error && (
                    <div style={{
                        display: "flex", alignItems: "center", gap: "0.75rem",
                        background: "rgba(232,93,117,0.08)", border: "1px solid rgba(232,93,117,0.3)",
                        borderRadius: 8, padding: "0.75rem 1.25rem", marginBottom: "1.25rem",
                        fontSize: "0.85rem", color: "#e85d75",
                    }}>⚠ {error}</div>
                )}
                {successMsg && (
                    <div style={{
                        display: "flex", alignItems: "center", gap: "0.75rem",
                        background: "rgba(34,211,160,0.08)", border: "1px solid rgba(34,211,160,0.25)",
                        borderRadius: 8, padding: "0.75rem 1.25rem", marginBottom: "1.25rem",
                        fontSize: "0.85rem", color: "#22d3a0",
                    }}>✓ {successMsg}</div>
                )}

                {/* Body */}
                <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "1.5rem", alignItems: "start" }}>
                    {/* StudentForm – only receives onSubmit and selected (matching simple version) */}
                    <StudentForm
                        onSubmit={handleSubmit}
                        selected={selected}
                    />

                    <div style={{ background: "#13131a", border: "1px solid #2a2a3a", borderRadius: 14, overflow: "hidden" }}>
                        {loading && !students.length ? (
                            <div style={{ textAlign: "center", padding: "4rem 2rem", color: "#6b6b85" }}>
                                <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: "0.75rem" }}>
                                    {[0, 0.2, 0.4].map((delay, i) => (
                                        <div key={i} style={{
                                            width: 8, height: 8, borderRadius: "50%", background: "#7c6cfc",
                                            animation: `bounce 1.2s ${delay}s infinite`,
                                        }} />
                                    ))}
                                </div>
                                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem" }}>loading records...</div>
                                <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0);opacity:.4} 40%{transform:translateY(-8px);opacity:1} }`}</style>
                            </div>
                        ) : (
                            /* StudentTable – only receives students, onEdit, onDelete (matching simple version) */
                            <StudentTable
                                students={students}
                                onEdit={(s) => setSelected({ ...s })}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}