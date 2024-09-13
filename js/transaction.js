const discordId = new URLSearchParams(window.location.search).get('id');

    async function makeTransaction() {
        const recipientId = parseInt(document.getElementById('recipient-id').value);
        const amount = parseFloat(document.getElementById('amount').value);

        const senderRef = doc(db, "accounts", discordId);
        const recipientRef = doc(db, "accounts", recipientId.toString());

        const senderSnap = await getDoc(senderRef);
        const recipientSnap = await getDoc(recipientRef);

        if (recipientSnap.exists() && senderSnap.exists()) {
            const senderData = senderSnap.data();
            const recipientData = recipientSnap.data();

            if (senderData.balance >= amount) {
                // Update sender balance
                await updateDoc(senderRef, {
                    balance: senderData.balance - amount,
                    latest_transaction: {
                        amount: amount,
                        recipient_id: recipientId,
                        timestamp: new Date()
                    }
                });

                // Update recipient balance
                await updateDoc(recipientRef, {
                    balance: recipientData.balance + amount,
                    latest_transaction: {
                        amount: amount,
                        recipient_id: recipientId,
                        timestamp: new Date()
                    }
                });

                alert("Transaction Successful!");
                window.location.reload();
            } else {
                alert("Insufficient funds!");
            }
        } else {
            alert("Recipient account not found.");
        }
    }