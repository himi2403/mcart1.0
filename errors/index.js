const HttpStatus = require('http-status');

const merchantExistsError = { message: 'Merchant already exists', status: 200, success: false };

const linkExpiredError = { message: 'The Link is Expired', status: HttpStatus.BAD_REQUEST, success: false };

const noAccessRights = { message: 'You have No Access Rights', status: HttpStatus.BAD_REQUEST, success: false };

const tokenUbsentError = { message: 'Token is not present in the header', status: HttpStatus.BAD_REQUEST, success: false };

const unAuthorizedUserError = { message: 'Unauthorized User', status: HttpStatus.UNAUTHORIZED, success: false };

const internalError = { message: 'Internal Error', status: 500, success: false };

const emailNotExist = { message: `Email is not registered with us`, status: 200, success: false };

const wrongPasswordError = {message : `you've entered wrong password`, status:200, success: false};

const merchantDoesNotExist = {message: "merchant doest not exist", status:200, success : false};

const merchantIdnotFound = {message: "Merchant does not found", status:200 ,success: false}

const serialNoExistError = {message:"Serial Number is Already exist", status:200, success:false}

const allreadyExist = {message: "Already exist", status:200, success:false}

const productnotfound = {message: "product not found", status:200, success:false}

const customerAllreadyExist ={message: "this customer is allready exist", status:200, success:false}

const  thisIdNotexist = {message: "this Id not exist", status:404, success: false}

module.exports = {
    merchantExistsError,
    linkExpiredError,
    noAccessRights,
    tokenUbsentError,
    unAuthorizedUserError,
    internalError,
    emailNotExist,
    wrongPasswordError,
    merchantDoesNotExist,
    merchantIdnotFound,
    serialNoExistError,
    allreadyExist,
    productnotfound,
    customerAllreadyExist,
    thisIdNotexist

};
