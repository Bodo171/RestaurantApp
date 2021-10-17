class Users::RegistrationsController < Devise::RegistrationsController

  before_action :authenticate_user!, only: [:create]
  
  def respond_with(resource, _opts = {})
    authorize! :create, User
    render_response(UserSerializer.new(resource).serializable_hash)
  end
end
