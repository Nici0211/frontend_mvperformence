import { Outlet } from "react-router-dom";
// @ts-ignore
import "/css/App.css";

function App() {
    return (
        <div className="app">
            <Outlet />
        </div>
    );
}

export default App;
