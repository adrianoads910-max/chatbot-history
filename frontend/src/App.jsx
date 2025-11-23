import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

return (
<main className="min-h-dvh grid place-items-center bg-slate-50">
<h1 className="text-3xl font-bold text-red-600">
Hello Tailwind + React!🔥🚀
</h1>
 <div className="mt-4 bg-slate-800 p-4 rounded-lg text-center text-amber-50 hover:bg-slate-700 transition-colors hover:scale-105">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
</main>
);
}
export default App
