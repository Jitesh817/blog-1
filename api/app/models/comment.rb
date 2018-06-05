class Comment
    include Mongoid::Document
    include Mongoid::Timestamps::Created

    field :text, type: String

    embeds_many :child_comments, :class_name => 'Comment', :inverse_of => :parent_site
    embedded_in :parent_comment, :class_name => 'Comment', :inverse_of => :child_comments
    belongs_to :user
    belongs_to :post
end