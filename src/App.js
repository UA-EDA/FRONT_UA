import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthGuard from './AuthGuard';
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
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/" element={<Layout><MainContent /></Layout>} />
                <Route element={<AuthGuard />}>
                    <Route path="/asset/upload" element={<AssetUpload />} />
                    <Route path="/asset-view" element={<AssetView />} />
                </Route>
                {/* Otras rutas */}
            </Routes>
        </Router>
    );
}

export default App;
