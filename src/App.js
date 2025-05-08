import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from "./Categories";
import Login from "./Login";
import Register from "./Register";
import AssetUpload from "./UploadAsset";
import AssetView from "./AssetView";
import MainContent from "./MainContent";
import Layout from "./Layout"; // El layout con navbar y footer

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/categories" element={<Layout><Categories /></Layout>} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/asset/upload" element={<AssetUpload />} />
                <Route path="/asset-view" element={<AssetView />} />
                <Route path="/" element={<Layout><MainContent /></Layout>} />
                {/* Otras rutas */}
            </Routes>
        </Router>
    );
}

export default App;
