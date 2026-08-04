import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
function SignUp() {
    const handleSignUp = async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account created successfully!");
  } catch (error) {
    alert(error.message);
  }
};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="page">
      <h2>Create Account</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSignUp}>
  Create Account
</button>
    </div>
  );
}

export default SignUp;