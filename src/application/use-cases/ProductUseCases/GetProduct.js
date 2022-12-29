module.exports = (ProductRepository) => {

    async function Execute(id) {

        return ProductRepository.getProduct(id);

    }

    return { Execute };

};