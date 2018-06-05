class Api::CommentsController < ApplicationController
	include Authenticable
	before_action :authenticate_user

	def index
		render json: Comment.all
	end
	def create
		if params[:parent_id]
			parent_comment = Comment.find(params[:parent_id])
		else
			comment = Comment.new(user_id: current_user.id, post_id: params[:id], parent_comment: nil)
		end
		if comment.save
			render json: comment
		else
			render json: comment.errors
		end
	end

	private
	def comment_params
		params.permit(:text)
	end
end