class DishesController < ApplicationController

  skip_authorization_check only: [:index]
  
  before_action(only: [:index]) { validate_object(Validations::DishListings) }

  def index
    dishes_by_category = Dishes::Finder.new(@validator).all_per_category

    dishes_data = {}
    dishes_by_category.each do |category, dishes|
      dishes_data[category] = DishSerializer.new(dishes, is_collection: true).serializable_hash
    end

    render_response(dishes_data)
  end

end
