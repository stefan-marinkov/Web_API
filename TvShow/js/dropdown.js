import {allShows, container} from './script.js'
//import {infoPage} from './page.js'

// DROPDOWN MENU
import {listEndPoint} from './script.js'
export const input = document.querySelector('input')
export const ulList = document.querySelector('ul')

export const dropSeries = (e) => {
    
    let li = document.createElement('li')
    li.innerHTML = e.name
    ulList.appendChild(li)


    li.addEventListener( 'click', () => {
        localStorage.setItem("seriesInfo", e.id);
        location.href = "../page.html";
    })

    allShows(e)
}

const dropFilm = (drop) => {
    ulList.innerHTML = ''
    drop.forEach( (e, i) => {
        i < 7 ?
        dropSeries(e.show) :
        false
    })
}

export const search = input.addEventListener( 'keyup', () => {
    fetch(listEndPoint + '/search/shows?q=' + input.value)
    .then( res => res.json())
    .then( data => dropFilm(data))
})

