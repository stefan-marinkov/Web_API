
export const createEl = (type, className) => {
    var el 
    el = document.createElement(type)
    el.className = className;
    return el;
}