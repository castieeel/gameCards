function renderPlayingFieldBlock(container) {
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

    const btnRepeat = document.createElement('button');
    btnRepeat.textContent = 'Начать заново';
    btnRepeat.classList.add('btn-start');

    div_min_sec.appendChild(min);
    div_min_sec.appendChild(sec);
    divTextLeft.appendChild(div_min_sec);
    divTextLeft.appendChild(time);

    divTop.appendChild(divTextLeft);
    divTop.appendChild(btnRepeat);
    container.appendChild(divTop);
    container.appendChild(containerCards);
    //  const level = window.application.difficultyLevel;
}
window.application.blocks['play-level'] = renderPlayingFieldBlock;

function renderPlayScreen() {
    const divMain = document.createElement('div');
    window.application.renderBlock('play-level', divMain);
    APP.appendChild(divMain);
}
window.application.screens['playing-field'] = renderPlayScreen;
