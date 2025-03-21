import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                {/* Otras rutas */}
            </Routes>
        </Router>
    );
}

export default App;
