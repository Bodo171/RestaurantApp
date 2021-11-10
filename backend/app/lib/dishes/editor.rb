class Dishes::Editor

  attr_accessor :attrs, :dish

  def initialize(dish_validator)
    self.attrs = dish_validator
  end

  def run
    parse_data
  end

  private

  def parse_data
    dish = Dishes::QueryInterface.show(attrs.id)

    dish.assign_attributes(
      name: attrs.name || dish.name,
      description: attrs.description || dish.description,
      category: attrs.category || dish.category,
      price: attrs.price || dish.price
    )
    dish.image.attach(attrs.image) if attrs.image.present?

    dish
  end

end

