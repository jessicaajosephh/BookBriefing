class Review {

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
        .then(resp => resp.json)
        .then(json => Review.renderReviews(json))
    }

}