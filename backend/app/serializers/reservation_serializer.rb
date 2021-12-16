class ReservationSerializer
  
  include JSONAPI::Serializer
  
  attributes :phone_number, :table_size, :confirmed, :date

end
