class Reservations::Editor

  attr_accessor :attrs, :reservation

  def initialize(reservation_validator)
    self.attrs = reservation_validator
  end

  def run
    parse_data
  end

  private

  def parse_data
    reservation = Reservations::QueryInterface.show(attrs.id)

    reservation.assign_attributes(
      confirmed: attrs.confirmed || reservation.confirmed
    )
    reservation
  end

end
