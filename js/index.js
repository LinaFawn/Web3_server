window.onload = function () {
    document.getElementsByClassName("favForm")[0].addEventListener('submit', event => {
        event.preventDefault()
    })
    document.getElementsByClassName("addButton")[0].addEventListener("click", () => {
        let input = document.getElementsByClassName("favInput")[0]
        let cityName = input.value
        let isBlank = cityName.trim() === ""
        if (isBlank) return
        input.value = ""
        addToFavorites(cityName)
    })
    document.getElementsByClassName("headerButton")[0].addEventListener("click", () => {
        loadCurrentCity()
    })
    loadFavorites((favorites) => {
        favorites.forEach(item => {
            addNewCityByName(item.name)
        })
    }, () => {
        alert("Can't load favorites")
    })

    loadCurrentCity()
}

window.addEventListener('offline', () => {
    document.getElementsByClassName("addButton")[0].disabled = true
    document.getElementsByClassName("headerButton")[0].disabled = true
})

window.addEventListener('online', () => {
    document.getElementsByClassName("favButton")[0].disabled = false
    document.getElementsByClassName("headerButton")[0].disabled = false
})