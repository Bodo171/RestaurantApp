class Reservations::Creator

  attr_accessor :attrs, :reservation

  def initialize(reservation_validator)
    self.attrs = reservation_validator
  end

  def run
    parse_data
  end

  private

  def parse_data
    self.reservation = Reservation.new(
      phone_number: attrs.phone_number,
      date: attrs.date,
      table_size: attrs.table_size
    )

    reservation
  end

end

