class Post
    include Mongoid::Document
    include Mongoid::Timestamps

    field :text, type: String
    field :image, type: String
    field :verification, type: Boolean

    belongs_to :user
    has_many :comments
end