module Dishes::QueryInterface

  def self.index
    Dish.all
  end

  def self.show(id)
    Dish.find(id)
  end

end
