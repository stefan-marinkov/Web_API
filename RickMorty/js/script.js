import {createEl, selectEl} from './create.js'

const wrap = selectEl('.wrap')
const otherPage = selectEl('.oneCharacter')
const prevBtn = selectEl('.prev')
const nextBtn = selectEl('.next')
const input = selectEl('input')
const btnInput = selectEl('.btnS')

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

// BASE URL FETCH

getRandM(baseUrl)
.then( data => getAllChar(data))


async function getRandM(url) {

    const resolve = await fetch( url)
    const data = await resolve.json()
    return data
}
// ALL CHARACTER FUNCTION

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
    // GET SINGLE CHARACTER FUNCTION
    
    function singleChar(data) {
        otherPage.innerHTML = ''
        const characterInfo = createEl('div', 'singCh')
        characterInfo.innerHTML = `
            <img class='sinImg' src='${data.image}'>
            <div class='charInfo'>
                <p>Name: ${data.name}</p>
                <p>Status: ${data.status}</p>
                <p>Species: ${data.species}</p>
                <p>Origin: ${data.origin.name}</p>
                <p>Location: ${data.location.name}</p>
            </div>
            <button class='back'>Back To All Character</button>   
        `
        otherPage.classList.toggle('active')
        otherPage.appendChild(characterInfo)
        wrap.style.display = 'none'
        // BACK TO ALL CHARACTER
        const btn = selectEl('.back')
        btn.addEventListener('click', () => {
        wrap.style.display = 'flex'
        characterInfo.style.display = 'none'
        otherPage.classList.toggle('active')
                })
            }
        })
    })
}