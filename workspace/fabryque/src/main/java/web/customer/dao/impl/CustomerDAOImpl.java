package web.customer.dao.impl;

import java.util.List;

import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import web.customer.dao.CustomerDAO;
import web.customer.entity.Customer;

@Repository
public class CustomerDAOImpl implements CustomerDAO {
	
//	@Autowired
//	private SessionFactory sessionFactory;
	
	@PersistenceContext
	private Session session;
		
	public Session getSession() {
		return session;
	}
	
	@Override
	public List<Customer> getAllCustomers() {
		CriteriaBuilder criteriaBuilder = this.getSession().getCriteriaBuilder();
		CriteriaQuery<Customer> criteriaQuery = criteriaBuilder.createQuery(Customer.class);
		Root<Customer> root = criteriaQuery.from(Customer.class);
		criteriaQuery = criteriaQuery.select(root);
		Query<Customer> query = this.getSession().createQuery(criteriaQuery);
		List<Customer> customers = query.list();
		return customers;
	}

	@Override
	public boolean delete(Customer customer) {
		try {
			this.getSession().remove(customer);	
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
