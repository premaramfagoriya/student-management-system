import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login({ setAuth }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(""); // Clear error on input
    };

    const login = async (e) => {
        e.preventDefault(); // Prevent form submission reload

        if (!form.username || !form.password) {
            setError("Please enter both username and password");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const res = await loginUser(form);

            if (res.token) {
                // Store token if needed
                localStorage.setItem("token", res.token);
                setAuth(true);
                window.location.href = "/dashboard";
            } else {
                setError("Invalid username or password");
            }
        } catch (err) {
            console.error(err);
            setError(err.message || "Server error or CORS issue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}>
            {/* Google Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
            `}</style>

            {/* Login Card */}
            <div style={{
                background: "white",
                borderRadius: "24px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                width: "100%",
                maxWidth: "440px",
                margin: "1rem",
                overflow: "hidden",
                animation: "slideUp 0.5s ease-out",
            }}>
                {/* Header */}
                <div style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    padding: "2rem",
                    textAlign: "center",
                }}>
                    <div style={{
                        width: "64px",
                        height: "64px",
                        background: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                    }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </div>
                    <h1 style={{
                        color: "white",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem",
                    }}>Welcome Back</h1>
                    <p style={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: "0.875rem",
                    }}>Sign in to access your dashboard</p>
                </div>

                {/* Form */}
                <form onSubmit={login} style={{ padding: "2rem" }}>
                    {/* Username Field */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: "0.5rem",
                        }}>
                            Username
                        </label>
                        <div style={{ position: "relative" }}>
                            <div style={{
                                position: "absolute",
                                left: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#9CA3AF",
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <input
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                value={form.username}
                                onChange={handleChange}
                                autoComplete="username"
                                style={{
                                    width: "100%",
                                    padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                                    fontSize: "0.875rem",
                                    border: "1px solid #E5E7EB",
                                    borderRadius: "12px",
                                    outline: "none",
                                    transition: "all 0.2s",
                                    fontFamily: "inherit",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#667eea";
                                    e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#E5E7EB";
                                    e.target.style.boxShadow = "none";
                                }}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "#374151",
                            marginBottom: "0.5rem",
                        }}>
                            Password
                        </label>
                        <div style={{ position: "relative" }}>
                            <div style={{
                                position: "absolute",
                                left: "12px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#9CA3AF",
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </div>
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                style={{
                                    width: "100%",
                                    padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                                    fontSize: "0.875rem",
                                    border: "1px solid #E5E7EB",
                                    borderRadius: "12px",
                                    outline: "none",
                                    transition: "all 0.2s",
                                    fontFamily: "inherit",
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = "#667eea";
                                    e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = "#E5E7EB";
                                    e.target.style.boxShadow = "none";
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "12px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "#9CA3AF",
                                    fontSize: "0.75rem",
                                }}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div style={{
                            background: "#FEE2E2",
                            border: "1px solid #FCA5A5",
                            borderRadius: "12px",
                            padding: "0.75rem",
                            marginBottom: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span style={{ fontSize: "0.875rem", color: "#991B1B" }}>{error}</span>
                        </div>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "0.875rem",
                            background: loading ? "#9CA3AF" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            border: "none",
                            borderRadius: "12px",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "all 0.2s",
                            opacity: loading ? 0.7 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        {loading ? (
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                    {/* Demo Credentials */}
                    <div style={{
                        marginTop: "1.5rem",
                        paddingTop: "1.5rem",
                        borderTop: "1px solid #E5E7EB",
                        textAlign: "center",
                    }}>
                        <p style={{
                            fontSize: "0.75rem",
                            color: "#6B7280",
                            marginBottom: "0.5rem",
                        }}>
                            Demo Credentials
                        </p>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1rem",
                            fontSize: "0.7rem",
                            fontFamily: "monospace",
                            color: "#4B5563",
                        }}>
                            <span>username: admin</span>
                            <span>password: admin123</span>
                        </div>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}