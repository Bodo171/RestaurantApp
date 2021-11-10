# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    can :create, User if user.admin?
    can %i[create update destroy], Dish if user.admin? # manager?
  end
end
