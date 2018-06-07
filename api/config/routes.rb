Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json} do
    post '/login' => 'sessions#create'
    delete '/logout' => 'sessions#destroy'
    post '/posts/:post_id/comments' => 'comments#create'
    post '/posts/:post_id/comments/:comment_id' => 'comments#create'
    get '/posts/:id/comments' => 'comments#index'
    get '/comments' => 'comments#index'
    get '/user' => 'users#logged_in_user'

    get 'posts/list' => 'posts#list'
    resources :users, :posts
  end

end
