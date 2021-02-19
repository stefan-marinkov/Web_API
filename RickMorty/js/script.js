import {createEl, selectEl} from './create.js'

const wrap = selectEl('.wrap')
const otherPage = selectEl('.oneCharacter')
const prevBtn = selectEl('.prev')
const nextBtn = selectEl('.next')
let count = 1

let baseUrl = "https://rickandmortyapi.com/api/character/?page=" + count

//NEXT PAGE

nextBtn.addEventListener( 'click', () => {
    count < 34 ? count ++ : count
    
    let baseUrl = "https://rickandmortyapi.com/api/character/?page=" + count
    getRandM(baseUrl)
    .then( data => getAllChar(data))
})

//PREV PAGE
prevBtn.addEventListener( 'click', () => {
    count > 0 ? count -- : count
    let baseUrl = "https://rickandmortyapi.com/api/character/?page=" + count
    getRandM(baseUrl)
    .then( data => getAllChar(data))
})

getRandM(baseUrl)
.then( data => getAllChar(data))


async function getRandM(url) {

    const resolve = await fetch( url)
    const data = await resolve.json()
    return data
}

function getAllChar(data) {
    
    wrap.innerHTML = ''

    data.results.forEach( char => {
        const divChar = createEl('div', 'char')
        divChar.innerHTML = `<p>${char.name}</p>
        <img class='charImg' src='${char.image}'>
        <button class='btn'>Info</button>`
        wrap.appendChild(divChar)
        // GET SINGLE CHARACTER
divChar.addEventListener( 'click', () => {
    let singUrl = ("https://rickandmortyapi.com/api/character/" + char.id);

    getSingChar(singUrl)
    .then(data => singleChar(data))
    

    async function getSingChar(url) {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }


    function singleChar(data) {
        
        otherPage.innerHTML = ''
        const characterInfo = createEl('div', 'singCh')
        characterInfo.innerHTML = `
            <img class='sinImg' src='${data.image}'>
            <div class='charInfo'>
                <p>${data.name}</p>
                <p>${data.status}</p>
                <p>${data.species}</p>
                <p>${data.origin.name}</p>
                <p>${data.location.name}</p>
            </div>
            <button class='back'>Back To All Character</button>
        `


        otherPage.appendChild(characterInfo)
        otherPage.classList.toggle('active')
        wrap.style.display = 'none'

        
        const btn = selectEl('.back')
        btn.addEventListener('click', () => {
        wrap.style.display = 'flex'
        characterInfo.style.display = 'none'
})
    
    }
})
})
}