class Validations::Reservations::CreateReservation < Validations::BaseValidator

  ATTR_LIST = %i[phone_number table_size date ]

  attr_accessor(*ATTR_LIST)

  validates :phone_number, :table_size, :date, presence: true

  def initialize(params)
    params = params.permit(*ATTR_LIST)
    set_parameters(params)
  end

end