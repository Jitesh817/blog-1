class Api::PostsController < ApplicationController
    include Authenticable
    before_action :authenticate_user

    def create
        
    end
end