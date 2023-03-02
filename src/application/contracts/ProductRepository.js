module.exports = class ProductRepository {
    constructor() { }


    addProduct(type, size, sizeDescriptor, flavours, shape) {
        return Promise.reject(new Error('not implemented'));
    }

    getProduct(id) {
        return Promise.reject(new Error('not implemented'));
    }

    getProductByType(productType) {
        return Promise.reject(new Error('not implemented'));
    }
    getAllProducts() {
        return Promise.reject(new Error('not implemented'));
    }

    UpdateProduct(id, newProduct) {
        return Promise.reject(new Error('not implemented'));
    }
    DeleteProduct(id) {
        return Promise.reject(new Error('not implemented'));
    }
}