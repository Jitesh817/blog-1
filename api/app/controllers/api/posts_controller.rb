class Api::PostsController < ApplicationController
    include Authenticable
    before_action :authenticate_user

    def create
        post = current_user.post.new(post_params)
        if post.save
            render json: post, status: 201
        else
            render json: {errors: post.errors}, status: 400
        end
    end

    def show
        # check if his own post
        post = Post.find(params[:id])
        if post.verification
            # post verified- any one can view
            render json: post, status: 200
        else
            # check if psot owned by current_user
            if post.user_id === current_user.id
                render json: post, status: 200
            else
                render json: {errors: 'Post does not exists'}, status: 404
            end
        end
    end

    private
    def post_params
        params.require(:text).permit(:text, :image)
    end
end