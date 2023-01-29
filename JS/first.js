function renderFirstScreenBlock(container) {
    const title = document.createElement('p');
    title.textContent = 'Выбери сложность';
    title.classList.add('text');

    const btnOne = document.createElement('button');
    btnOne.textContent = 1;
    btnOne.classList.add('box');
    btnOne.addEventListener('click', () => {
        handleButtonClick(1);
    });

    const btnTwo = document.createElement('button');
    btnTwo.textContent = 2;
    btnTwo.classList.add('box');
    btnTwo.addEventListener('click', () => {
        handleButtonClick(2);
    });

    const btnThree = document.createElement('button');
    btnThree.textContent = 3;
    btnThree.classList.add('box');
    btnThree.addEventListener('click', () => {
        handleButtonClick(3);
    });

    const btnStart = document.createElement('button');
    btnStart.textContent = 'Старт';
    btnStart.classList.add('btn-start');

    const divContainer = document.createElement('div');
    divContainer.classList.add('container');
    container.appendChild(divContainer);
    divContainer.appendChild(title);
    const divNum = document.createElement('div');
    divNum.classList.add('box-num');
    divNum.appendChild(btnOne);
    divNum.appendChild(btnTwo);
    divNum.appendChild(btnThree);
    divContainer.appendChild(divNum);
    divContainer.appendChild(btnStart);
}
window.application.blocks['level-list'] = renderFirstScreenBlock;



function renderFirstScreen() {
    const divMain = document.createElement('div');
    divMain.classList.add('main');
    window.application.renderBlock('level-list', divMain);
    APP.appendChild(divMain);
}
window.application.screens['first'] = renderFirstScreen;
window.application.renderScreen('first');



function handleButtonClick(level) {
    const levelGame = level;
    window.application.difficultyLevel = levelGame;
    window.application.renderScreen('playing-field');
}