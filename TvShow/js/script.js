import {search} from './dropdown.js'

export const listEndPoint = 'http://api.tvmaze.com'
export const container = document.querySelector('.container')



// ALL SHOWS

export const allShows = (e) => {


        const about = document.createElement('div')
        about.className = 'about-movie'
        about.innerHTML = `<img src='${e.image.medium}'>
        <p>${e.name}<p/>`
        container.appendChild(about)
        // LOCAL ON CLICK
        about.addEventListener( 'click', () => {
            localStorage.setItem("seriesInfo", e.id);
            location.href = "../page.html";
        })
        
}

const listShows = list => {
    list.forEach( (e, i) => {
        i < 50 ?
        allShows(e) :
        false
    });
}

fetch(listEndPoint + '/shows')
.then( res => res.json())
.then( data => {
    listShows(data)
})