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
            required: [true, "Customer name is required"]
        },

        phone:
        {
            type: String,
            required: [true, "Customer name is required"]
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
            required: [true, "Product type is required"]
        },

        size:
        {
            type: Number,
            required: [true, "Product size is required"]
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

