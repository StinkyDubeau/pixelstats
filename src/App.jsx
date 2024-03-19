import { useState } from "react";
import ApiTest from "./components/ApiTest";
import Frame from "./components/Frame";
import PlayerCard from "./components/PlayerCard";

function App() {
    const [count, setCount] = useState(0);

    return (
        <Frame>
            <div className="rounded-lg border border-x-zinc-700 border-b-zinc-800 border-t-zinc-500 bg-zinc-100 p-2 text-center shadow-lg">
                <h1 className="text-3xl tracking-tighter">Pixelstats</h1>
                <p className="tracking-wider">React version</p>
            </div>

            <div className="mx-auto">
                <PlayerCard uuid={import.meta.env.VITE_EXAMPLE_UUID}/>
                {/* <ApiTest /> */}
            </div>
        </Frame>
    );
}

export default App;
