const API_URL = "http://localhost:8089/api/users";

async function login() {
  const username = document.getElementById("Username").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (res.ok) {
    const user = await res.json();

    // save username and id in browser storage
        localStorage.setItem("username", user.username);
        localStorage.setItem("userId", user.id);

    // redirect to sudoku page
    window.location.href = "sudoku.html";
  } else {
    alert("Invalid Username or password");
  }
}
document.getElementById("loginBtn")?.addEventListener("click", login);