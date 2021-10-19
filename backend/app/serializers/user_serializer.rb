class UserSerializer
  
  include JSONAPI::Serializer
  
  attributes :email

  attribute :admin, &:is_admin?
end
