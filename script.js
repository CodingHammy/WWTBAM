const question = document.querySelector('#question');  //what is the question

const A = document.querySelector("#index0");
const B = document.querySelector("#index1");
const C = document.querySelector("#index2");
const D = document.querySelector("#index3");

const audience = document.querySelector('#graph'); //give audience answer 4 or two options
const half = document.querySelector("#half"); // half of the options one wrong one right
const phoneAF = document.querySelector("#random"); // random option


const money = document.querySelector('#money')
const quit = document.querySelector('#quit'); // take the money 

const userName = document.querySelector('#userName');
const takeHomeMoney = document.querySelector('#takeHomeMoney');
const enterUserName = document.querySelector('#enterUserName');
const start = document.querySelector('#start');
const startTab = document.querySelector('#startTab')
const playAgain = document.querySelector('#playAgain');
const loserTab = document.querySelector('#loser');

const loserWrong = document.querySelector('#loserWrong');
const loserRight = document.querySelector('#loserRight');


let overlayOffButtonsEnabled = function () {
    A.disabled = false;
    B.disabled = false;
    C.disabled = false;
    D.disabled = false;
    quit.disabled = false;
    audience.disabled = false;
    half.disabled = false;
    phoneAF.disabled = false;
}
let overlayOnButtonsDisabled = function () {
    A.disabled = true;
    B.disabled = true;
    C.disabled = true;
    D.disabled = true;
    quit.disabled = true;
    audience.disabled = true
    half.disabled = true
    phoneAF.disabled = true
}







overlayOnButtonsDisabled();

let info = [
    {
        question: 'what color is an orange',
        correct: 'Orange',
        incorrect: ['Blue', 'Red', 'green']
    },
    {
        question: 'What country is London in',
        correct: 'England',
        incorrect: ['Germany', 'Zimbarbwe', 'Austria']
    },
    {
        question: 'What animal is on the argintinian rugby Shirt',
        correct: 'Jaguar',
        incorrect: ['Puma', 'Tigar', 'Ceibo']
    },

]

const pounds = ['£0', '£100', '£200', '£300', '£500', '£1,000', '£2,000', '£4,000', '£8,000', '£16,000', '£32,000', '£64,000', '£125,000', '£250,000', '£500,000', '£1 Million',]






//________________________________________________________________________

phoneAF.addEventListener("click", function () {
    let whichButtonIsCorrect = document.querySelectorAll('.questionButtons');
    let sortPercent = probability(20);
    if (sortPercent[0] > sortPercent[1] && sortPercent[0] > sortPercent[2] && sortPercent[0] > sortPercent[3]) {
        for (i of whichButtonIsCorrect) {
            console.log(i.innerText)
            if (i.innerText === currentQuestion.correct) {
                let right = i;
                console.log(`${sortPercent[0]}% ${right.innerText}`);
            }
        }
    } else {
        console.log(`${sortPercent[0]}% ${A.innerText} ${sortPercent[1]}% ${B.innerText} ${sortPercent[2]}% ${C.innerText} ${sortPercent[3]}% ${D.innerText}`)

        //want to post the answer with the highest percentage
    }
})

audience.addEventListener("click", function () {
    let whichButtonIsCorrect = document.querySelectorAll('.questionButtons');
    let sortPercent = probability(20);
    for (i of whichButtonIsCorrect) {
        if (i.innerText === currentQuestion.correct) {
            let right = i;
            console.log(`${sortPercent[0].right}% ${right.innerText}`);
        }
    }
})


half.addEventListener("click", function () {
    console.log("clicked")
    half.style.display = "none";
    let questionButtons = document.querySelectorAll('.questionButtons');
    let firstDelete = currentQuestion.incorrect.splice(Math.floor(Math.random() * 3), 1);
    for (wB of questionButtons) {
        if (firstDelete[0] === wB.innerText) {
            wB.innerText = ""
            wB.disabled = true;
        }
    }
    let secondDelete = currentQuestion.incorrect.splice(Math.floor(Math.random() * 2), 1)
    for (wB of questionButtons) {
        if (secondDelete[0] === wB.innerText) {
            wB.innerText = ""
            wB.disabled = true;
        }
    }
})

const onClickFunction = function () {
    let whichButtonIsCorrect = document.querySelectorAll('.questionButtons');
    for (i of whichButtonIsCorrect) {
        if (i.innerText === currentQuestion.correct) {
            let changeBack = i;
            async function flicker() {
                await colorFlicker(changeBack, 'rgba(75, 223, 46, 0.8)', 1000,)
                await colorFlicker(changeBack, 'rgba(238, 237, 237, 0.2)', 200,)
                await colorFlicker(changeBack, 'rgba(75, 223, 46, 0.8)', 200,)
                await colorFlicker(changeBack, 'rgba(238, 237, 237, 0.2)', 200,)
                await colorFlicker(changeBack, 'rgba(75, 223, 46, 0.8)', 200,)
                await colorFlicker(changeBack, 'rgba(238, 237, 237, 0.2)', 200,)
            }
            flicker();
        }
    }
    if (this.innerText == currentQuestion.correct) {
        score++;
        money.innerText = `${pounds[score]} Question! `;
        if (score === 16) {
            alert("winner");
        }
        overlayOnButtonsDisabled();
        setTimeout(function () {
            return questionPicker();
        }, 2400);
    } else {
        overlayOnButtonsDisabled();
        setTimeout(function () {
            if (score < 5) {
                takeHomeMoney.innerText = pounds[0];
            } else if (score < 10) {
                takeHomeMoney.innerText = pounds[5];
            } else {
                takeHomeMoney.innerText = pounds[10];
            }
            score = 1;
            money.innerText = `${pounds[score]} Question! `;
            loserTab.style.display = 'block';
            loserWrong.style.display = 'inline';
            loserRight.style.display = 'none';

        }, 2400);

    }
};


quit.addEventListener("click", function (e) {
    takeHomeMoney.innerText = `${pounds[score - 1]}`
    loserTab.style.display = 'block';
    loserWrong.style.display = 'none';
    loserRight.style.display = 'inline';
    score = 1;
    money.innerText = `${pounds[score]} Question!`;
})


//Start and Tab overview
//__________________________

start.addEventListener("click", function (e) {
    e.preventDefault;
    if (enterUserName.value !== '') {
        userName.innerText = enterUserName.value.toUpperCase();
        startTab.style.display = "none";
        questionPicker();
        overlayOffButtonsEnabled();
    } else {
        enterUserName.placeholder = "ENTER A NAME!"
    }
})

playAgain.addEventListener("click", function () {
    score = 1;
    questionPicker();
    loserTab.style.display = "none";
    overlayOffButtonsEnabled();
    half.style.display = "inline";
    audience.style.display = "inline";
    phoneAF.style.display = "inline";
})


// picks the question and where the answers will be put
//___________________________________________________

let score = 1;
money.innerText = `${pounds[score]} Question! `;
let currentQuestion;

const questionPicker = function () {
    overlayOffButtonsEnabled();
    let q = Math.floor(Math.random() * info.length); //selects which question
    question.innerText = info[q].question; // changes question text
    let box = [];
    let options = [info[q].correct, info[q].incorrect[0], info[q].incorrect[1], info[q].
        incorrect[2]];
    currentQuestion = info[q];
    for (let i = 0; i < 4; i++) {
        box.push(options.splice(Math.floor(Math.random() * options.length), 1))
    }
    A.innerText = box[0];
    B.innerText = box[1];
    C.innerText = box[2];
    D.innerText = box[3];

    let boxInner = [A.innerText, B.innerText, C.innerText, D.innerText];
    for (let i = 0; i < 4; i++) {
        let answer = boxInner.pop();  //answer = thing popped from box
        if (answer === info[q].correct) {  // once the thing popped is the same as the correct answer it stops
            let btns = document.querySelectorAll('.questionButtons');
            for (i of btns) {
                i.addEventListener("click", onClickFunction)
            }
        }
    }
}

// hover function
//_______________________________

let hover = function (whichBtn) {
    whichBtn.addEventListener("mouseover", function (e) {
        e.target.style.backgroundColor = "rgba(238, 237, 237, 1)";
    })
    whichBtn.addEventListener("mouseout", function (e) {
        e.target.style.backgroundColor = "rgba(238, 237, 237, 0.2)";
    })
}
let allHoverButtons = document.querySelectorAll("button");
for (i of allHoverButtons) {
    hover(i);
}


// correct answer lights up green
//_________________________

let colorFlicker = (i, color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            i.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}



let probability = function (n) {
    let storage = []
    while (storage.length !== n) {
        storage.push(Math.floor(Math.random() * 9) + 1);
        i++
    }
    let right = 0;
    for (let i = 0; i < storage.length; i++) {
        if (storage[i] === 7 || storage[i] === 5 || storage[i] === 6) right++;
    }
    let wrong = 0;
    for (let i = 0; i < storage.length; i++) {
        if (storage[i] === 3 || storage[i] === 4) wrong++;
    }
    let wrong1 = 0;
    for (let i = 0; i < storage.length; i++) {
        if (storage[i] === 1 || storage[i] === 2) wrong1++;
    }
    let wrong2 = 0;
    for (let i = 0; i < storage.length; i++) {
        if (storage[i] === 8 || storage[i] === 9) wrong2++;
    }
    return [`${Math.floor((right / n) * 100)}`, `${Math.floor((wrong / n) * 100)}`, `${Math.floor((wrong1 / n) * 100)}`, `${Math.floor((wrong2 / n) * 100)}`];
}


// ask audience
//first 5
// probibility(20)
// 2nd
// probibility(20)
// last 5
// probibility(4)
// last 2
// probibility(2)


// const colorFlicker = (i, newColor, delay, doNext) => {
//     setTimeout(() => {
//         i.style.backgroundColor = newColor;
//         doNext && doNext();
//     }, delay)
// };


// async function rainbow() {
//     await delayedColorChange(changeBack, 'rgba(75, 223, 46, 0.8)', 1000,)
//     await delayedColorChange(changeBack, 'rgba(238, 237, 237, 0.2)', 200,)
//     await delayedColorChange(changeBack, 'rgba(75, 223, 46, 0.8)', 200,)
//     await delayedColorChange(changeBack, 'rgba(238, 237, 237, 0.2)', 200,)
//     await delayedColorChange(changeBack, 'rgba(75, 223, 46, 0.8)', 200,)
//     await delayedColorChange(changeBack, 'rgba(238, 237, 237, 0.2)', 200,)
// }





// const questionPicker = function () {
//     let q = Math.floor(Math.random() * info.length); //selects which question
//     question.innerText = info[q].question; // changes question text
//     let box = [];
//     let options = [info[q].correct, info[q].incorrect[0], info[q].incorrect[1], info[q].incorrect[2]];
//     for (let i = 0; i < 4; i++) {
//         box.push(options.splice(Math.floor(Math.random() * options.length), 1))
//     }
//     A.innerText = box[0];
//     B.innerText = box[1];
//     C.innerText = box[2];
//     D.innerText = box[3];

//     A.addEventListener("click", function () {
//         if (A.innerText == info[q].correct) {
//             return questionPicker();
//         } else {
//             console.log(`you answer wrong a ${this.innerText}`);
//         }
//     })
//     B.addEventListener("click", function () {
//         if (B.innerText == info[q].correct) {
//             return questionPicker();
//         } else {
//             console.log(`you answer wrong b ${this.innerText}`);
//         }
//     })
//     C.addEventListener("click", function () {
//         if (C.innerText == info[q].correct) {
//             return questionPicker();
//         } else {
//             console.log(`you answer wrong c ${this.innerText}`);
//         }
//     })
//     D.addEventListener("click", function () {
//         if (D.innerText == info[q].correct) {
//             return questionPicker();
//         } else {
//             console.log(`you answer wrong d ${this.innerText}`);
//         }
//     })
//     console.log(A.innerText)
//     console.log(B.innerText)
//     console.log(C.innerText)
//     console.log(D.innerText)
//     console.log("DONE")

// }


// questionPicker()

//             A.addEventListener("click", function () {
//                 if (boxInner.length === 0) {
//                     questionPicker();
//                 } else {
//                     console.log("no");
//                 }
//             })
//             if (boxInner.length === 0) { // how many left in the boxInner determines what the answer is
//                 let letterListner = [A, B, C, D];
//                 let correct = letterListner.slice(boxInner.length, 1);
//                 console.log(correct)
//                 // .addEventListener("click", function () {
//                 //     console.log('no');
//                 // })



//                 // B.addEventListener("click", function () {
//                 //     console.log("no");
//                 // })
//                 // C.addEventListener("click", function () {
//                 //     console.log("no");
//                 // })
//                 // D.addEventListener("click", function () {
//                 //     console.log("no");
//                 // })
//                 // return A.addEventListener("click", function () {
//                 //     questionPicker();
//                 // });
//             } else if (boxInner.length === 1) {
//                 return B.addEventListener("click", function () {
//                     questionPicker();
//                 });
//             } else if (boxInner.length === 2) {
//                 return C.addEventListener("click", function () {
//                     questionPicker();
//                 });
//             } else {
//                 return D.addEventListener("click", function () {
//                     questionPicker();
//                 });
//             }
//         }
//     }
// }








// let picker = questionPicker();
// picker.addEventListener("click", function () {
//     console.log("correct");
//     questionPicker();
// })





// let q = questionPicker(); // q is info[q]

// const answerRandomizer = function () {
//     // let box = [];
//     // let options = [info[q].correct, info[q].incorrect[0], info[q].incorrect[1], info[q].incorrect[2]];
//     // for (let i = 0; i < 4; i++) {
//     //     box.push(options.splice(Math.floor(Math.random() * options.length), 1))
//     // }
//     // A.innerText = box[0];
//     // B.innerText = box[1];
//     // C.innerText = box[2];
//     // D.innerText = box[3];
// }
// let ArrayAnswers = answerRandomizer()



//     const letterPicker = function () {

//     }
// }









