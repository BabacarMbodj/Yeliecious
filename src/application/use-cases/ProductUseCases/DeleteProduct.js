module.exports = (ProductRepository) => {

    async function Execute(id) {

        return ProductRepository.deleteProduct(id);

    }

    return { Execute };

};