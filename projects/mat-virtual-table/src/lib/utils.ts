export const getTextWidth = (txt, font) => {
    const context = document.createElement('canvas').getContext('2d');
    context.font = font;
    return context.measureText(txt).width + 5;
};
