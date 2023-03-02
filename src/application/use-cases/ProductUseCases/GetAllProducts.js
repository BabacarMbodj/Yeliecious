module.exports = (ProductRepository) => {

    async function Execute() {

        return ProductRepository.getAllProducts();

    }

    return { Execute };

};