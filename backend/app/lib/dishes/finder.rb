class Dishes::Finder

  attr_accessor :attrs

  def initialize(validator)
    self.attrs = validator
  end
  
  def all_per_category
    Dishes::QueryInterface.index.group_by(&:category)
  end
  
end
