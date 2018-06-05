class Api::PostsController < ApplicationController
    include Authenticable
    before_action :authenticate_user


    def index
        posts = Post.where(verification: true).limit(10)
        render json: posts
    end

    def create
        post = current_user.posts.new(post_params)
        if post.save
            render json: post, status: 201
        else
            render json: {errors: post.errors}, status: 400
        end
    end

    def show
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

    def list
        posts = Post.where(user_id: current_user.id).sort(_id: -1).limit(10)
        render json: posts, status: 200
    end

    private
    def post_params
        params.permit(:text, :image)
    end
end