import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LangContext from "./LangContext";
import AuthGuard from './AuthGuard';
import Categories from "./Categories";
import Login from "./login";
import Register from "./register";
import AssetUpload from "./UploadAsset";
import AssetView from "./AssetView";
import MainContent from "./MainContent";
import Layout from "./Layout"; // El layout con navbar y footer
import UserDashboard from "./UserDashboard";
import EditAsset from "./EditAsset";

function App() {

    const [lang, setLang] = useState(localStorage.getItem('lang') || 'es');
    
    return (
        <LangContext.Provider value={{ lang, setLang }}>
        <Router>
            <Routes>
                <Route path="/categories" element={<Layout><Categories /></Layout>} />
                <Route path="/auth/login" element={<Login />} />
              
                <Route path="/" element={<Layout><MainContent /></Layout>} />
                <Route element={<AuthGuard />}>
                    <Route path="/asset/upload" element={<Layout><AssetUpload /></Layout>} />
                    <Route path="/asset-view" element={<Layout><AssetView /></Layout>} />
                    <Route path="/asset-edit" element={<Layout><EditAsset /></Layout>} />
                </Route>
                <Route path="/auth/register" element={<Register />} />
                <Route path="/dashboard-usuario" element={<Layout><UserDashboard /></Layout>} />

                {/* Otras rutas */}
            </Routes>
        </Router>
        </LangContext.Provider>
    );
}

export default App;
