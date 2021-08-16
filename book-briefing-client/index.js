// let titleInput = () => document.getElementById("title")
// let authorInput = () => document.getElementById("author")
// let contentInput = () => document.getElementById("content")
let reviewsContainer = () => document.getElementById("reviews-container")
const clearContainer = (element) => {
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

const startProgram = () => {
    let form = document.getElementById("form")
    form.addEventListener("submit", Review.createReview)
    Review.fetchReviews()
}

document.addEventListener("DOMContentLoaded", startProgram)