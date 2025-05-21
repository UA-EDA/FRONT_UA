import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthGuard from './AuthGuard';
import Categories from "./Categories";
import Login from "./login";
import Register from "./register";
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
                <Route path="/" element={<Layout><MainContent /></Layout>} />
                <Route element={<AuthGuard />}>
                    <Route path="/asset/upload" element={<Layout><AssetUpload /></Layout>} />
                    <Route path="/asset-view" element={<Layout><AssetView /></Layout>} />
                </Route>
                {/* Otras rutas */}
            </Routes>
        </Router>
    );
}

export default App;
