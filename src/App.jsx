import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="bg-slate-200 h-screen">
                <div className="py-4 px-10">

                <div className="mx-auto my-4 max-w-screen-lg rounded-lg border-t-zinc-500 border-x-zinc-700 border-b-zinc-800 bg-zinc-100 border-2 p-2 text-center shadow-lg">
                        <h1 className="text-3xl tracking-tighter">Pixelstats</h1>
                        <p className="tracking-wider">React version</p>
                    </div>

                    <div className="mx-auto my-4 max-w-screen-lg rounded-lg border-t-zinc-500 border-x-zinc-700 border-b-zinc-800 bg-zinc-100 border-2 p-2 text-center shadow-lg">
                        <p className="p-6 text-justify">Here is some lorum ipsum text. Blah blah pepsi coke hooray! This is a sentence. Here is some lorum ipsum text. Blah blah pepsi coke hooray! This is a sentence. Here is some lorum ipsum text. Blah blah pepsi coke hooray! This is a sentence. Here is some lorum ipsum text. Blah blah pepsi coke hooray! This is a sentence. Here is some lorum ipsum text. Blah blah pepsi coke hooray! This is a sentence. Here is some lorum ipsum text. Blah blah pepsi coke hooray! This is a sentence. Here is some lorum ipsum text. Blah blah pepsi coke hooray! This is a sentence. Here is some lorum ipsum text. Blah blah pepsi coke hooray! This is a sentence. Here is some lorum ipsum text. Blah blah pepsi coke hooray! This is a sentence. Here is some lorum ipsum text. Blah blah pepsi coke hooray! This is a sentence. Here is some lorum ipsum text. Blah blah pepsi coke hooray! This is a sentence. Here is some lorum ipsum text. Blah blah pepsi coke hooray! This is a sentence. </p>
                    </div>

                </div>
            </div>
        </>
    );
}

export default App;
