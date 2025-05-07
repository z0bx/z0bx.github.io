function checkPalindrome() {
    const name = document.getElementById("nameInput").value.trim().toLowerCase();
    const reversed = name.split('').reverse().join('');
    const result = (name === reversed) ? "Палиндром байна." : "Палиндром биш байна.";
    document.getElementById("palindromeResult").textContent = result;
}

function digitSum() {
    const num = document.getElementById("digitSumInput").value;
    const sum = num.split('').reduce((acc, val) => acc + parseInt(val), 0);
    document.getElementById("digitSumResult").textContent = "Цифрүүдийн нийлбэр: " + sum;
}

function primeDecompose() {
    let n = parseInt(document.getElementById("primeDecomposeInput").value);
    const primes = [];
    let divisor = 2;
    while (n >= 2) {
        if (n % divisor === 0) {
            primes.push(divisor);
            n /= divisor;
        } else {
            divisor++;
        }
    }
    document.getElementById("primeDecomposeResult").textContent = "Задлал: " + primes.join(", ");
}

function catchUp() {
    const d = parseFloat(document.getElementById("distanceInput").value);
    const wolfSpeed = 25;
    const rabbitSpeed = 18;
    const timeHours = d / (wolfSpeed - rabbitSpeed);
    const minutes = Math.floor(timeHours * 60);
    const seconds = Math.round((timeHours * 3600) % 60);
    document.getElementById("catchUpResult").textContent = `Гүйцэх хугацаа: ${minutes} минут ${seconds} секунд`;
}

function evenOdd() {
    const input = document.getElementById("arrayInput").value;
    const numbers = input.split(',').map(Number);
    const even = numbers.filter(n => n % 2 === 0);
    const odd = numbers.filter(n => n % 2 !== 0);
    document.getElementById("evenOddResult").textContent = `Тэгш: [${even}] | Сондгой: [${odd}]`;
}

function findApartment() {
    const num = parseInt(document.getElementById("flatNumberInput").value);
    const apartmentsPerEntrance = 9 * 4; // 36
    const entrance = Math.ceil(num / apartmentsPerEntrance);
    const inEntranceNumber = num - (entrance - 1) * apartmentsPerEntrance;
    const floor = Math.ceil(inEntranceNumber / 4);
    const door = ((inEntranceNumber - 1) % 4) + 1;
    document.getElementById("apartmentResult").textContent = 
        `${entrance}-р орц, ${floor}-р давхар, ${door}-р хаалга`;
}

function showBox() {
    const hour = new Date().getHours();
    const box = document.createElement("div");
    box.className = "box";
    box.style.background = (hour < 12) ? "green" : "red";
    box.style.left = (hour < 12) ? "0px" : "calc(100% - 50px)";
    box.style.top = (hour < 12) ? "0px" : "calc(100% - 50px)";
    const container = document.getElementById("boxContainer");
    container.innerHTML = '';
    container.appendChild(box);
}

function petyasGame() {
    const n = parseInt(document.getElementById("coinsInput").value);
    const k = parseInt(document.getElementById("kInput").value);
    let answer = 0;
    for (let first = 1; first <= k; first++) {
        let remaining = n - first;
        let turn = 0;
        let maxPick = k;
        while (remaining > 0) {
            let pick = Math.min(remaining, maxPick + 1);
            remaining -= pick;
            turn++;
        }
        if (turn % 2 === 0) {
            answer = first;
            break;
        }
    }
    document.getElementById("gameResult").textContent = 
        answer === 0 ? "Хожих боломжгүй." : `Хожихын тулд эхэндээ ${answer} зоос ав`;
}
