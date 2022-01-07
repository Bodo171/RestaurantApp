class Validations::Reservations::ConfirmReservation < Validations::BaseValidator

  ATTR_LIST = %i[id confirmed]

  attr_accessor(*ATTR_LIST)

  validates_numericality_of :id
  validates_inclusion_of :confirmed, :in => ["true", "false"]
  validate :validate_id

  def initialize(params)
    params = params.permit(*ATTR_LIST)
    set_parameters(params)
  end

  def validate_id
    errors.add(:id, 'Non-existent id.') unless Reservation.exists?(id)
  end

end
