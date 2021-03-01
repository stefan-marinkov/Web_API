import {selectEl, createEl} from './create.js'

const wrap = selectEl('.wrap')
const input = selectEl('input')
const btn = selectEl('.btn')
const header = selectEl('header')
const oneIngredient = selectEl('.oneRecipe')
const baseUrl = 'https://api.edamam.com/search?'

const key = '1d75d1aa1bdf60749bb0d7e4fbce2313'

const apiID = '8724dd8a'

const idAndKeyAndInputValue = `&app_id=${apiID}&app_key=${key}`

btn.addEventListener('click',(e) => {
  e.preventDefault()
    header.classList.toggle('active')
    fetchRecipe()
})

async function fetchRecipe() {

const res = await fetch(baseUrl + idAndKeyAndInputValue + '&to=24' + '&q=' + input.value)
    const data = await res.json()
    getRecipe(data.hits)
}

function getRecipe(data) {
    
    wrap.innerHTML = ''
    data.forEach(e => {
      console.log(e.recipe.ingredientLines)
        const imgDiv = createEl('div', 'imgOfRec')
        imgDiv.innerHTML = `
        <div class="card cardRecipe" style="width: 18rem;">
  <img src="${e.recipe.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Title: ${e.recipe.label}</h5>
    <p class="card-text">${e.recipe.dietLabels.length > 0 ? e.recipe.dietLabels : 'No Data Found'}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Calories: ${e.recipe.calories.toFixed(0)}</li>
    <li class="list-group-item">Health Diet: ${e.recipe.healthLabels} </li>
    <li class="list-group-item">Weight: ${e.recipe.totalWeight.toFixed(0)}</li>
    <li class="list-group-item">Source: ${e.recipe.source}</li>
    //<li class="list-group-item"><a class="btn btn-primary ingredients"   role="button">View Ingredient</a></li>
    <li class="list-group-item"><a class="btn btn-primary" href="${e.recipe.url}" role="button">View Original  Recipe</a></li>
    </ul>
  </div>
</div>
`
        wrap.appendChild(imgDiv)
      //! Make List Of Ingredient!!!
        // const oneIng = selectEl('.ingredients')
        // oneIng.addEventListener( 'click', () => {
        //   e.recipe.ingredientLines.forEach( e => {
        //   oneIngredient.innerHTML = `
        //   <div class="card cardRecipe" style="width: 18rem;">
        //   ${e}
        //   </div>
        //   `
        // })
        // })
    });
}
