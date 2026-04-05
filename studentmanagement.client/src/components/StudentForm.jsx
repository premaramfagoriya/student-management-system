import { useState, useEffect } from "react";

const EMPTY = { name: "", email: "", age: "", course: "" };

const labelStyle = {
    fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "1.5px", color: "#6b6b85",
};

const inputStyle = (hasError = false, isFocused = false) => ({
    fontFamily: "'DM Mono', monospace", fontSize: "0.85rem",
    background: "#1a1a24", color: "#e8e8f0",
    border: `1px solid ${hasError ? "#e85d75" : isFocused ? "#7c6cfc" : "#2a2a3a"}`,
    boxShadow: hasError
        ? "0 0 0 3px rgba(232,93,117,0.12)"
        : isFocused
            ? "0 0 0 3px rgba(124,108,252,0.12)"
            : "none",
    padding: "0.7rem 1rem", borderRadius: 8, outline: "none", width: "100%",
    transition: "border-color 0.2s, box-shadow 0.2s",
});

export default function StudentForm({ onSubmit, selected, onCancel, loading }) {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [focused, setFocused] = useState(null);
    const isEditing = !!selected;

    useEffect(() => {
        setForm(selected ? { ...selected } : EMPTY);
        setErrors({});
    }, [selected]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        setErrors((err) => ({ ...err, [name]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
        if (!String(form.age).trim()) e.age = "Age is required";
        else if (isNaN(form.age) || +form.age <= 0) e.age = "Enter a valid age";
        if (!form.course.trim()) e.course = "Course is required";
        return e;
    };

    const submit = (e) => {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length) { setErrors(e2); return; }
        onSubmit({ name: form.name, email: form.email, age: form.age, course: form.course });
        setForm(EMPTY);
    };

    const fields = [
        { name: "name", label: "Full Name", type: "text", placeholder: "e.g. Jane Smith" },
        { name: "email", label: "Email", type: "email", placeholder: "jane@university.edu" },
        { name: "age", label: "Age", type: "number", placeholder: "e.g. 20" },
        { name: "course", label: "Course", type: "text", placeholder: "e.g. Computer Science" },
    ];

    return (
        <div style={{
            background: "#13131a", border: "1px solid #2a2a3a",
            borderRadius: 14, overflow: "hidden",
            position: "sticky", top: 84,
            fontFamily: "'Syne', sans-serif",
        }}>

            {/* Header */}
            <div style={{
                padding: "1.25rem 1.5rem", borderBottom: "1px solid #2a2a3a",
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <span style={{
                    fontSize: "0.85rem", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: 2, color: "#6b6b85",
                }}>Record</span>
                <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", fontWeight: 500,
                    padding: "0.2rem 0.6rem", borderRadius: 4,
                    background: isEditing ? "rgba(124,108,252,0.1)" : "rgba(45,212,191,0.1)",
                    color: isEditing ? "#7c6cfc" : "#2dd4bf",
                    border: `1px solid ${isEditing ? "rgba(124,108,252,0.25)" : "rgba(45,212,191,0.25)"}`,
                }}>
                    {isEditing ? "✎ Edit" : "+ New"}
                </span>
            </div>

            {/* Fields */}
            <form onSubmit={submit} noValidate>
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {fields.map(({ name, label, type, placeholder }) => (
                        <div key={name} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                            <label style={labelStyle}>{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={form[name]}
                                onChange={handleChange}
                                placeholder={placeholder}
                                onFocus={() => setFocused(name)}
                                onBlur={() => setFocused(null)}
                                style={inputStyle(!!errors[name], focused === name)}
                            />
                            {errors[name] && (
                                <span style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: "0.7rem", color: "#e85d75",
                                }}>{errors[name]}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: "0.75rem", padding: "0 1.5rem 1.5rem" }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            flex: 1, fontFamily: "'Syne', sans-serif",
                            fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.5px",
                            color: "#fff",
                            background: loading ? "#3a3a5a" : "linear-gradient(135deg, #7c6cfc, #5c4de0)",
                            border: "none", padding: "0.75rem", borderRadius: 8,
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.6 : 1, transition: "opacity 0.2s",
                        }}
                    >
                        {loading ? "Saving…" : isEditing ? "Update Student" : "Add Student"}
                    </button>

                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            style={{
                                fontFamily: "'Syne', sans-serif", fontSize: "0.85rem", fontWeight: 600,
                                color: "#6b6b85", background: "transparent",
                                border: "1px solid #2a2a3a", padding: "0.75rem 1.25rem",
                                borderRadius: 8, cursor: "pointer",
                                opacity: loading ? 0.5 : 1, transition: "all 0.2s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = "#e8e8f0"; e.currentTarget.style.borderColor = "#6b6b85"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "#6b6b85"; e.currentTarget.style.borderColor = "#2a2a3a"; }}
                        >Cancel</button>
                    )}
                </div>
            </form>
        </div>
    );
}