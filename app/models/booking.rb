class Booking < ApplicationRecord
  belongs_to :band
  belongs_to :gig
end
