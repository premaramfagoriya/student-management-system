import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));

  return auth ? <Dashboard setAuth={setAuth} /> : <Login setAuth={setAuth} />;
}

export default App;