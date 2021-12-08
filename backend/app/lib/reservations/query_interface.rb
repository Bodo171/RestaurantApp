module Reservations::QueryInterface

  def self.index
    Reservation.all
  end

end