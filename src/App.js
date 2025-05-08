import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AssetUpload from "./UploadAsset";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/asset/upload" element={<AssetUpload />} />
                {/* Otras rutas */}
            </Routes>
        </Router>
    );
}

export default App;
