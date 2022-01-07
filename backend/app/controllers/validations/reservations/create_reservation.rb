class Validations::Reservations::CreateReservation < Validations::BaseValidator

  ATTR_LIST = %i[phone_number table_size date]

  attr_accessor(*ATTR_LIST)

  validates :phone_number, :table_size, :date, presence: true
  validate :phone_number_format, :table_size_format, :date_format

  def initialize(params)
    params = params.permit(*ATTR_LIST)
    set_parameters(params)
  end

  def phone_number_format
    if !self.phone_number.match?("^[0-9]{10}$") 
      errors.add(:phone_number, 'Phone number format is not valid!')
    end
  end

  def table_size_format
    if !(self.table_size.to_i.to_s == self.table_size && self.table_size.to_i > 0)
      errors.add(:table_size, 'Table size must be a positive integer!')
    end
  end

  def date_format
    date = DateTime.parse self.date rescue nil
    if !date
      errors.add(:date, 'Date format is invalid!')
    end
  end

end
