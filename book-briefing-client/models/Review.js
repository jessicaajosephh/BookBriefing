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

    save(){
        Review.all.push(this)
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

    static createComment(e){
        e.preventDefault();
        let params = {
            comment: {
                content: e.target.children[0].value,
                review_id: this.id  
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

        fetch(`http://localhost:3000/reviews/${this.id}/comments`, configObj)
        .then(resp => resp.json())
        .then(reviewsInfo => Review.renderReviews(reviewsInfo))
    }

    static renderReviews(reviewsInfo){
        clearContainer(reviewsContainer())
        // Review.all = []
        reviewsInfo.forEach(reviewsInfo => {
            // new_review = new Review(review.id, review.title, review.author, review.content, review.likes, review.comments)
            // Review.all.push(new_review)
            let review = new Review(reviewsInfo.id, reviewsInfo.title, reviewsInfo.author, reviewsInfo.content, reviewsInfo.likes, reviewsInfo.comments)
            review.save()
            let div = document.createElement("div")
            let h3 = document.createElement("h3")
            let h5 = document.createElement("h5")
            let p = document.createElement("p")
            let likeButton = document.createElement("button")
            let ul = document.createElement("ul")
            let rLikes = document.createElement("p")
            let deleteButton = document.createElement("button")
            let form = document.createElement("form")
            let input = document.createElement("input")
            let submitComment = document.createElement("button")

            let reviewComments = Comment.renderComments(review.comments)

            div.id = review.id 
            div.style.padding = "20px"
            div.className = "card"
            div.style.background = "#ecf2b1"
            h3.innerText = review.title
            h5.innerText = review.author 
            p.innerText = review.content
            rLikes.innerText = review.likes
            likeButton.innerText = "♥"
            likeButton.addEventListener("click", Review.likeReview.bind(review))
            deleteButton.innerText = "🗑️"
            deleteButton.addEventListener("click", Review.deleteReview.bind(review))

            input.type = "text"
            input.placeholder = "Type comment here..."
            submitComment.type = "submit"
            submitComment.innerText = "Submit"
            form.addEventListener("submit", Review.createComment.bind(review))
            form.appendChild(input)
            form.appendChild(submitComment)

            div.appendChild(h3)
            div.appendChild(h5)
            div.appendChild(p)
            div.appendChild(rLikes)
            div.appendChild(likeButton)
            div.appendChild(deleteButton)
            reviewComments.forEach(li => ul.appendChild(li))
            div.appendChild(ul)
            div.appendChild(form)

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

        fetch(`http://localhost:3000/reviews/${this.id}`, configObj)
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