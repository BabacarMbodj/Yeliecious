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
}

