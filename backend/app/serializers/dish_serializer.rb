class DishSerializer
  
  include JSONAPI::Serializer
  
  attributes :name, :description, :category, :price
  
  # attribute :image, &:image_url
  
end
