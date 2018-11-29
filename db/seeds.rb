# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user  = User.create!(
          email:    "someguy@fake.edu",
          password: "password"
        )

1_000.times do
  due_date = Faker::Date.between(1.year.ago, 1.year.from_now)
  due_date = nil if [true, false].sample

  description = [
                  Faker::ChuckNorris.fact,
                  Faker::Matz.quote,
                  Faker::RuPaul.quote
                ].sample
  task = user.tasks.create!(
    description:  description,
    due_date:     due_date,
    completed:    [true, false].sample
  )

  rand(5).times do
    task.sub_tasks.create!(
      description:  Faker::SiliconValley.quote,
      completed:    [true, false].sample
    )
  end
end

(1..87).each do |street_num|
  street = "#{street_num}01 Collins Ave"
  user.tasks.create(
    description: "Visit #{street}",
    street: street,
    city: "Miami Beach",
    state: "Florida",
    country: "United States"
  )
  sleep 0.5
end

puts "#{Task.count} tasks!"
puts "#{SubTask.count} sub_tasks!"
