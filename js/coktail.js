const loadDrinks = async (search) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
    const res = await fetch(url);
    const data = await res.json();
    displayDrinks(data.drinks);
}
const displayDrinks = drinks => {
    const drinksContainer = document.getElementById('drinks-container');
    drinksContainer.innerHTML = ``;

    drinks.forEach(drink => {
        const drinksDiv = document.createElement('div');
        drinksDiv.classList.add('col');
        drinksDiv.innerHTML = `
                <div class="card h-100" onclick="loadDrinksDetails(${drink.idDrink})">
                    <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${drink.strDrink}</h5>
                        <p class="card-text">${drink.strInstructions.slice(0, 300)}</p>
                    </div>
                    </div>
                    `;
        drinksContainer.appendChild(drinksDiv);
    });
}
const searchDrink = () => {
    const searchData = document.getElementById('search-field');
    const searchText = searchData.value;
    loadDrinks(searchText);
    searchData.value = '';

}
const loadDrinksDetails = (idDrink) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayDrinksDetails(data.drinks[0]))

}
const displayDrinksDetails = drink => {
    const detailContainer = document.getElementById('detail-container')
    detailContainer.innerHTML = ``
    const drinkDiv = document.createElement('div')
    drinkDiv.classList.add('card', 'mb-5')
    drinkDiv.innerHTML = `
    <h2 class="text-center">Drink details</h2>
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${drink.strDrinkThumb}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${drink.strDrink}</h5>
        <p class="card-text">${drink.strInstructions}</p>
        
      </div>
    </div>
  </div>

    `;
    detailContainer.appendChild(drinkDiv);


}



loadDrinks('RUM');