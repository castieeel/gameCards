declare global {
    interface Window {
        application: {
            blocks: {
                [key: string]: (container: HTMLElement) => void;
            };
            screens: {
                [key: string]: () => void;
            };
            difficultyLevel: number;
            renderBlock: (blockName: string, container: HTMLElement) => void;
            renderScreen: (screenName: string) => void;
        };
    }
}
import './appMain';
import '../css/style.css';
import './allCards';
import './first';
import './playingField';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { container } from 'webpack';
