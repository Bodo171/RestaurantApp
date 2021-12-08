class ReservationsController < ApplicationController

  skip_authorization_check

  before_action(only: [:index]) { validate_object(Validations::Reservations::ReservationsListings) }
  before_action(only: :create) { validate_object(Validations::Reservations::CreateReservation) }

  before_action :authenticate_user!, except: %i[index create]

  def index
    reservations = Reservations::Finder.new(@validator).all

    render_response(ReservationSerializer.new(reservations).serializable_hash)
  end

  def create
    reservation = Reservations::Creator.new(@validator).run

    unless reservation.save
      render_response({ errors: reservation.errors }, status: :bad_request)
      return
    end

    render_response(ReservationSerializer.new(reservation))
  end
end