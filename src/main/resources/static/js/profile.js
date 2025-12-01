const API_URL = "http://localhost:8089/api/users"; // change port if needed

window.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    // not logged in → redirect
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/${userId}`);
    if (!res.ok) {
      alert("Failed to load profile data");
      return;
    }

    const user = await res.json();
    document.getElementById("usernameDisplay").innerText = user.username;
    document.getElementById("emailDisplay").innerText = user.email;
    document.getElementById("bestScore").innerText = user.bestScore;
    document.getElementById("wins").innerText = user.wins;
    document.getElementById("games").innerText = user.games;
    document.getElementById("mistakes").innerText = user.mistakes;
    document.getElementById("totalScore").innerText = user.totalScore;
  } catch (err) {
    console.error("Error loading profile:", err);
    alert("Error loading profile data");
  }
});

function logout() {
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
  window.location.href = "login.html";
}
