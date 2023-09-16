import { english } from "./default.js";
let wordLength = 5;
let canAnswer = 6;
let words = english;
let answer = words[Math.floor(Math.random() * words.length)];
let cleared = false;
let board = [];
window.onload = () => {
    drawBoard();
    let enter = document.getElementById("enter");
    let input = document.getElementById("input");
    let load = document.getElementById("load");
    let dict = document.getElementById("words");
    let reset = document.getElementById("reset");
    enter.addEventListener("click", () => {
        if (!cleared && canAnswer > board.length) {
            if (input.value.length == wordLength) {
                board.push(input.value.split(""));
                drawBoard();
            }
            else {
                alert("入力文字数が間違っています");
            }
        }
    });
    load.addEventListener("click", () => {
        words = dict.value.split("\n");
    });
    reset.addEventListener("click", () => {
        resetGame();
    });
};
function drawBoard() {
    let gameboard = document.getElementById("gameboard");
    let boardHTML = "";
    for (let i = 0; i < canAnswer; i++) {
        const letterStatus = checkStatus(answer, board[i]);
        boardHTML += "<tr>";
        for (let c = 0; c < wordLength; c++) {
            if (!board[i]) {
                boardHTML += `<td class="notInputed"></td>`;
            }
            else {
                boardHTML += `<td class="${letterStatus[c]}">${board[i][c]}</td>`;
            }
        }
        boardHTML += "</tr>";
    }
    gameboard.innerHTML = boardHTML;
    if (cleared) {
        alert("クリア！おめでとう！");
    }
    else if (canAnswer <= board.length) {
        alert("ゲームオーバー！！");
    }
}
function checkStatus(ans, input) {
    if (!input) {
        return;
    }
    let remainInput = ans.split("").concat(); //複製
    let statusArr = [];
    input.forEach((c, idx) => {
        if (c == ans[idx]) {
            statusArr.push("correct");
            remainInput.splice(remainInput.indexOf(c), 1);
        }
        else {
            statusArr.push("incorrect");
        }
    });
    input.forEach((c, idx) => {
        if (statusArr[idx] == "incorrect" && ans.includes(c) && remainInput.indexOf(c) > -1) {
            statusArr[idx] = "include";
            remainInput.splice(remainInput.indexOf(c), 1);
        }
    });
    cleared = statusArr.every(e => { return e == "correct"; });
    return statusArr;
}
function resetGame() {
    let leng = document.getElementById("wordleng");
    let times = document.getElementById("times");
    wordLength = Number(leng.value);
    canAnswer = Number(times.value);
    const useDict = words.filter(e => {
        return e.length == wordLength;
    });
    if (useDict.length > 0) {
        answer = useDict[Math.floor(Math.random() * useDict.length)];
        cleared = false;
        drawBoard();
    }
    else {
        alert("使用できる語彙がありません。プレイ不可です。");
        cleared = true;
    }
    board = [];
}
