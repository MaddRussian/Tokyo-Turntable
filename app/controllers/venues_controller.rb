class VenuesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :show]

  def index
    @venues = policy_scope(Venue)
    if params[:query].present?
      @venues = @venues.global_search(params[:query])
    end
  end

  def show
    @venue = Venue.find(params[:id])
    @selected_year = params[:year].to_i.zero? || params[:year].to_i < 2020 ? Date.today.year : params[:year].to_i
    @selected_month = params[:month].to_i.zero? || params[:month].to_i > 12 ? Date.today.month : params[:month].to_i
    months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    @selected_month_text = months[@selected_month - 1]
    @previous_month_text = months[@selected_month - 2]
    @next_month_text = months[@selected_month]

    @gigs = @venue.gigs.select do |gig|
      gig.date.year == @selected_year && gig.date.month == @selected_month
    end

    authorize @venue
  end
end
