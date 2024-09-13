const params = new URLSearchParams(window.location.search);
const discordId = params.get('id');

export async function loadAccount() {
    const userRef = doc(db, "accounts", discordId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const userData = userSnap.data();
        document.getElementById('username').innerText = `Account: ${userData.id}`;
        document.getElementById('balance').innerText = userData.balance.toFixed(2);

        // Display latest transaction
        const latestTransaction = userData.latest_transaction;
        const historyElement = document.getElementById('transaction-history');
        const li = document.createElement('li');
        if (latestTransaction.timestamp) {
            li.textContent = `To: ${latestTransaction.recipient_id}, Amount: ${latestTransaction.amount}, Date: ${new Date(latestTransaction.timestamp.seconds * 1000).toLocaleString()}`;
            historyElement.appendChild(li);
        }

        // Load Discord Avatar (using Discord CDN)
        document.getElementById('avatar').src = `https://cdn.discordapp.com/avatars/${discordId}/your_avatar_hash.png`;
    }
}

loadAccount();