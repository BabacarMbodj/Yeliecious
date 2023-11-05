const validator = require('validator');
const mongoose = require("mongoose");
module.exports =
{
    availabilitySchema: {

        availableDate:
        {
            type: Date,
            required: [true, "Activity date is required"],
            unique: [true, "The date has already been defined, update it instead"],
            validate: [validator.isDate, 'Enter a valid date.']
        },

        spots:
        {
            type: Number,
            required: [true, "number of spots"]
        },

        isFull:
        {
            type: Boolean
        }
    }

    ,

    productSchema:
    {
        type:
        {
            type: String,
            required: [true, "Product type is required"],
            unique: [true, "The product has already been defined, update it instead"]
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
    },

    orderSchema:
    {
        products:
        {
            type: [mongoose.Schema.Types.ObjectId],
            validate: v => Array.isArray(v) && v.length > 0
        },

        activityDate:
        {
            type: Date,
            required: [true, "Activity date is required"],
            validate: [validator.isDate, 'Enter a valid date.']
        },
        createdDate:
        {
            type: Date
        },
        dueDate:
        {
            type: Date,
            required: [true, "Activity date is required"],
            validate: [validator.isDate, 'Enter a valid date.']
        },
        orderStatus:
        {
            type: String,
            required: [true, "Status is required"]
        },

        history:
        {
            type: [String]
        }
    }
}

