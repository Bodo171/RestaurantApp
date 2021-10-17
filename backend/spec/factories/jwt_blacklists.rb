FactoryBot.define do
  factory :jwt_blacklist do
    jti { "MyString" }
    exp { "2021-10-16 16:32:07" }
  end
end
