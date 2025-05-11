const validateEditData = (req)=>{
    const allowedFields = ['name', 'location', 'price', 'interiorFeatures', 'images', 'availability']

    const isEditAllowed = Object.keys(req.body).every((key)=> allowedFields.includes(key))

    return isEditAllowed
}

module.exports = validateEditData