const Product = require("../../../entities/Product");

module.exports = (ProductRepository) => {

    async function Execute(id, type, size, sizeDescriptor, flavours, shape) {

        let newProduct = new Product(type, size, sizeDescriptor, flavours, shape);
        return ProductRepository.updateProduct(id, newProduct);

    }

    return { Execute };

};