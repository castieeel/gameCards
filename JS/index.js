const APP = document.querySelector('.app');

window.application = {
    blocks: {},
    screens: {},
    timers: [],
    difficultyLevel: Number,
    renderScreen: function (screenName) {
        if (window.application.screens[screenName]) {
            APP.innerHTML = '';
            window.application.screens[screenName]();
        } else {
            console.warn(`Экрана ${screenName} не существует`);
        }
    },
    renderBlock: function (blockName, container) {
        if (window.application.blocks[blockName]) {
            window.application.blocks[blockName](container);
        } else {
            console.warn(`Блока ${blockName} не существует`);
        }
    }
}