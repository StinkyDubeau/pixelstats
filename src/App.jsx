import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="mx-auto my-10 max-w-screen-lg rounded-full bg-zinc-100 p-2 text-center shadow-lg">
                <h1 className="text-3xl tracking-tighter">Pixelstats</h1>
                <p className="tracking-wider">React version</p>
            </div>
        </>
    );
}

export default App;
