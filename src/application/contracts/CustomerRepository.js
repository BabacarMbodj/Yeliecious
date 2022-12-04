module.exports = class CustomerRepository {
    constructor() { }


    getAllCustomers() {
        return Promise.reject(new Error('not implemented'));
    }

    addCustomer(name, phone, email) {
        return Promise.reject(new Error('not implemented'));
    }

    getCustomerByPhone(phone) {
        return Promise.reject(new Error('not implemented'));
    }

    getCustomer(id) {
        return Promise.reject(new Error('not implemented'));
    }

    updateCustomer(id, newCustomer) {
        return Promise.reject(new Error('not implemented'));
    }

    deleteCustomer(id) {
        return Promise.reject(new Error('not implemented'));
    }
}