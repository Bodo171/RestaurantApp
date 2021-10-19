module Dishes::QueryInterface

  def self.index
    Dish.all
  end
end
