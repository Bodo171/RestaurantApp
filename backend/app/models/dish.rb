class Dish < ApplicationRecord
  has_one_attached :image

  enum category: { breakfast: 0, lunch: 1, dinner: 2, dessert: 3, drink: 4 }
  
  def image_url
    Rails.env.production? ? image.url : Rails.application.routes.url_helpers.rails_blob_url(image)
  end
end
