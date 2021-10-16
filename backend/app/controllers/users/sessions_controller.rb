class Users::SessionsController < Devise::SessionsController
  
  skip_before_action :verify_signed_out_user
  
  def respond_with(resource, _opts = {})
    render_response(UserSerializer.new(resource).serializable_hash)
  end

  def respond_to_on_destroy
    head :ok
  end
end
