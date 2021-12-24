import "./App.css";
import { Routes, Route} from "react-router-dom";
import Home from "./routes/Home";
import CoinPage from "./routes/CoinPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coinpage/:id" element={<CoinPage />} />
        </Routes>
    );
}

export default App;
