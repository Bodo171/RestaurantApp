class ReservationsController < ApplicationController

  skip_authorization_check

  before_action(only: [:index]) { validate_object(Validations::Reservations::ReservationsListings) }
  before_action(only: :create) { validate_object(Validations::Reservations::CreateReservation) }
  before_action(only: %i[show destroy]) { validate_object(Validations::Reservations::ShowReservation) }
  before_action(only: :confirm) { validate_object(Validations::Reservations::ConfirmReservation) }

  before_action :authenticate_user!, only: :confirm

  def index
    reservations = Reservations::Finder.new(@validator).all

    render_response(ReservationSerializer.new(reservations).serializable_hash)
  end

  def show
    reservation = Reservations::Finder.new(@validator).one

    render_response(ReservationSerializer.new(reservation))
  end

  def create
    reservation = Reservations::Creator.new(@validator).run

    render_response(ReservationSerializer.new(reservation))
  end

  def confirm
    reservation = Reservations::Editor.new(@validator).run

    unless reservation.save
      render_response({ errors: reservation.errors }, status: :bad_request)
      return
    end

    render_response(ReservationSerializer.new(reservation))
  end
end
