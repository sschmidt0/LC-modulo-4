import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.scss";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleNavigation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username === "admin" && password === "test") {
      navigate("/list");
    } else {
      alert("User / password not valid, psst... admin / test");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleNavigation} className={styles.form}>
        <h2>Login</h2>

        <div>
          <div>
            <label>Username: </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
