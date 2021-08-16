class Review {

    static all = []

    constructor(id, title, author, content, likes, comments){
        this.id = id
        this.title = title
        this.author = author
        this.content = content 
        this.likes = likes 
        this.comments = [...comments] 
    }

    static fetchReviews(){
        fetch("http://localhost:3000/reviews")
        .then(resp => resp.json())
        .then(json => {
            Review.renderReviews(json)
        })
    }

    static createReview(e){
        e.preventDefault();
        let title = e.target.children[0].value
        let author = e.target.children[1].value
        let content = e.target.children[2].value 

        let params = {
            review: {
                title: title,
                author: author,
                content: content 
            }
        }

        let configObj = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }
        
        fetch("http://localhost:3000/reviews", configObj)
        .then(resp => resp.json())
        .then(json => {
            e.target.children[0].value = ""
            e.target.children[1].value = ""
            e.target.children[2].value = ""
            Review.renderReviews(json)
        })
    }

    static renderReviews(reviewsInfo){
        clearContainer(reviewsContainer())
        // Review.all = []
        reviewsInfo.forEach(review => {
            // new_review = new Review(review.id, review.title, review.author, review.content, review.likes, review.comments)
            // Review.all.push(new_review)
            let div = document.createElement("div")
            let h3 = document.createElement("h3")
            let h4 = document.createElement("h4")
            let p = document.createElement("p")
            let likeButton = document.createElement("button")
            let ul = document.createElement("ul")
            let rLikes = document.createElement("p")
            let deleteButton = document.createElement("button")

            let reviewComments = review.comments.map(comment => {
                let li = document.createElement("li")
                let div = document.createElement("div")
                let commentContent = document.createElement("p")
                let commentLikes = document.createElement("p")
                let likeButton = document.createElement("button")
                commentContent.innerText = comment.content 
                commentLikes.innerText = comment.likes 
                likeButton.innerText = "♥"
                deleteButton.innerText = "🗑️"
                deleteButton.addEventListener("click", Review.deleteReview.bind(review))
                div.appendChild(commentContent)
                div.appendChild(commentLikes)
                div.appendChild(likeButton)
                li.appendChild(div)
                return li 
            })

            div.id = review.id 
            div.style.padding = "20px"
            div.className = "card"
            h3.innerText = review.title
            h4.innerText = review.author 
            p.innerText = review.content
            rLikes.innerText = review.likes
            likeButton.innerText = "♥"
            likeButton.addEventListener("click", Review.likeReview.bind(review))

            div.appendChild(h3)
            div.appendChild(h4)
            div.appendChild(p)
            div.appendChild(rLikes)
            div.appendChild(likeButton)
            reviewComments.forEach(li => ul.appendChild(li))
            div.appendChild(ul)

            reviewsContainer().appendChild(div)
        })
    }

    static deleteReview(e){
        let configObj = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        }

        fetch("http://localhost:3000", configObj)
        .then(resp => resp.json())
        .then(json => Review.renderReviews(json))
    }

    static likeReview(e){
        this.likes += 1
        let params = {
            review: {
                likes: this.likes
            }
        }

        let configObj = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }

        fetch(`http://localhost:3000/reviews/${this.id}`, configObj)
        .then(resp => resp.json())
        .then(reviewsInfo => Review.renderReviews(reviewsInfo))
    }

}