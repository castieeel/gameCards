import { createPngArray, duplicateArray, shuffle } from './allCards';
import { APP } from './appMain';
import { handleButtonClick } from './first';

const timeMin = document.createElement('p');
const timeSec = document.createElement('p');
const modal = document.createElement('div');
const btnRestart = document.createElement('button');
const btnRestartModal = document.createElement('button');

let secT: number;
let minT: number;
let timerId: NodeJS.Timeout | number;

function renderPlayingFieldBlock(container: HTMLElement) {
    const divTop = document.createElement('div');
    divTop.classList.add('top-container');
    const divTextLeft = document.createElement('div');
    const div_min_sec = document.createElement('div');
    div_min_sec.classList.add('min-sec');

    modal.classList.add('modal');
    modal.style.display = 'none';

    const min = document.createElement('p');
    const sec = document.createElement('p');
    min.textContent = 'min';
    sec.textContent = 'sec';

    const divTimeGame = document.createElement('div');
    divTimeGame.classList.add('time');
    const timePoint = document.createElement('p');
    timePoint.textContent = '.';
    timeMin.textContent = '00';
    timeSec.textContent = '00';
    divTimeGame.append(timeMin, timePoint, timeSec);

    btnRestart.textContent = 'Начать заново';
    btnRestart.classList.add('btn-start');

    div_min_sec.append(min, sec);
    divTextLeft.append(div_min_sec, divTimeGame);
    divTop.append(divTextLeft, btnRestart);

    const gameTable = document.createElement('div');
    const level = window.application.difficultyLevel;
    switch (level) {
        case 1:
            gameTable.classList.add('game-table-6');
            break;
        case 2:
            gameTable.classList.add('game-table-12');
            break;
        case 3:
            gameTable.classList.add('game-table-18');
            break;
    }

    const cardsPngArray = createPngArray(level); //создаю массив
    const duplicatedCardsPng = duplicateArray(cardsPngArray); //дублирую массив
    shuffle(duplicatedCardsPng); //перемешиваю карты

    //создание карты
    duplicatedCardsPng.forEach((jpg) => {
        const card: HTMLDivElement | null = document.createElement('div'); //поле с картами
        card.classList.add('game-card');

        const flippedCardImg: HTMLImageElement = document.createElement('img');
        flippedCardImg.src = jpg.img; //путь к файлу
        flippedCardImg.setAttribute('id', String(jpg.id));
        const notFlippedCardImg = document.createElement('img');
        notFlippedCardImg.src = '../static/pic_36.jpg';

        card.append(flippedCardImg, notFlippedCardImg);
        gameTable.append(card);
    });

    container.append(divTop, gameTable);
    //нажатие на карту
}

window.application.blocks['play-level'] = renderPlayingFieldBlock;

function renderPlayScreen() {
    const divMain = document.createElement('div');
    divMain.append(modal);
    window.application.renderBlock('play-level', divMain);
    if (APP) APP.appendChild(divMain);
    startGame();
}
window.application.screens['playing-field'] = renderPlayScreen;

function startGame() {
    let firstCard: number | undefined;
    let secondCard: number | undefined;
    let clickable = true;
    let firstCardId: number | undefined;
    let secondCardId: number | undefined;

    const cards = document.querySelectorAll<HTMLDivElement>('.game-card');

    cards.forEach((card) => {
        card.classList.add('flip');
    });

    secT = 0;
    minT = 0;
    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.remove('flip');
        });
        addTimer();
    }, 5000);

    cards.forEach((card: HTMLElement, index: number) =>
        card.addEventListener('click', () => {
            if (clickable == true && !card.classList.contains('successfully')) {
                card.classList.add('flip');
                const idCard = Number(card.children.item(0)?.id);

                if (firstCard == null) {
                    firstCard = index;
                    firstCardId = idCard;
                } else {
                    if (index != firstCard) {
                        secondCard = index;
                        secondCardId = idCard;
                    }
                }

                if (firstCardId != null && secondCardId != null) {
                    if (firstCardId == secondCardId) {
                        setTimeout(() => {
                            if (firstCard)
                                cards[firstCard].classList.add('successfully');
                            if (secondCard)
                                cards[secondCard].classList.add('successfully');
                            firstCard = undefined;
                            firstCardId = undefined;
                            secondCard = undefined;
                            secondCardId = undefined;
                            clickable = true;
                        }, 500);
                    } else {
                        setTimeout(() => {
                            if (firstCard === 0) {
                                cards[firstCard].classList.remove('flip');
                            }
                            if (firstCard)
                                cards[firstCard].classList.remove('flip');
                            if (secondCard)
                                cards[secondCard].classList.remove('flip');
                            if (secondCard === 0) {
                                cards[secondCard].classList.remove('flip');
                            }
                            if (firstCard)
                                cards[firstCard].classList.remove(
                                    'successfully'
                                );
                            if (secondCard)
                                cards[secondCard].classList.remove(
                                    'successfully'
                                );
                            firstCard = undefined;
                            firstCardId = undefined;
                            secondCard = undefined;
                            secondCardId = undefined;
                            clickable = true;
                        }, 500);
                    }

                    if (
                        Array.from(cards).every((card) =>
                            card.className.includes('flip')
                        )
                    ) {
                        modalView(true, minT, secT);
                    }
                }
            }
        })
    );
}

function tick() {
    secT++;
    if (secT >= 60) {
        secT = 0;
        minT++;
    }
}

function addTimer() {
    tick();
    timeMin.textContent = String(minT > 9 ? minT : '0' + minT);
    timeSec.textContent = String(secT > 9 ? secT : '0' + secT);

    switch (window.application.difficultyLevel) {
        case 1:
            minT == 1 ? modalView(false, minT, secT) : timer();
            break;
        case 2:
            minT == 2 ? modalView(false, minT, secT) : timer();
            break;
        case 3:
            minT == 3 ? modalView(false, minT, secT) : timer();
            break;
    }
}

function timer() {
    timerId = setTimeout(addTimer, 1000);
}

function modalView(win: boolean, minT: number, secT: number) {
    clearTimeout(timerId);

    const pngResult = document.createElement('img');
    pngResult.classList.add('png-result', 'modal-chld');

    const result = document.createElement('p');
    result.classList.add('text', 'text-del', 'modal-chld');

    const textTime = document.createElement('p');
    textTime.textContent = 'Затраченное время:';
    textTime.classList.add('text-time', 'modal-chld');

    const timeModal = document.createElement('p');
    timeModal.textContent =
        win == true ? String(minT + '.' + secT) : String(minT + '.0' + secT);
    timeModal.classList.add('time-final', 'modal-chld');

    btnRestartModal.classList.add('btn-start', 'modal-chld');
    btnRestartModal.textContent = 'Играть снова';

    modal.append(pngResult, result, textTime, timeModal, btnRestartModal);
    modal.classList.add('modal');
    modal.style.display = 'flex';

    if (win === true) {
        pngResult.src = '../static/win.png';
        result.textContent = 'Вы выиграли!';
    } else {
        pngResult.src = '../static/loser.png';
        result.textContent = 'Вы проиграли!';
    }
}

btnRestart.addEventListener('click', () => {
    clearTimeout(timerId);
    handleButtonClick(window.application.difficultyLevel);
});

btnRestartModal.addEventListener('click', () => {
    document.querySelectorAll('.modal-chld').forEach((e) => e.remove());
    clearTimeout(timerId);
    handleButtonClick(window.application.difficultyLevel);
});
