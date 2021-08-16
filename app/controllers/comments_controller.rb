class CommentsController < ApplicationController

    def update 
        comment = Comment.find(params[:id])
        if comment.update()
    end

end
