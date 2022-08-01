'use strict'

//timer vars
const timer = document.querySelector(".timerDisplay");
// var hr = 0;
var min = 0;
var sec = 0;
var milisec = 0
var stoptime = true;

////////////////////////////////////////////

var gNums
var gMaxNum = 16
var gNumsCount = 1

function init() {
    gNums = createNums(gMaxNum)
    renderNums(gNums)
    onButtonClick()
}

function renderNums(nums) {
    var strHTML = '<tr>'
    for (var i = 0; i < gMaxNum; i++) {
        var currNum = nums.pop()
        strHTML += `<td data-i="${currNum}" onkeyup="handleKey(event)" onclick="cellClicked(${currNum}, this, event)">${currNum} </td>`
        if (i === gMaxNum - 1) continue
        if ((i + 1) % Math.sqrt(gMaxNum) === 0) strHTML += `</tr><tr>`
    }
    strHTML += `</tr>`
    var elTbody = document.querySelector('tbody')
    elTbody.innerHTML = strHTML
}

function onButtonClick() {
    document.addEventListener('keyup', function (ev) {
        if (gNumsCount === 1) startTimer()
        console.log('e.key: ', ev.key)
        if (+ev.key === +gNumsCount) {
            console.log('hey')
            var elTd = document.querySelector(`[data-i="${gNumsCount}"]`)
            elTd.style.backgroundColor = 'green'
            gNumsCount++
        }
        if (gNumsCount === gMaxNum + 1) stopTimer()
    })

}

function cellClicked(num, elTd, ev) {
    if (gNumsCount === 1) startTimer()
    if (num === gNumsCount) {
        elTd.style.backgroundColor = 'green'
        gNumsCount++
    }
    if (gNumsCount === gMaxNum + 1) stopTimer()
}

function createNums(length) {
    var nums = []
    for (var i = 0; i < length; i++) {
        nums[i] = i + 1
    }
    var shuffledNums = shuffleNums(nums)
    return shuffledNums
}

//////////////////////////////////////////// utils

function shuffleNums(nums) {
    var shuffledNums = []
    for (var i = 0; i < gMaxNum; i++) {
        var randIdx = getRandomInt(0, nums.length)
        var num = nums[randIdx]
        nums.splice(randIdx, 1)
        shuffledNums[i] = num
    }
    return shuffledNums
}

// Gets a random Integer
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}


//////////////////////////////////////////// Timer
function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
    }
}

function resetTimer() {
    timer.innerText = "00:00:00";
    // hr = 0;
    min = 0;
    sec = 0;
    milisec = 0
    stoptime = true;
}

function timerCycle() {
    if (stoptime == false) {
        milisec = parseInt(milisec)
        sec = parseInt(sec);
        min = parseInt(min);
        // hr = parseInt(hr);

        milisec += 1
        // sec = sec + 1;

        if (milisec == 100) {
            sec = sec + 1;
            milisec = 0;
        }
        if (sec == 60) {
            min = min + 1;
            sec = 0;
            milisec = 0;
        }

        if (milisec < 100 || milisec == 0) {
            milisec = "0" + milisec;
        }

        if (milisec == 0) {
            milisec = "00" + milisec;
        }
        if (sec < 10 || sec == 0) {
            sec = "0" + sec;
        }

        timer.innerHTML = sec + "." + milisc;

        setTimeout(timerCycle(), 10);
    }
}