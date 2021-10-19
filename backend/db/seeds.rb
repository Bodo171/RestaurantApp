# Admin User
User.create(email: "admin@restaurant.com", password: "password", password_confirmation: "password", is_admin: true)

# Manager User
User.create(email: "manager@restaurant.com", password: "password", password_confirmation: "password")

# Dishes
Dish.create(category: "breakfast", name: "Omleta cu banane", description: "O omleta in care se pun 2 banane prajite", price: 7.5)
Dish.create(category: "breakfast", name: "Castraveti murati", description: "De douazeci de ani", price: 10.0)
Dish.create(category: "breakfast", name: "Tuica din Mihaiesti", description: "E 7 lei vrei sa gusti?", price: 7.0)
Dish.create(category: "breakfast", name: "Omleta cu banane doi", description: "O omleta in care se pun 2 banane prajite", price: 9.75)

Dish.create(category: "lunch", name: "Pulpe de broasca", description: "200g puple de broasca pe vatra", price: 17.0)
Dish.create(category: "lunch", name: "Hrean caramelizat", description: "Hrean cu caramel sarat", price: 14.25)

Dish.create(category: "dinner", name: "Gandaci din Vatra Dornei", description: "50g gandaci deosebiti culesi de experti", price: 35.0)
Dish.create(category: "dinner", name: "Piure din parizer cu lapte", description: "150g parizer cu 300ml lapte si 35g sare in blender", price: 8.50)
Dish.create(category: "dinner", name: "Corn cu ciocolata", description: "Exact", price: 3.0)

Dish.all.each do |dish|
  dish.image.attach(io: File.open("#{Rails.root}/default_dish.jpeg"), filename: 'default_dish.jpeg', content_type: 'image/jpeg')
end
