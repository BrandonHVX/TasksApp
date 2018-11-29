class AddUseCurrentLocationToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :use_current_location, :boolean, null: false, default: false
  end
end
