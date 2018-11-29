class Task < ApplicationRecord
  validates :description, presence: true

  geocoded_by :address

  before_validation :delete_address, if: :use_current_location?
  after_validation :geocode, if: -> { address.present? }

  scope :completed, -> { where(completed: true) }
  scope :incomplete, -> { where(completed: false) }
  scope :search, -> (term) { where("description ilike ?", "%#{term}%") }
  scope :ordered, -> { order(due_date: :asc) }
  scope :between, -> (start_date, end_date) do
    where(
      "due_date is not null and due_date >= ? and due_date <= ?",
      start_date, end_date
    )
  end
  belongs_to :user
  has_many :sub_tasks, dependent: :destroy

  def address
    [street, city, state, country].compact.join(', ')
  end

  def delete_address
    self.street   = nil
    self.city     = nil
    self.state    = nil
    self.country  = nil
  end

  def has_location?
    self.latitude.present? && self.longitude.present?
  end
end
