import { createPngArray, duplicateArray, shuffle } from './allCards';
import { APP } from './appMain';
function renderPlayingFieldBlock(container: HTMLElement) {
    const divTop = document.createElement('div');
    divTop.classList.add('top-container');
    const divTextLeft = document.createElement('div');
    const div_min_sec = document.createElement('div');
    div_min_sec.classList.add('min-sec');

    const min = document.createElement('p');
    const sec = document.createElement('p');
    min.textContent = 'min';
    sec.textContent = 'sec';

    const time = document.createElement('p');
    time.classList.add('time');
    time.textContent = '00.00';

    const btnRestart = document.createElement('button');
    btnRestart.textContent = 'Начать заново';
    btnRestart.classList.add('btn-start');

    div_min_sec.append(min, sec);
    divTextLeft.append(div_min_sec, time);
    divTop.append(divTextLeft, btnRestart);

    const level = window.application.difficultyLevel;
    const gameTable = document.createElement('div');
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

    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.remove('flip');
        });
    }, 5000);

    cards.forEach((card: HTMLElement, index: number) =>
        card.addEventListener('click', () => {
            if (clickable == true && !card.classList.contains('successfully')) {
                card.classList.add('flip');
                const idCard = Number(card.children.item(0)?.id);

                //card.firstChild?.id

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
                        alert('Вы победили!');
                    }
                }
            }
        })
    );
}
