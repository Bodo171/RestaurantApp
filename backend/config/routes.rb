Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'users/login',
    sign_out: 'users/logout',
    registration: 'users/register' }, 
    controllers: { 
      sessions: 'users/sessions',
      registrations: 'users/registrations'
     }
end
