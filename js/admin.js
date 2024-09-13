function adminLogin() {
    const password = document.getElementById('admin-password').value;
    if (password === 'admin') {
        document.getElementById('admin-actions').style.display = 'block';
    } else {
        alert('Invalid Admin Password');
    }
}

async function setBalance() {
    const targetId = parseInt(document.getElementById('target-id').value);
    const newBalance = parseFloat(document.getElementById('new-balance').value);

    const targetRef = doc(db, "accounts", targetId.toString());
    await updateDoc(targetRef, {
        balance: newBalance
    });

    alert('Balance Updated!');
}

async function addBalance() {
    const targetId = parseInt(document.getElementById('target-id').value);
    const addAmount = parseFloat(document.getElementById('add-amount').value);

    const targetRef = doc(db, "accounts", targetId.toString());
    const targetSnap = await getDoc(targetRef);
    const targetData = targetSnap.data();

    await updateDoc(targetRef, {
        balance: targetData.balance + addAmount
    });

    alert('Amount Added!');
}