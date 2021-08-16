class ReviewsController < ApplicationController

    def index 
        reviews = Review.all 
        render json: reviews.to_json(:include => :comments)
    end

    def update 
        review = Review.find(params)
        if review.update(review_params)
            render json: Review.to_json(:include => :comments)
        else
            render json: {errors: "There was an error"}
        end
    end

    private 

    def review_params
        params.require(:review).permit(:title, :author, :content, :likes)
    end

end
