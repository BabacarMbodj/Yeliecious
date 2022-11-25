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
}

