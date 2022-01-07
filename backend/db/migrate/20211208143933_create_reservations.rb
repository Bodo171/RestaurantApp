class CreateReservations < ActiveRecord::Migration[6.1]
  def change
    create_table :reservations do |t|
      t.string :phone_number
      t.integer :table_size
      t.boolean :confirmed
      t.datetime :date
      
      t.timestamps
    end
  end
end
