class PagesController < ApplicationController

  skip_authorization_check

  def home
    render_response('Restaurant Backend is Online!')
  end

end
