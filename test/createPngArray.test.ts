import { it, expect } from '@jest/globals';

import { createPngArray } from '../js/allCards';

// eslint-disable-next-line @typescript-eslint/no-var-requires
//const assert = require('assert').strict;

it('should create an array of elements', () => {
    //Подготовка
    const expected = Array.length == 6;
    //Действие
    const array = createPngArray(1)== Array(6);
    //Сверка
    expect(expected).toBe(array);
});
