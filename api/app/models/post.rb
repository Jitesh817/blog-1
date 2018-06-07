class Post
  include Mongoid::Document
  include Mongoid::Timestamps

  field :text, type: String
  field :image, type: String
  field :verification, type: Boolean, default: nil
  belongs_to :user
  has_many :comments, as: :commentable

  def verify_post
    if self.text == self.text.upcase
      self.verification = false
    else
      self.verification = true
    end
    self.update_attributes
  end

  handle_asynchronously :verify_post
end