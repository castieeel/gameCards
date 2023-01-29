function renderPlayingFieldBlock(container) {
    const p = document.createElement('p');
    const level = window.application.difficultyLevel;
    p.textContent = "Уровень игры = " + level;
    container.appendChild(p);
}
window.application.blocks['play-level'] = renderPlayingFieldBlock;

function renderPlayScreen() {
    const divMain = document.createElement('div');
    window.application.renderBlock('play-level', divMain);
    APP.appendChild(divMain);
}
window.application.screens['playing-field'] = renderPlayScreen;