class Validations::Reservations::ReservationsListings < Validations::BaseValidator

  # We might have some attributes here (for searching)
  ATTR_LIST = %i[ phone_number ]

  attr_accessor *ATTR_LIST

  validate :phone_number_format
  
  def initialize(params)
    params = params.permit(*ATTR_LIST)
    set_parameters(params)
  end

  def phone_number_format
    if self.phone_number.present? #TODO add regex && !self.phone_number.match("") 
      errors.add(:phone_number, 'Phone number format is not valid!')
    end
  end
end