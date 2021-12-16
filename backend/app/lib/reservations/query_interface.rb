module Reservations::QueryInterface

  def self.index
    Reservation.all
  end

  def self.show(id)
    Reservation.find(id)
  end

end
