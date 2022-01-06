class Validations::Reservations::ShowReservation < Validations::BaseValidator

  ATTR_LIST = %i[id]

  attr_accessor(*ATTR_LIST)

  validates_presence_of :id
  validates_numericality_of :id
  validate :validate_id

  def initialize(params)
    params = params.permit(*ATTR_LIST)
    set_parameters(params)
  end

  def validate_id
    errors.add(:id, 'Non-existent id') unless Reservation.exists?(id)
  end

end

