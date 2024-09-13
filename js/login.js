async function login() {
    const discordId = parseInt(document.getElementById('discord-id').value);
    const pin = parseInt(document.getElementById('pin').value);

    const userRef = doc(db, "accounts", discordId.toString());
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        // If the user does not exist, create a new account
        await setDoc(userRef, {
            id: discordId,
            pin: pin,
            balance: 0,
            latest_transaction: {
                amount: 0,
                recipient_id: 0,
                timestamp: null
            }
        });
        alert("New account created!");
    } else {
        const userData = userSnap.data();
        if (userData.pin === pin) {
            // Redirect to account page
            window.location.href = `account.html?id=${discordId}`;
        } else {
            alert("Invalid PIN");
        }
    }
}