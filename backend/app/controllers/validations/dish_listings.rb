class Validations::DishListings < Validations::BaseValidator

  # We might have some attributes here (for searching)
  ATTR_LIST = [ ]

  attr_accessor *ATTR_LIST

  def initialize(params)
    params = params.permit(*ATTR_LIST)
    set_parameters(params)
  end

end