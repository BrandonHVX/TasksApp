Rails.application.routes.draw do
  devise_for :users
  get 'hello_world', to: 'hello_world#index'
  root 'tasks#index'

  resources :tasks, only: [:index, :create, :destroy, :update] do
    resources :sub_tasks, only: [:index, :create, :destroy, :update], shallow: true
  end

  resource :calendar, only: [:show]
  resource :map, only: [:show]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
