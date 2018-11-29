class AddDefaultToSubTaskBoolean < ActiveRecord::Migration[5.2]

  def up
    change_column :sub_tasks, :completed, :boolean, null: false, default: false
    change_column :sub_tasks, :description, :string, null: false
  end

  def down
    change_column :sub_tasks, :completed, :boolean, null: true, default: nil
    change_column :sub_tasks, :description, :string, null: true
  end

end
