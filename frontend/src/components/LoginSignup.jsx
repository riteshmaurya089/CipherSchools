import React, { useState } from "react";
import api from "../api/axios";
//import "./LoginSignup.scss";

const LoginSignup = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      return setError("Please fill in all fields");
    }

    if (!isLogin && !formData.name) {
      return setError("Name is required");
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setIsLoading(true);

      const endpoint = isLogin ? "/auth/login" : "/auth/signup";

      const { data } = await api.post(endpoint, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (!data.success) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      onLogin(data.user);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Server connection error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-signup">
      <div className="login-signup__container">
        <div className="login-signup__header">
          <h1 className="login-signup__title">
            <span className="login-signup__icon">⚡</span>
            CipherSQLStudio
          </h1>
          <p className="login-signup__subtitle">
            Master SQL Through Practice
          </p>
        </div>

        <div className="login-signup__form-container">
          <div className="login-signup__tabs">
            <button
              type="button"
              className={`login-signup__tab ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              type="button"
              className={`login-signup__tab ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <form
            className="login-signup__form"
            onSubmit={handleSubmit}
          >
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            {error && (
              <div className="error-message">{error}</div>
            )}

            <button
              type="submit"
              className="btn btn--primary login-signup__submit"
              disabled={isLoading}
            >
              {isLoading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Sign Up"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default LoginSignup;