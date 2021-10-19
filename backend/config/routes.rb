Rails.application.routes.draw do
  root 'pages#home'
  
  devise_for :users, path: '', path_names: {
    sign_in: 'users/login',
    sign_out: 'users/logout',
    registration: 'users/register' }, 
    controllers: { 
      sessions: 'users/sessions',
      registrations: 'users/registrations'
     }

  resources :dishes, only: [ :index ] # To add more (ex: show, create, update, delete)
end
