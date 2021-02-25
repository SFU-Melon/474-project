import axios from "axios";

function App() {
  return (
    <div className="">
      <h1>App</h1>
      <button
        onClick={() => {
          axios.get("/api/user/register");
        }}
      >
        Click me
      </button>
    </div>
  );
}

export default App;
