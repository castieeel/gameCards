//const APP: HTMLDivElement | null = document.querySelector('.app');
export const APP= document.querySelector('.app') as HTMLElement;
window.application = {
    blocks: {},
    screens: {},
    renderScreen: function (screenName: string) {
        if (window.application.screens[screenName]) {
            APP.innerHTML = '';
            window.application.screens[screenName]();
        } else {
            console.warn(`Экрана ${screenName} не существует`);
        }
    },
    difficultyLevel: 0,
    renderBlock: function (blockName: string, container: HTMLElement) {
        if (window.application.blocks[blockName]) {
            window.application.blocks[blockName](container);
        } else {
            console.warn(`Блока ${blockName} не существует`);
        }
    },
};
