class Api::UsersController < ApplicationController
    
    def index
        render json: 'hello'
    end

    def create
        @user = User.new(user_params)
        if @user.save
            render json: @user, status: 201
        else
            render json: {errors: @user.errors}, status: 400
        end
    end

    def show

    end

    def update

    end

    private
    def user_params
        params.permit(:name, :password, :email)
    end
end