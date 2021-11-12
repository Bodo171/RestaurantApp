class Validations::CreateDish < Validations::BaseValidator

  ATTR_LIST = %i[name description category price] # image

  attr_accessor(*ATTR_LIST)

  validates :name, :description, :category, :price, presence: true # :image

  def initialize(params)
    params = params.permit(*ATTR_LIST) # require(dishes)
    set_parameters(params)
  end

end
