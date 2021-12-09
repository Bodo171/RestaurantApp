class Reservations::Creator

  attr_accessor :attrs

  def initialize(reservation_validator)
    self.attrs = reservation_validator
  end

  def run
    Reservation.new(parse_data)
  end

  private

  def parse_data
    {
      phone_number: attrs.phone_number,
      date: attrs.date,
      table_size: attrs.table_size
    }
  end

end

