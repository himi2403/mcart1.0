const productModel = require("../models/productschema")
const merchant = require("../models/merchant")
const HttpStatus = require('http-status');
const errors = require('../errors');

const addProduct = async (req, res, next) => {
    let product
    let { serialNo } = req.body
    try {
        const existingProduct = await productModel.findOne({ "serialNo": { $regex: new RegExp(serialNo, "i") } })
        // console.log("existing",existingProduct)
        if (existingProduct) {
            return res.send(errors.serialNoExistError)
        }

        const addproduct = new productModel(req.body)
        product = await addproduct.save()
    } catch (error) {
        return next(error)
    }
    res.status(HttpStatus.OK).json({ product: product, status: 200, success: true })
}


const allProduct = async (req, res, next) => {
    let product
    // let brandName
    const { brandName, category_id } = req.body
    const filter = {}
    if (brandName) {
        filter['brandName'] = brandName
    }
    if (category_id) {
        filter["category_id"] = category_id
    }
    try {
        product = await productModel.aggregate([
            {
                $match: {
                    // isActive: true
                    isActive: {$ne: false}
                }
            },
            {
                $lookup: {
                    from: "merchants",
                    localField: "merchant_id",
                    foreignField: "_id",
                    as: "merchant_detail"
                }
            },
            {
                $project: {
                    _id: 1,
                    merchant_id: 1,
                    category_id: 1,
                    name: 1,
                    short_Description: 1,
                    long_Description: 1,
                    unit: 1,
                    baseCost: 1,
                    brandName: 1,
                    size: 1,
                    categoryDetail: 1,
                    isActive: 1
                }
            }

        ]).exec()
        // console.log()
    } catch (error) {
        return next({ error: error.message})
    }
    res.status(HttpStatus.OK).json({ product: product, status: 200, success: true })
}
const productSort = async (req, res, next) => {
    let limit = 0; let skip = 0
    if (req.query.limit != null || req.query.limit != 0) {
        limit = req.query.limit
    }
    if (req.query.skip != 0 || req.query.skip != 0) {
        skip = req.query.skip
    }
    let data = await productModel.find({}, { _id: 0 }).sort({ [req.query.key]: req.query.value })
    if (!data) {
        return res.send(errors.productnotfound)
    }
    else {
        res.status(HttpStatus.OK).json({ result: data, status: 200, success: true })
    }
}
const filterByBrand = async (req, res, next) => {
    let limit = 0; let skip = 0
    if (req.query.limit != null || req.query.limit != 0) {
        limit = req.query.limit
    }
    if (req.query.skip != 0 || req.query.skip != 0) {
        skip = req.query.skip
    }
    const { brandName } = req.body
    const data = await productModel.find({ "brandName": { $regex: new RegExp(brandName, "i") } })
    // console.log(data)
    if (!data) {
        return res.send("data is empty")
    } else {
        res.status(HttpStatus.OK).json({ result: data, status: 200, success: true })
    }
}
const filterByName = async (req, res, next) => {
    let limit = 0; let skip = 0
    if (req.query.limit != null || req.query.limit != 0) {
        limit = req.query.limit
    }
    if (req.query.skip != 0 || req.query.skip != 0) {
        skip = req.query.skip
    }
    const { name } = req.params
    const data = await productModel.find({ "name": { $regex: new RegExp(name, "i") } })
    // console.log(data)
    if (!data) {
        return res.send("data is empty")
    } else {
        res.status(HttpStatus.OK).json({ result: data, status: 200, success: true })
    }
}
const filterByCategoriesName = async (req, res, next) => {
    // const id  = req.params.categoryName
    let limit = 0; let skip = 0
    if (req.query.limit != null || req.query.limit != 0) {
        limit = req.query.limit
    }
    if (req.query.skip != 0 || req.query.skip != 0) {
        skip = req.query.skip
    }
    const { categoryName } = req.params
    const data = await productModel.find({ "categoryName": { $regex: new RegExp(categoryName, "i") } })
    // console.log(data)
    if (!data) {
        return res.send("data is empty")
    } else {
        res.status(HttpStatus.OK).json({ result: data, status: 200, success: true })
    }
}

const productgetbymerchantid = async (req, res, next) => {
    let limit = 0; let skip = 0
    if (req.query.limit != null || req.query.limit != 0) {
        limit = req.query.limit
    }
    if (req.query.skip != 0 || req.query.skip != 0) {
        skip = req.query.skip
    }
    try {
        const { category_id } = req.body
        const data = await productModel.find({ category_id }).limit(limit).skip(skip)
        if (!data) {
            return res.send("form this id no data found")
        }
        else {
            return res.status(HttpStatus.OK).json({ result: data, status: 200, success: true })
        }
    } catch (error) {
        return next(error)
    }
}
const deleteProduct = async (req, res) => {
    const { id } = req.params
    var flag = await productModel.findOne({ _id: id })
    if (flag != null) {
        await productModel.updateOne({ _id: id }, { $set: { isActive: false } })
            .then(() => res.status(200)
                .json({ status: 200, MESSAGE: "this Product has been deleted" }
                ))
            .catch((error) => res.status(403).json({ status: 500, error: error }))
    } else
        res.status(403).json({ status: 500, Error: errors.merchantDoesNotExist })
}
//    const updateProduct = async (req, res) => {
//     //  console.log(req.query)
//     const {id} = req.params
//        var flag = await merchant.findOne({_id:req.query.id })
//       if (flag.length!=0||flag!=null)
//        {
//         var {shortDescription,longDescription,unit,baseCost,discount,size,isActive,categoryName } = req.body
//    var result = await productModel.updateOne({merchantEmail:req.query.email,brand:req.query.brand,model:req.query.model },
//      {
//             $set: {shortDescription,longDescription,unit,baseCost,discount,size,isActive}
//          }).catch((err) => res.status(403).json({status}
//         }   
//     }
const updateProduct = async (req, res) => {
    const { id } = req.params
    const flag = await merchant.find({ _id: id })
    if (flag.length != 0 || flag != 0) {
        let { short_Description, long_Description, unit, baseCost, discount, size, brandName, isActive, categoryName } = req.body
        var result = await productModel.updateOne({ serialNo: req.query.serialNo, }, {
            $set: { short_Description, long_Description, unit, baseCost, brandName, discount, size, isActive, categoryName }
        })
            // console.log(result)
            .then((result) => {
                res.status(200).send({ "result": result })
            })
            .catch((error) => {
                res.status(200).send({ "error": error })
                console.log('error', error)
            })
    }
}

const searchByProduct = async (req, res, next) => {
    let limit = 0; let skip = 0
    if (req.query.limit != null || req.query.limit != 0) {
        limit = req.query.limit
    }
    if (req.query.skip != 0 || req.query.skip != 0) {
        skip = req.query.skip
    }
    try {
        const regex = new RegExp(req.query.name, "i")
        let result = await productModel.find({
            $or: [
                { brandName: regex },
                { categoryName: regex },
                { size: regex },
                { short_Description: regex },
                { long_Description: regex }
            ]
        })
            .limit(limit).skip(skip)
        res.status(500).json({ result: result, status: 200, success: true })
    } catch (error) {
        return next(error)
    }
}

//pouplate
const populate = async (req, res) => {
    // const {id} =  req.body
    //merchant_id is a field in the productModel and and merchant_id contain object id of merctant
    const a = await productModel.find().populate("merchant_id")
    return res.send({ a: a })
}

module.exports = {
    addProduct,
    allProduct,
    productSort,
    filterByBrand,
    filterByCategoriesName,
    productgetbymerchantid,
    deleteProduct,
    updateProduct,
    searchByProduct,
    populate
}