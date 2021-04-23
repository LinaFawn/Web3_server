function createFavoriteCityElement(parent) {
    let template = document.getElementById("temp")
    let newFav = template.content.cloneNode(true)
    let element = newFav.childNodes[1]
    parent.appendChild(element)

    return element
}

function addToFavorites(name) {
    let url = `/favorites?name=${name}`
    addNewCity((callback, errorCallback) => {
        postDataByUrl(
            url,
            () => {
                loadWeatherDataByName(name, callback, errorCallback)
            },
            error => {
                errorCallback(error)
            }
        )
    })
}

function removeFromFavorites(name, parent, element) {
    let url = `/favorites?name=${name}`
    postDataByUrl(
        url,
        () => {
            if (parent.contains(element)) {
                parent.removeChild(element)
            }
        },
        error => {
            alert(error)
        },
        true
    )
}

function loadFavorites(callback, errorCallback) {
    let url = "/favorites"
    loadDataByUrl(url, callback, errorCallback)
}