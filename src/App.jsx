import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import BrowseCharacters from "./components/BrowseCharacters";
import CharacterDetails from "./components/CharacterDetails";
import Comics from "./components/Comics";
import NavigationBar from "./components/NavigationBar";
import NotFound from "./components/NotFound";
import "./MarvelStyle.css";

function App() {
    return (
        <div className="app-container">
            <NavigationBar />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/characters" element={<BrowseCharacters />} />
                    <Route path="/characters/:id" element={<CharacterDetails />} />
                    <Route path="/comics" element={<Comics />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;