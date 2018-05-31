class Post
    include Mongoid::Document
    include Mongoid::Timestamps

    field :text, type: String
    field :image, type: String
    field :verification, type: Boolean, default: nil

    has_one_attached :image, optional: true
    belongs_to :user
    has_many :comments
end