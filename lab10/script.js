// Words and hints for the game
        const wordList = [
            { word: "МОНГОЛ", hint: "Улсын нэр" },
            { word: "КОМПЬЮТЕР", hint: "Электрон төхөөрөмж" },
            { word: "ЦЭЦЭГ", hint: "Ургамлын төрөл" },
            { word: "ТЭНГЭР", hint: "Дээд ертөнц" },
            { word: "ХООЛ", hint: "Идэх зүйл" },
            { word: "НОМЫН_САН", hint: "Мэдлэгийн сан" },
            { word: "ИНТЕРНЕТ", hint: "Харилцааны сүлжээ" },
            { word: "ДЭЛХИЙ", hint: "Гараг" },
            { word: "УНАДАГ_ДУГУЙ", hint: "Тээврийн хэрэгсэл" },
            { word: "ХӨГЖИМ", hint: "Урлагийн хэлбэр" },
            { word: "ЦОНХ", hint: "Барилгын хэсэг" },
            { word: "УТАС", hint: "Харилцааны хэрэгсэл" },
            { word: "ЦАГ", hint: "Хугацааг харуулах хэрэгсэл" },
            { word: "ХЭРЭМ", hint: "Эртний барилга" },
            { word: "ГЭРЭЛ", hint: "Гэрэлтүүлэг" },
            { word: "ГАХАЙ", hint: "Мал, амьтан" },
            { word: "ТӨМӨР_ЗАМ", hint: "Тээврийн дэд бүтэц" },
            { word: "ТЭМЭЭ", hint: "Цөлийн амьтан" },
            { word: "ГЭГЭЭН", hint: "Гэрэлтэй холбоотой" },
            { word: "ХУЛГАНА", hint: "Жижиг амьтан" },
            { word: "ШИРЭЭ", hint: "Тавилга" },
            { word: "ҮҮЛЭН", hint: "Тэнгэрийн үзэгдэл" },
            { word: "ДАЛАЙ", hint: "Усны их биет" },
            { word: "НОМ", hint: "Уншдаг зүйл" },
            { word: "ХҮРД", hint: "Эргэх механизм" },
            { word: "СУВД", hint: "Үнэт эрдэнэ" },
            { word: "АЯЛАЛ", hint: "Аян замын нэр" },
            { word: "СҮЛЖЭЭ", hint: "Холболтын систем" },
            { word: "ОРООЛТ", hint: "Хүйтэнд зүүдэг зүйл" },
            { word: "УЛААНБААТАР", hint: "Монгол улсын нийслэл" }
        ];

        // Mongolian keyboard layout
        const mongolianKeyboardLayout = [
            'Ф', 'Ц', 'У', 'Ж', 'Э', 'Н', 'Г', 'Ш', 'Ү', 'З', 'К',
            'Й', 'Ы', 'Б', 'Ө', 'А', 'Х', 'Р', 'О', 'Л', 'Д',
            'П', 'Я', 'Ч', 'Ё', 'С', 'М', 'И', 'Т', 'Ь', 'В', 'Е','Ю','Щ','Ъ', '_'
        ];

        // Game variables
        let currentWord = "";
        let currentHint = "";
        let guessedLetters = [];
        let correctGuesses = 0;
        let wrongGuesses = 0;
        let score = 0;
        let timer = 60;
        let timerInterval;
        let gameActive = false;
        
        // DOM elements
        const loginScreen = document.getElementById('login-screen');
        const loginForm = document.getElementById('login-form');
        const gameArea = document.getElementById('game-area');
        const playerNameDisplay = document.getElementById('player-name');
        const scoreDisplay = document.getElementById('score');
        const timerDisplay = document.getElementById('timer');
        const hintDisplay = document.getElementById('hint');
        const wordContainer = document.getElementById('word-container');
        const keyboardEl = document.getElementById('keyboard');
        const gameOverScreen = document.getElementById('game-over-screen');
        const winScreen = document.getElementById('win-screen');
        const timeUpScreen = document.getElementById('time-up-screen');
        const leaderboardScreen = document.getElementById('leaderboard-screen');
        const correctWordDisplay = document.getElementById('correct-word');
        const finalScoreDisplay = document.getElementById('final-score');
        const timeUpScoreDisplay = document.getElementById('time-up-score');
        const highScoreMessageDisplay = document.getElementById('high-score-message');
        const leaderboardBody = document.getElementById('leaderboard-body');
        
        // Buttons
        const tryAgainButton = document.getElementById('try-again-button');
        const nextWordButton = document.getElementById('next-word-button');
        const playAgainButton = document.getElementById('play-again-button');
        const showLeaderboardButtonGameOver = document.getElementById('show-leaderboard-button-gameover');
        const showLeaderboardButtonWin = document.getElementById('show-leaderboard-button-win');
        const showLeaderboardButtonTimeUp = document.getElementById('show-leaderboard-button-timeup');
        const backToGameButton = document.getElementById('back-to-game-button');
        const newGameButton = document.getElementById('new-game-button');

        // Initialize game
        function init() {
            // Event listeners
            loginForm.addEventListener('submit', startGame);
            tryAgainButton.addEventListener('click', resetGame);
            nextWordButton.addEventListener('click', nextWord);
            playAgainButton.addEventListener('click', resetGame);
            showLeaderboardButtonGameOver.addEventListener('click', showLeaderboard);
            showLeaderboardButtonWin.addEventListener('click', showLeaderboard);
            showLeaderboardButtonTimeUp.addEventListener('click', showLeaderboard);
            backToGameButton.addEventListener('click', hideLeaderboard);
            newGameButton.addEventListener('click', resetGame);
            
            // Check if player already exists in cookies
            const savedPlayer = getCookie('hangmanPlayer');
            if (savedPlayer) {
                document.getElementById('nickname').value = savedPlayer;
            }
            
            // Create keyboard
            createKeyboard();
        }

        // Start the game
        function startGame(e) {
            e.preventDefault();
            const nickname = document.getElementById('nickname').value.trim();
            
            if (!nickname) {
                alert('Нэрээ оруулна уу!');
                return;
            }
            
            // Save player name in cookie
            setCookie('hangmanPlayer', nickname, 30);
            
            // Show player name
            playerNameDisplay.textContent = nickname;
            
            // Hide login, show game
            loginScreen.style.display = 'none';
            gameArea.style.display = 'block';
            
            // Reset game state
            score = 0;
            scoreDisplay.textContent = score;
            
            // Start the game
            nextWord();
            startTimer();
            gameActive = true;
        }

        // Create the keyboard UI
        function createKeyboard() {
            keyboardEl.innerHTML = '';
            mongolianKeyboardLayout.forEach(letter => {
                const keyButton = document.createElement('button');
                keyButton.textContent = letter;
                keyButton.className = 'key';
                keyButton.addEventListener('click', () => {
                    if (gameActive && !guessedLetters.includes(letter)) {
                        checkGuess(letter);
                    }
                });
                keyboardEl.appendChild(keyButton);
            });
        }

        // Start the game timer
        function startTimer() {
            clearInterval(timerInterval);
            timer = 60;
            updateTimerDisplay();
            
            timerInterval = setInterval(() => {
                timer--;
                updateTimerDisplay();
                
                if (timer <= 0) {
                    clearInterval(timerInterval);
                    endGame('timeUp');
                }
            }, 1000);
        }

        // Update timer display
        function updateTimerDisplay() {
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // Set up a new word
        function nextWord() {
            // Clear previous game state
            guessedLetters = [];
            correctGuesses = 0;
            wrongGuesses = 0;
            
            // Hide all hangman parts
            document.querySelectorAll('.hangman-part').forEach(part => {
                if (!part.id.includes('scaffold')) {
                    part.style.display = 'none';
                }
            });
            
            // Reset keyboard
            document.querySelectorAll('.key').forEach(key => {
                key.className = 'key';
            });
            
            // Hide win/game over screens
            winScreen.style.display = 'none';
            gameOverScreen.style.display = 'none';
            gameArea.style.display = 'block';
            
            // Select a random word
            const randomIndex = Math.floor(Math.random() * wordList.length);
            currentWord = wordList[randomIndex].word;
            currentHint = wordList[randomIndex].hint;
            
            // Display hint
            hintDisplay.textContent = `Сэжүүр: ${currentHint}`;
            
            // Create word display
            displayWord();
            
            // Start game
            gameActive = true;
        }

        // Display the word with blanks for unguessed letters
        function displayWord() {
            wordContainer.innerHTML = '';
            
            for (let i = 0; i < currentWord.length; i++) {
                const letterBox = document.createElement('div');
                letterBox.className = 'letter-box';
                
                if (currentWord[i] === '_') {
                    letterBox.textContent = ' ';
                    correctGuesses++; // Don't count spaces as letters to guess
                } else if (guessedLetters.includes(currentWord[i])) {
                    letterBox.textContent = currentWord[i];
                } else {
                    letterBox.textContent = '';
                }
                
                wordContainer.appendChild(letterBox);
            }
        }

        // Check if the guessed letter is in the word
        function checkGuess(letter) {
            if (guessedLetters.includes(letter)) return;
            
            guessedLetters.push(letter);
            
            // Find the key button and mark it as used
            const keyButton = Array.from(document.querySelectorAll('.key')).find(key => key.textContent === letter);
            
            if (currentWord.includes(letter)) {
                // Correct guess
                if (keyButton) keyButton.className = 'key correct';
                
                // Count correct guesses
                let newCorrectGuesses = 0;
                for (let i = 0; i < currentWord.length; i++) {
                    if (currentWord[i] === letter) {
                        newCorrectGuesses++;
                    }
                }
                
                correctGuesses += newCorrectGuesses;
                score += (newCorrectGuesses * 10);
                scoreDisplay.textContent = score;
                
                // Update display
                displayWord();
                
                // Check if word is completed
                if (correctGuesses >= currentWord.replace(/_/g, '').length) {
                    endGame('win');
                }
            } else {
                // Wrong guess
                if (keyButton) keyButton.className = 'key wrong';
                wrongGuesses++;
                
                // Show hangman part
                const hangmanParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
                if (wrongGuesses <= hangmanParts.length) {
                    document.getElementById(hangmanParts[wrongGuesses - 1]).style.display = 'block';
                }
                
                // Check if game over
                if (wrongGuesses >= 6) {
                    endGame('lose');
                }
            }
        }

        // End the game
        function endGame(result) {
            gameActive = false;
            
            if (result === 'win') {
                finalScoreDisplay.textContent = score;
                winScreen.style.display = 'block';
                gameArea.style.display = 'none';
            } else if (result === 'lose') {
                correctWordDisplay.textContent = currentWord;
                gameOverScreen.style.display = 'block';
                gameArea.style.display = 'none';
            } else if (result === 'timeUp') {
                timeUpScoreDisplay.textContent = score;
                
                // Update leaderboard
                updateLeaderboard();
                
                // Check if player made it to top 5
                const leaderboard = getLeaderboard();
                const playerName = playerNameDisplay.textContent;
                const playerEntry = leaderboard.find(entry => entry.name === playerName);
                
                if (playerEntry && leaderboard.indexOf(playerEntry) < 5) {
                    highScoreMessageDisplay.innerHTML = `<p>Баяр хүргэе! Та шилдэг 5 тоглогчийн нэгд орлоо!</p>`;
                } else {
                    highScoreMessageDisplay.innerHTML = '';
                }
                
                timeUpScreen.style.display = 'block';
                gameArea.style.display = 'none';
            }
        }

        // Reset the game
        function resetGame() {
            // Reset scores and timer
            score = 0;
            scoreDisplay.textContent = score;
            
            // Hide all screens except game area
            gameOverScreen.style.display = 'none';
            winScreen.style.display = 'none';
            timeUpScreen.style.display = 'none';
            leaderboardScreen.style.display = 'none';
            
            // Show login screen
            loginScreen.style.display = 'block';
            gameArea.style.display = 'none';
            
            // Clear timer
            clearInterval(timerInterval);
        }

        // Update leaderboard with current player's score
        function updateLeaderboard() {
            const playerName = playerNameDisplay.textContent;
            const playerScore = score;
            
            let leaderboard = getLeaderboard();
            
            // Check if player is already in leaderboard
            const existingEntryIndex = leaderboard.findIndex(entry => entry.name === playerName);
            
            if (existingEntryIndex !== -1) {
                // Update score if better than previous
                if (playerScore > leaderboard[existingEntryIndex].score) {
                    leaderboard[existingEntryIndex].score = playerScore;
                }
            } else {
                // Add new entry
                leaderboard.push({ name: playerName, score: playerScore });
            }
            
            // Sort by score (descending)
            leaderboard.sort((a, b) => b.score - a.score);
            
            // Keep only top 10
            leaderboard = leaderboard.slice(0, 10);
            
            // Save to localStorage
            localStorage.setItem('hangmanLeaderboard', JSON.stringify(leaderboard));
        }

        // Get leaderboard data from localStorage
        function getLeaderboard() {
            const leaderboardData = localStorage.getItem('hangmanLeaderboard');
            return leaderboardData ? JSON.parse(leaderboardData) : [];
        }

        // Show leaderboard screen
        function showLeaderboard() {
            // Hide all other screens
            gameOverScreen.style.display = 'none';
            winScreen.style.display = 'none';
            timeUpScreen.style.display = 'none';
            gameArea.style.display = 'none';
            
            // Show leaderboard
            leaderboardScreen.style.display = 'block';
            
            // Populate leaderboard
            populateLeaderboard();
        }

        // Hide leaderboard and return to previous screen
        function hideLeaderboard() {
            leaderboardScreen.style.display = 'none';
            
            // Determine which screen to show
            if (gameActive) {
                gameArea.style.display = 'block';
            } else if (timer <= 0) {
                timeUpScreen.style.display = 'block';
            } else {
                gameArea.style.display = 'block';
            }
        }

        // Populate leaderboard table
        function populateLeaderboard() {
            const leaderboard = getLeaderboard();
            leaderboardBody.innerHTML = '';
            
            if (leaderboard.length === 0) {
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="3">Одоогоор оноо бүртгэгдээгүй байна</td>`;
                leaderboardBody.appendChild(row);
            } else {
                leaderboard.forEach((entry, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${entry.name}</td>
                        <td>${entry.score}</td>
                    `;
                    leaderboardBody.appendChild(row);
                });
            }
        }

        // Cookie functions
        function setCookie(name, value, days) {
            const expires = new Date();
            expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
        }

        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        // Handle keyboard events
        document.addEventListener('keydown', (e) => {
            if (!gameActive) return;
            
            const key = e.key.toUpperCase();
            if (mongolianKeyboardLayout.includes(key)) {
                checkGuess(key);
            } else if (key === ' ') {
                checkGuess('_');
            }
        });

        // Initialize the game
        window.addEventListener('load', init);