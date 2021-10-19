class CreateDishes < ActiveRecord::Migration[6.1]
  def change
    create_table :dishes do |t|
      t.string :name
      t.text :description
      t.integer :category
      t.decimal :price
      

      t.index :category

      t.timestamps
    end
  end
end
