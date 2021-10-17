class PagesController < ApplicationController

  skip_authorization_check

  def home
    render json: 'Restaurant Backend is Online!'
  end

end
