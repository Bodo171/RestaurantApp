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

  resources :dishes
  resources :reservations, only: %i[index create] do
    member do
      patch :confirm
    end
  end
end
