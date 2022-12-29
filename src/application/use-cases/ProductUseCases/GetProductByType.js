module.exports = (ProductRepository) => {

    async function Execute(productType) {

        return ProductRepository.getProductByType(productType);

    }

    return { Execute };

};