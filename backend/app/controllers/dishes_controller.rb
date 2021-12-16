class DishesController < ApplicationController

  skip_authorization_check

  before_action(only: [:index]) { validate_object(Validations::DishListings) }
  before_action(only: :create) { validate_object(Validations::CreateDish) }
  before_action(only: %i[show destroy]) { validate_object(Validations::ShowDish) }
  before_action(only: :update) { validate_object(Validations::EditDish) }

  before_action :authenticate_user!, except: %i[index show]

  def index
    dishes_by_category = Dishes::Finder.new(@validator).all_per_category

    dishes_data = {}
    dishes_by_category.each do |category, dishes|
      dishes_data[category] = DishSerializer.new(dishes, is_collection: true).serializable_hash
    end

    render_response(dishes_data)
  end

  def create
    dish = Dishes::Creator.new(@validator).run

    unless dish.save
      render_response({ errors: dish.errors }, status: :bad_request)
      return
    end

    render_response(DishSerializer.new(dish))
  end

  def show
    dish = Dishes::Finder.new(@validator).one

    render_response(DishSerializer.new(dish))
  end

  def update
    dish = Dishes::Editor.new(@validator).run

    unless dish.save
      render_response({ errors: dish.errors }, status: :bad_request)
      return
    end

    render_response(DishSerializer.new(dish))
  end

  def destroy
    dish = Dishes::Finder.new(@validator).one

    dish.destroy
    render_response({}, status: :no_content)
  end

end
