package web.customer.dao;

import java.util.List;

import web.customer.entity.Customer;

public interface CustomerDAO {
	
	public List<Customer> getAllCustomers();
	public boolean delete(Customer customer);

}
