class Validations::EditDish < Validations::BaseValidator

  ATTR_LIST = %i[id name description category price image]

  attr_accessor(*ATTR_LIST)

  validates_numericality_of :id
  validate :validate_id

  def initialize(params)
    params = params.permit(*ATTR_LIST) # require(dishes)
    set_parameters(params)
  end

  def validate_id
    errors.add(:id, 'Non-existent id.') unless Dish.exists?(id)
  end

end
