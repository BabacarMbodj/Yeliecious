module.exports =
{
    availabilitySchema: {

        availableDate:
        {
            type: Date,
            required: [true, "Activity date is required"]
        },

        spots:
        {
            type: Number,
            required: [true, "Activity date is required"]
        },

        isFull:
        {
            type: Boolean
        }
    }

    ,

    customerSchema:
    {
        name:
        {
            type: String,
            require: [true, "Customer name is required"]
        },

        phone:
        {
            type: String,
            require: [true, "Customer name is required"]
        },

        email:
        {
            type: String
        }
    }
    ,

    productSchema:
    {
        type:
        {
            type: String,
            require: [true, "Product type is required"]
        },

        size:
        {
            type: Number,
            require: [true, "Product size is required"]
        },

        sizeDescriptor:
        {
            type: String
        },

        flavours:
        {
            type: [String],
            validate: v => Array.isArray(v) && v.length > 0,
        },

        shape:
        {
            type: String
        }
    }
}

