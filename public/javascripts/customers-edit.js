var CustomersLists = {
  init: function() {
    var customerEls = $$('div.app-customers-list');
    this.customerLists = new Array();
    customerEls.each(function(customerBox) {
      CustomersLists.customerLists.push(CustomersLists.customerListInstance(customerBox));
    });
  },
  
  customerListInstance: function(customerListEl) {
    var customerList = {
      init: function(customerBox) {
        this.pipedExcludesEl = customerBox.getElementsBySelector('input.piped-excludes')[0];
        var tabsBox = customerBox.getElementsBySelector('.customer-tabs')[0];
        var tabBodies = tabsBox.getElementsBySelector('div.tab');
        this.createTabs(tabsBox);
        
        this.unexcludes = tabBodies[0];
        this.excludes = tabBodies[1];
        var thisRef = this;
        this.unexcludes.getElementsBySelector('.customer').each(function(exc) {thisRef._observeCustomer(exc, false)});
        this.excludes.getElementsBySelector('.customer').each(function(exc) {thisRef._observeCustomer(exc, true)});
      },
      _exclude: function(customer, customerId) {
        customer.remove();
        this.excludes.appendChild(customer);
        if (this.pipedExcludesEl.value == "||") {this.pipedExcludesEl.value = '|'+ customerId + '|'; }
        else {this.pipedExcludesEl.value += customerId + '|'; }
      },
      _unexclude: function(customer, customerId) {
        customer.remove();
        this.unexcludes.appendChild(customer);
        this.pipedExcludesEl.value = this.pipedExcludesEl.value.replace(new RegExp('\\|'+customerId+'\\|'), '|');
        if (this.pipedExcludesEl.value == "|") { this.pipedExcludesEl.value = '||'; }
      },
      _observeCustomer: function(customer, excluded) {
        var remove = customer.getElementsBySelector('.remove')[0];
        var thisRef = this;
        var customerId = parseInt(customer.id.substring('app_customers_list_'.length));
        remove.observe('click', function() { 
          if (excluded) { thisRef._unexclude(customer, customerId); excluded = false; } else { thisRef._exclude(customer, customerId); excluded = true; }
        });
      },
      onTabShown: function(index, changed) {}
    };
    
    Object.extend(customerList, TS.Tabs);
    customerList.init(customerListEl);
    return customerList;
  }
}
CustomersLists.init();