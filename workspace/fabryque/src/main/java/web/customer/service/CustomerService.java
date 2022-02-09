package web.customer.service;

import java.util.List;

import web.core.Core;
import web.customer.entity.Customer;

public interface CustomerService {
	
	public List<Customer> getAllCustomers();
	public Core delete(Core core, Customer customer);

}
