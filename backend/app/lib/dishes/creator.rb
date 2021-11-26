class Dishes::Creator

  attr_accessor :attrs, :dish

  def initialize(dish_validator)
    self.attrs = dish_validator
  end

  def run
    parse_data
  end

  private

  def parse_data
    self.dish = Dish.new(
      name: attrs.name,
      description: attrs.description,
      category: attrs.category,
      price: attrs.price
    )

    dish.image.attach(attrs.image)

    dish
  end

end

