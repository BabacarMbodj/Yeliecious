module.exports = class Product {
    constructor(type, size, sizeDescriptor, flavours, shape) {
        this.type = type;
        this.size = size;
        this.sizeDescriptor = sizeDescriptor;
        this.flavours = flavours;
        this.shape = shape;
    }
};