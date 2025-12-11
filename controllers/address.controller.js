const { getCachedAddress, getCachedAddresses, setCachedAddresses, delCachedAddresses } = require("../helpers/addressCache.helper");
const { addressService } = require("../services");
const { errorResponse } = require("../utils/errorResponse");
const keyGeneration = require("../utils/keyGenerate");
const { successResponse } = require("../utils/successResponse");

const addAddress = async (req, res, next) => {
    try {
        const result = await addressService.addAddress(req.body);
        return successResponse(res, 201, "Address added successfully", result);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        return errorResponse(res, statusCode, message, error.name || "Error");
    }
};

const viewAllAddresses = async (req, res, next) => {
    try {
        const result = await addressService.viewAllAddresses(req.query);
        return successResponse(res, 200, "Addresses fetch successfully", result);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        return errorResponse(res, statusCode, message, error.name || "Error");
    }
};

const viewAddress = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await addressService.viewAddress(id);
        return successResponse(res, 200, "Address fetch successfully", result);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        return errorResponse(res, statusCode, message, error.name || "Error");
    }
};

const updateAddress = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await addressService.updateAddress(id, req.body);
        return successResponse(res, 200, "Address updated successfully", result);
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        return errorResponse(res, statusCode, message, error.name || "Error");
    }
};

const deleteAddress = async (req, res, next) => {
    try {
        const id = req.params.id;
        await addressService.deleteAddress(id);
        return successResponse(res, 204, "Address deleted successfully");
    } catch (error) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        return errorResponse(res, statusCode, message, error.name || "Error");
    }
};

module.exports = {
    addAddress,
    viewAllAddresses,
    viewAddress,
    updateAddress,
    deleteAddress,
};
