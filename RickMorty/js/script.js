import {createEl, selectEl} from './create.js'

const wrap = selectEl('.wrap')
const otherPage = selectEl('.oneCharacter')
const prevBtn = selectEl('.prev')
const nextBtn = selectEl('.next')
let count = 1

let baseUrl = `https://rickandmortyapi.com/api/character/?page=${count}`


// prevBtn.addEventListener( 'click', () => count-- )
getRandM()
.then( data => getAllChar(data))


async function getRandM() {

    const resolve = await fetch( baseUrl)
    const data = await resolve.json()
    return data
}


function getAllChar(data) {
    console.log(data)
    data.results.forEach( char => {
        const divChar = createEl('div', 'char')
        divChar.innerHTML = `<p>${char.name}</p>
        <img class='charImg' src='${char.image}'>
        <button class='btn'>Info</button>`
        wrap.appendChild(divChar)

        

        // GET SINGLE CHARACTER

divChar.addEventListener( 'click', (e) => {
    e.preventDefault()
            const singleCharacter = "https://rickandmortyapi.com/api/character/" + char.id

    fetch(singleCharacter)
    .then(res => res.json())
    .then(data => singleChar(data))

    function singleChar(data) {
        console.log(data)
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
        

        const btn =selectEl('.back')
        btn.addEventListener('click', () => {
            location.reload()
        })
    }
        })
    })
    nextBtn.addEventListener( 'click', (e) => {
        e.preventDefault()
        fetch(data.info.next)
        .then( res => res.json())
        .then( data => getAllChar(data))
        
    })
}
