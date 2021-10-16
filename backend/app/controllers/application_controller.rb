class ApplicationController < ActionController::API

  include ActionController::MimeResponds

  def authenticate_user!
    if user_signed_in?
      super
    else
      render_response('User not authenticated', status: 401)
    end
  end
  
  def render_response(response, status: 200)
    respond_to do |format|
      format.json { render json: response.to_json, status: status }
      format.html { render json: response.to_json, status: status }
    end
  end
  
end
