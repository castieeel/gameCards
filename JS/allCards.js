export const createPngArray = (level) => {
    const cardsPng = [
        { img: '../static/pic_0.jpg', id: 0 },
        { img: '../static/pic_1.jpg', id: 1 },
        { img: '../static/pic_2.jpg', id: 2 },
        { img: '../static/pic_3.jpg', id: 3 },
        { img: '../static/pic_4.jpg', id: 4 },
        { img: '../static/pic_5.jpg', id: 5 },
        { img: '../static/pic_6.jpg', id: 6 },
        { img: '../static/pic_7.jpg', id: 7 },
        { img: '../static/pic_8.jpg', id: 8 },
        { img: '../static/pic_9.jpg', id: 9 },
        { img: '../static/pic_10.jpg', id: 10 },
        { img: '../static/pic_11.jpg', id: 11 },
        { img: '../static/pic_12.jpg', id: 12 },
        { img: '../static/pic_13.jpg', id: 13 },
        { img: '../static/pic_14.jpg', id: 14 },
        { img: '../static/pic_15.jpg', id: 15 },
        { img: '../static/pic_16.jpg', id: 16 },
        { img: '../static/pic_17.jpg', id: 17 },
        { img: '../static/pic_18.jpg', id: 18 },
        { img: '../static/pic_19.jpg', id: 19 },
        { img: '../static/pic_20.jpg', id: 20 },
        { img: '../static/pic_21.jpg', id: 21 },
        { img: '../static/pic_22.jpg', id: 22 },
        { img: '../static/pic_23.jpg', id: 23 },
        { img: '../static/pic_24.jpg', id: 24 },
        { img: '../static/pic_25.jpg', id: 25 },
        { img: '../static/pic_26.jpg', id: 26 },
        { img: '../static/pic_27.jpg', id: 27 },
        { img: '../static/pic_28.jpg', id: 28 },
        { img: '../static/pic_29.jpg', id: 29 },
        { img: '../static/pic_30.jpg', id: 30 },
        { img: '../static/pic_31.jpg', id: 31 },
        { img: '../static/pic_32.jpg', id: 32 },
        { img: '../static/pic_33.jpg', id: 33 },
        { img: '../static/pic_34.jpg', id: 34 },
        { img: '../static/pic_35.jpg', id: 35 },
    ];

    switch (level) {
        case 1:
            return cardsPng.slice(0, 6);
        case 2:
            return cardsPng.slice(0, 12);
        case 3:
            return cardsPng.slice(0, 18);
        default:
            break;
    }
};

export const duplicateArray = (array) =>
    array.reduce((res, current) => res.concat([current, current]), []);

export const shuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
};
