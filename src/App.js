import { useState } from "react";
import "./App.css";
import Main from "./Main.js";
import Login from "./Login.js";

const userFromStorage = localStorage.getItem("user");
const defaultUser = userFromStorage ? JSON.parse(userFromStorage) : null;

function App() {
  const [user, setUser] = useState(defaultUser);

  function login(email, password) {
    const url = "http://localhost:9000/login";
    const data = { email, password };
    const config = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(url, config)
      .then((response) => response.json())
      .then((result) => {
        if (!result.user) {
          return alert("Login failed, check inputs");
        }
        console.log("Success", result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);
      })
      .catch((error) => console.log("OH NOE", error));
  }

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  if (user) {
    return <Main user={user} logout={logout} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        {user ? <Main user={user} logout={logout} /> : <Login login={login} />}
      </header>
    </div>
  );
}

export default App;
