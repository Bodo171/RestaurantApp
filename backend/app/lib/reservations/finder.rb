class Reservations::Finder

  attr_accessor :attrs

  def initialize(validator)
    self.attrs = validator
  end

  def all
    reservations =  Reservations::QueryInterface.index
    if self.attrs.phone_number.present?
      reservations = reservations.where(phone_number: self.attrs.phone_number)
    end
    
    reservations
  end

  def one
    Reservations::QueryInterface.show(attrs.id)
  end

end
