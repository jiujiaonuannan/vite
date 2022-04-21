import { Header } from "./components/Header";

function App() {
  return (
    <div className="flex-c">
      <Header />
      <button
        bg="blue-400 hover:blue-800 dark:blue-500 dark:hover:blue-600"
        text="sm white"
        font="mono light"
        p="y-2 x-4"
        border="2 rounded blue-200"
      >
        Button
      </button>
    </div>
  );
}

export default App;
