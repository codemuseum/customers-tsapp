class PageObject < ActiveRecord::Base
  alias_method :original_to_xml, :to_xml
  include ThriveSmartObjectMethods
  self.caching_default = 'interval[60]'
  
  
  serialize :excludes, Array
  
  attr_protected :excludes
  
  def after_initialize 
    if new_record?
      self.header = 'Customers' 
      self.excludes = []
    end
  end

  def piped_excludes=(str)
    self.excludes = str.split('|')
  end
  
  def piped_excludes
    "|#{self.excludes ? self.excludes.join('|') : ''}|"
  end


  # FIXME - this is a workaround - delete me if this is ever included in rails
  # http://rails.lighthouseapp.com/projects/8994/tickets/1055
  alias_method :ts_original_to_xml, :to_xml
  def to_xml
    ts_original_to_xml({:except => :excludes})
  end
end
