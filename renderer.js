const STUDY_DURATION = 25 * 60

let isRunning = false
let isStudySession = true
let interval = null
let remainingSeconds = STUDY_DURATION
let totalSeconds = STUDY_DURATION
let currentSession = 1
const TOTAL_SESSION = 4

const timerDisplay = document.getElementById("timerDisplay")
const sessionLabel = document.getElementById("sessionLabel")
const quoteText = document.getElementById("quoteText")
const btnStartPause = document.getElementById("btnStartPause")
const btnReset = document.getElementById("btnReset")
const inputFocus = document.getElementById("inputFocus")
const inputShort = document.getElementById("inputShort")
const inputLong = document.getElementById("inputLong")

const quotes = {
    study: ['take a breath,<br>you are right on time ☺','stay focused,<br>you got this! 💪', 'one step at a time ✨'],
    break: ['you deserve this break 🍵', 'rest well, come back strong!', 'breathe in, breathe out 🌿']
}

function getFocusDuration() {
    return parseInt(inputFocus.value) * 60
}

function getShortBreak() {
    return parseInt(inputShort.value) * 60
}

function getLongBreak() {
    return parseInt(inputLong.value) * 60
}

function formatTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0')
    const sec = (s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
}

function randomQuote(type) {
    const list = quotes(type)
    return list[Math.floor(Math.random() * list.length)]
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingSeconds)
}

function switchSession() {
    if(isStudySession) {
        isStudySession = false
        const isLongBreak = currentSession % TOTAL_SESSION === 0
        totalSeconds = isLongBreak ? getLongBreak(): getShortBreak()
        sessionLabel.textContent = isLongBreak ? 'Long Break' : 'Short Break'
        quoteText.innerHTML = randomQuote('break')
    } else {
        isStudySession = true
        currentSession++
        totalSeconds = getFocusDuration()
        sessionLabel.textContent = 'Focus Time'
        quoteText.innerHTML = randomQuote('study')
    }
    remainingSeconds = totalSeconds
    updateDisplay()
}

function tick() {
    if(remainingSeconds <= 0) {
        clearInterval(interval)
        isRunning = false
        btnStartPause.textContent = 'Start'
        switchSession()
        return
    } 
    remainingSeconds--
    updateDisplay()
}

btnStartPause.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval)
        isRunning = false
        btnStartPause.textContent = 'Start'
    } else {
        interval = setInterval(tick, 1000)
        isRunning = true
        btnStartPause.textContent = 'Pause'
    }
})

btnReset.addEventListener('click', () => {
    clearInterval(interval)
    isRunning = false
    isStudySession = true
    currentSession = 1
    totalSeconds = getFocusDuration()
    remainingSeconds = totalSeconds
    sessionLabel.textContent = 'Focus Time'
    quoteText.innerHTML = randomQuote('study')
    btnStartPause.textContent = 'Start'
    updateDisplay()
})

totalSeconds = getFocusDuration()
remainingSeconds = totalSeconds
quoteText.innerHTML = randomQuote ('study')
updateDisplay()