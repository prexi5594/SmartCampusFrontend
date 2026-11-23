import { useState } from "react";

function AuthPage({ initialError, onSubmit }) {
  const [mode, setMode] = useState("login");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegistering = mode === "register";

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const result = await onSubmit({ mode, displayName, email, password });

      if (result?.accountCreated) {
        setMode("login");
        setPassword("");
        setSuccessMessage("Your account is ready. Please sign in.");
      }
    } catch (error) {
      setFormError(error.message || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode);
    setFormError("");
    setSuccessMessage("");
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-heading">
        <span className="eyebrow">USIU SMART CAMPUS</span>
        <h1 id="auth-heading">
          {isRegistering ? "Create your account" : "Welcome back"}
        </h1>
        <p>
          {isRegistering
            ? "Register to explore campus and plan your routes."
            : "Sign in to continue to your campus navigator."}
        </p>

        {(initialError || formError) && (
          <p className="auth-error" role="alert">
            {formError || initialError}
          </p>
        )}
        {successMessage && (
          <p className="auth-success" role="status">
            {successMessage}
          </p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <label htmlFor="auth-display-name">Your name</label>
              <input
                id="auth-display-name"
                name="displayName"
                autoComplete="name"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                required
              />
            </>
          )}

          <label htmlFor="auth-email">Email address</label>
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            name="password"
            type="password"
            autoComplete={isRegistering ? "new-password" : "current-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button
            type="submit"
            className="primary-button auth-submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Please wait…"
              : isRegistering
                ? "Create account"
                : "Sign in"}
          </button>
        </form>

        <p className="auth-mode-switch">
          {isRegistering ? "Already have an account?" : "New to campus navigator?"}
          <button
            type="button"
            onClick={() => changeMode(isRegistering ? "login" : "register")}
          >
            {isRegistering ? "Sign in" : "Create account"}
          </button>
        </p>
      </section>
    </main>
  );
}

export default AuthPage;
