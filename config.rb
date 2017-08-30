###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

require 'tzinfo'
Time.zone = 'Asia/Jakarta'
activate :sprockets
activate :directory_indexes
set :relative_links, true 

activate :search do |search|
  # search.resources = ['index.html' 'about/', 'blog/', 'bots/', 'bots-blog/', 'demos/','experience/', 'presentations/', 'projects/', '/writing']
  search.fields = {
    title:   {boost: 100, store: true, required: true},
    content: {boost: 50},
    url:     {index: false, store: true}
  }

  # search_skip = ['Articles Tagged', 'Posts by Tag']

  search.before_index = Proc.new do |to_index, to_store, resource|
    if search_skip.any?{|ss| ss == resource.data.title}
      throw(:skip)
    end
    to_store[:group] = resource.path.split('/').first
  end
end

activate :blog do |blog|
  blog.custom_collections = {
    category: {
      link: '/categories/{category}.html',
      template: '/category.html'
    }
  }
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  blog.permalink = "{category}/{year}/{month}/{day}/{title}.html"
  # Matcher for blog source files
  blog.sources = "{title}-{year}-{month}-{day}.html"
  blog.taglink = "tags/{tag}.html"
  blog.layout = "blog_layout"
  blog.summary_separator = /(READMORE)/
  blog.summary_length = 250
  blog.year_link = "{year}.html"
  blog.month_link = "{year}/{month}.html"
  blog.day_link = "{year}/{month}/{day}.html"
  blog.default_extension = ".md"

  
  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = true
  blog.per_page = 1
  blog.page_link = "page/{num}"
end

# activate :asset_hash do |asset_hash|
#   asset_hash.ignore = [/demos/]
#   asset_hash.exts = %w[ .css .js .png .jpg .eot .svg .ttf .woff .json ]
# end





page "/feed.xml", layout: false
# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
helpers do
  def some_helper
    "Helping"
  end

  # def build_categories
  #   categories = []
  #   blog.articles.each do |article|
  #   category = {category: article.metadata[:page]['category'], category_count: 0}
  #   unless categories.find {|c| c[:category] == category[:category]}
  #   categories.push(category)
  #   end
  #   current_count = categories.find {|c| c[:category] == category[:category]}[:category_count]
  #   categories.find {|c| c[:category] == category[:category]}[:category_count] = current_count += 1
  #   end
  #   return categories
  # end

end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css
  activate :relative_assets
  # Minify Javascript on build
  # activate :minify_javascript
end
