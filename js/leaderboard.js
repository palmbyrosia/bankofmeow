async function loadLeaderboard() {
    const q = query(collection(db, "accounts"), orderBy("balance", "desc"));
    const querySnapshot = await getDocs(q);

    const leaderboardElement = document.getElementById('leaderboard');
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const li = document.createElement('li');
        li.textContent = `ID: ${data.id}, Balance: ${data.balance.toFixed(2)} Meow Points`;
        leaderboardElement.appendChild(li);
    });
}

loadLeaderboard();