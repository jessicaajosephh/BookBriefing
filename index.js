// let titleInput = () => document.getElementById("title")
// let authorInput = () => document.getElementById("author")
// let contentInput = () => document.getElementById("content")
let reviewsContainer = document.getElementById("reviews-container")

const startProgram = () => {
    Review.fetchReviews()
}

document.addEventListener("DOMContentLoaded", startProgram)