import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AssetUpload from "./UploadAsset";
import AssetView from "./AssetView";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/asset/upload" element={<AssetUpload />} />
                <Route path="/asset-view" element={<AssetView />} />
                {/* Otras rutas */}
            </Routes>
        </Router>
    );
}

export default App;
