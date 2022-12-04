module.exports = (CustomerRepository) => {

    async function Execute(phone) {

        return CustomerRepository.getCustomerByPhone(phone);

    }

    return { Execute };

};