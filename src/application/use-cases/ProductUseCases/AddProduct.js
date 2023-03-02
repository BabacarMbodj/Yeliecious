const Product = require("../../../entities/Product");


module.exports = (ProductRepository) => {

    async function Execute(type, size, sizeDescriptor, flavours, shape) {

        let newProduct = new Product(type, size, sizeDescriptor, flavours, shape);
        return await ProductRepository.addProduct(newProduct);

    }
    return { Execute };

};