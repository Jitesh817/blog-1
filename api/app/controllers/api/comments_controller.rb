class Api::CommentsController < ApplicationController
    include Authenticable
    before_action :authenticate_user

    def create
        
    end
end