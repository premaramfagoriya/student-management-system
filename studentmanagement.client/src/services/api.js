const BASE_URL = "https://localhost:7214/api";

// ================= LOGIN =================
export const loginUser = async (data) => {
    try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            throw new Error("Login failed");
        }

        const result = await res.json();

        // ✅ SAVE TOKEN
        localStorage.setItem("token", result.token);

        return result;
    } catch (error) {
        console.error("Login Error:", error);
        throw error;
    }
};

// ================= GET =================
export const getStudents = async () => {
    try {
        const res = await fetch(`${BASE_URL}/student`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!res.ok) throw new Error("Failed to fetch students");

        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ================= ADD =================
export const addStudent = async (data) => {
    try {
        const res = await fetch(`${BASE_URL}/student`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error("Add failed");

        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ================= UPDATE =================
export const updateStudent = async (id, data) => {
    try {
        const res = await fetch(`${BASE_URL}/student/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) throw new Error("Update failed");

        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// ================= DELETE =================
export const deleteStudent = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/student/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (!res.ok) throw new Error("Delete failed");

        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
};