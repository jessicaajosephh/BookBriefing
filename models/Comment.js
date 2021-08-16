class Comment {

    constructor(id, content, likes, review_id){
        this.id = id 
        this.content = content 
        this.likes = likes 
        this.review_id = review_id 
    }

    static renderComments(comments){
        let reviewComments = comments.map(comment => {
            let li = document.createElement("li")
            let div = document.createElement("div")
            let commentContent = document.createElement("p")
            let commentLikes = document.createElement("p")
            let likeButton = document.createElement("button")
            commentContent.innerText = comment.content
            commentLikes.innerText = comment.likes 
            likeButton.innerText = "♥"
            likeButton.addEventListener("click", likeComment.bind(comment))
            div.appendChild(commentContent)
            div.appendChild(commentLikes)
            div.appendChild(likeButton)
            li.appendChild(div)
            return li
        })
        return reviewComments
    }
}