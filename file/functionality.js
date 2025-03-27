const form = document.getElementById('registrationForm');
const membershipSelect = document.getElementById('membership');
const paymentQR = document.getElementById('paymentQR');
const paymentLink = document.getElementById('paymentLink');

const qr25 = 'qr25.png';  // Replace with correct file name
const qr35 = 'qr35.png';  // Replace with correct file name

const link25 = 'https://www.ing.nl/payreq/m/?trxid=gVLoMRAcyasF1NuCBAIehtFG9lNmBaqE';
const link35 = 'https://www.ing.nl/payreq/m/?trxid=yZI8XYc3nXXeDtczLawLBDJOjGEqqGqV';

let registrations = 0;

membershipSelect.addEventListener('change', () => {
    if (membershipSelect.value === 'Orbit Member') {
        paymentQR.src = qr25;
        paymentLink.href = link25;
    } else {
        paymentQR.src = qr35;
        paymentLink.href = link35;
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (registrations >= 30) {
        document.getElementById('statusMessage').textContent = "Registration closed: 30 spots filled.";
        return;
    }

    const data = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        gender: document.getElementById('gender').value,
        membership: membershipSelect.value
    };

    await saveToExcel(data);
    sendEmail(data.email);

    registrations++;
    if (registrations >= 30) {
        document.getElementById('statusMessage').textContent = "Registration closed: 30 spots filled.";
    } else {
        document.getElementById('statusMessage').textContent = "Registration successful!";
    }

    form.reset();
});

async function saveToExcel(data) {
    const response = await fetch('save.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}

function sendEmail(email) {
    fetch('sendEmail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
}
