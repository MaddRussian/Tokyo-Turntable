class CreateBookings < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      t.references :band, null: false, foreign_key: true
      t.references :gig, null: false, foreign_key: true

      t.timestamps
    end
  end
end
