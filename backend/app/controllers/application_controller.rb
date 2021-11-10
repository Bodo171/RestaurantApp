class ApplicationController < ActionController::API

  include ActionController::MimeResponds 

  rescue_from Exception do |exception|
    case exception
    when CanCan::AccessDenied
      render_response({ errors: 'Unauthorized access' }, status: 401)
    else
      render_response({ errors: exception }, status: 422)
    end
  end

  def authenticate_user!
    if user_signed_in?
      super
    else
      render_response({errors: 'User not authenticated'}, status: 401)
    end
  end
  
  def render_response(response, status: 200)
    respond_to do |format|
      format.json { render json: response.to_json, status: status }
      format.html { render json: response.to_json, status: status }
    end
  end

  def validate_object(validator)
    @validator = validator.new(params)

    return if @validator.valid?

    response = { errors: [] }
    @validator.errors.messages.each do |field, errors_list|
      errors_list.each do |message|
        response[:errors] << {
          source: field,
          details: message
        }
      end
    end
    
    render_response(response, status: 400)
  end
  
end
