class CommentsController < ApplicationController

    def update 
        comment = Comment.find(params[:id])
        if comment.update(comment_params)
            render json: Review.all.to_json(:include => :comments)
        else

        end
    end

    private 

    def comment_params
        params.require(:comment).permit(:content, :likes, :review_id)
    end

end
