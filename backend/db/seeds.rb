
admin_user = User.create(email: "admin@restaurant.com", password: "password", password_confirmation: "password", is_admin: true)

manager_user = User.create(email: "manager@restaurant.com", password: "password", password_confirmation: "password")