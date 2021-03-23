import {search} from './dropdown.js'
import {createEl} from './createEl.js'

// SECOND PAGE 
export const infoPage = document.querySelector('.infoWrapper')
console.log(infoPage)
const idSeries = localStorage.getItem('seriesInfo')
const span = document.querySelector('span')

// MAKING ELEMENTS

const newDiv =  createEl("div", "infoFilm")
const title = createEl("h2", "title btn");
const divHolder = createEl("div", "divHolder flex-md-row");
const image = createEl("img", "mb-2");
const divSeasons = createEl("div", "divSeasons");
const seasons = createEl("div", "seasons");
const cast = createEl("div", "cast");
const details = createEl("p", "details my-3");
const numbSeason = createEl("h2");
const numbCast = createEl("h2");
const numbDetails = createEl("h2", "det");

const allElements = () => {
infoPage.appendChild(newDiv);
newDiv.appendChild(title)
newDiv.appendChild(divHolder)
divHolder.appendChild(image)
divHolder.appendChild(divSeasons)
divSeasons.appendChild(numbSeason)
divSeasons.appendChild(seasons)
divSeasons.appendChild(numbCast)
divSeasons.appendChild(cast)
newDiv.appendChild(numbDetails);
newDiv.appendChild(details)
}
allElements()

// FUNCTION

const getImg = (e) => {
    title.textContent = `${e.name}`
    image.setAttribute('src', e.image.original)

    numbDetails.textContent = 'Show Details'
    details.innerHTML = e.summary
}


const getSeasons = (e) => {
        numbSeason.textContent = `Seasons (${e.length})`
        e.forEach( e => {
            const date = createEl('p')
            date.textContent =  e.premiereDate + ' - ' + e.endDate
            seasons.appendChild(date)
        });
    
}

const getCast = (e) => {
        numbCast.textContent = 'Cast'
        e.forEach( (e, i) => {
            const person = createEl('p')
            i < 5 ?
            person.textContent = `${e.person.name} - ${e.character.name}`
            :
            false
            cast.appendChild(person)
        });
}

function urlFetch(url, func) {
    fetch( url )
    .then( res => res.json())
    .then( data => func(data))
}

urlFetch('http://api.tvmaze.com/shows/' + idSeries , getImg)

urlFetch('http://api.tvmaze.com/shows/' + idSeries +'/seasons', getSeasons)

urlFetch('http://api.tvmaze.com/shows/' + idSeries +'/cast', getCast)

// BACK TO HOME PAGE

span.addEventListener('click', () => location.href = '../index.html')