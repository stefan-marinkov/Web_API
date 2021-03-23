import {createEl, selectEl} from './create.js'

const wrap = selectEl('.wrap')
const otherPage = selectEl('.oneCharacter')
const prevBtn = selectEl('.prev')
const nextBtn = selectEl('.next')
const input = selectEl('input')
const pagination = selectEl('.pagination')

let totalPages = 34;
let number = 1;

let baseUrl = "https://rickandmortyapi.com/api/character/?page="


let allData;

input.addEventListener('keyup', () => {
    const newData = allData.filter(res => {
        
        return res.name.toLowerCase().includes(input.value.toLowerCase())
    })
    getAllChar(newData)
})

// BASE URL FETCH FOR ALL CHAR
getRandM(baseUrl)
.then( data => {
    allData = data; 
    getAllChar(data)
})


async function getRandM(url) {

    const resolve = await fetch( url)
    const data = await resolve.json()
    return data.results
}
// ALL CHARACTER FUNCTION

function getAllChar(data) {
    wrap.innerHTML = ''
    data.forEach( char => {
        const divChar = createEl('div', 'char')
        divChar.innerHTML = `<p>${char.name}</p>
        <img class='charImg' src='${char.image}'>
        <button class='btn'>Info</button>`
        wrap.appendChild(divChar)
        //GET SINGLE CHARACTER
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
            <button class='back' onclick="">Back To All Character</button>   
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




// PAGINATION

const onClickButton = button => {
    let currentPage = button.textContent
    createButtons(currentPage)

   
    getRandM(baseUrl + currentPage)
    .then( data => {
        allData = data; 
        getAllChar(data)})
}

const makeButton = (number, currentPage) => {
    let button = document.createElement('li')
    button.textContent = number
    button.classList.add('pug')

    button.addEventListener('click', () => onClickButton(button))
    number == currentPage && button.classList.add('active2')
    pagination.appendChild(button)
    
}

const createButtons = currentPage => {

    pagination.innerHTML = ''

    for( let i = 0; i < 5; i++) {

        if( !currentPage || currentPage <= 3) {
            number = i + 1
        } else if ( currentPage >= totalPages - 2) {
            number = totalPages - 4 + i
        } else {
            number = currentPage -2 + i
            
        }
        makeButton(number, currentPage)
}}
nextBtn.addEventListener('click', () => {
    number = number + 3
    if ( number <= totalPages ) {

        getRandM(baseUrl + number)
        .then( data => {
            allData = data; 
            getAllChar(data)
        })
        
    createButtons(number)
    } else {
        number
    }

})


prevBtn.addEventListener('click', (e) => {
    console.log(e.target, number)
    number = number - 7
    if ( number >= 1 ) {
        getRandM(baseUrl + number)
        .then( data => {
            allData = data; 
            getAllChar(data)
        })
        
    createButtons(number)
    } else {
        number
    }
})


    createButtons();