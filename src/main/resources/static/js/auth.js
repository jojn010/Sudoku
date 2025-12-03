const API_URL = "http://localhost:8089/api/users";

document.getElementById("signupBtn")?.addEventListener("click", signup);

async function signup() {
  const user = {
    username: document.getElementById("username").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
  };

  if (!user.username || !user.email || !user.password) {
    alert("Please fill in all fields");
    return;
  }

  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (res.ok) {
    alert("Signup successful! Please log in.");

    window.location.href = "login.html"; // 👈 redirects to login
  } else {
    const msg = await res.text();
    alert("Signup failed: " + msg);
  }
}




