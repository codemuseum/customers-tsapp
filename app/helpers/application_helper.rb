# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  
  def screenshot_url(url)
    "http://images.websnapr.com/?key=mvjezQ7ceRo3&size=S&url=#{url}"
  end
end
