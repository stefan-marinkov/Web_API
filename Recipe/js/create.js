export function createEl(type, className) {
    let el;
    el = document.createElement(type)
    el.className = className;
    return el
}

export function selectEl(type) {
    let el;
    el = document.querySelector(type)
    return el
}