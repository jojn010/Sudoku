const API_URL = "http://localhost:8089/api/users";

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("leaderboard-page")) {
    loadLeaderboard();

    const filter = document.getElementById("sortFilter");
    filter.addEventListener("change", () => loadLeaderboard(filter.value));
  }
});

async function loadLeaderboard(sortBy = "totalScore") {
  const res = await fetch(`${API_URL}/leaderboard`);
  let users = await res.json();

  // Sort users by selected filter
  users.sort((a, b) => b[sortBy] - a[sortBy]);

  const table = document.getElementById("leaderboard-Body");
  table.innerHTML = "";

  users.forEach((u, i) => {
    const row = `<tr>
        <td>${i + 1}</td>
        <td>${u.username}</td>
        <td>${u.bestScore}</td>
        <td>${u.wins}</td>
        <td>${u.totalScore}</td>
      </tr>`;
    table.innerHTML += row;
  });
}
