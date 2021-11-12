class Dish < ApplicationRecord
  has_one_attached :image

  enum category: { breakfast: 0, lunch: 1, dinner: 2, dessert: 3, drink: 4 }

  validates_uniqueness_of :name, message: 'There is another dish with this name.'
  validates_inclusion_of :category, in: Dish.categories
  validates_numericality_of :price
  validates :image, content_type: { in: %w[image/jpeg image/gif image/png], message: 'sugem'}

  def image_url
    return unless image.attached?
    
    Rails.env.production? ? image.url : Rails.application.routes.url_helpers.rails_blob_url(image)
  end
end
