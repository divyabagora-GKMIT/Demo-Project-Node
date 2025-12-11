const { userService } = require("../services");
const { errorResponse } = require("../utils/errorResponse");
const { successResponse } = require("../utils/successResponse");

const {
  getCachedUsers,
  setCachedUser,
  setCachedUsers,
  getCachedUser,
  delCachedUsers,
} = require("../helpers/cache.helper.js");
const keyGeneration = require("../utils/keyGenerate.js");

const createUser = async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    return successResponse(res, 201, "User created successfully", result);
  } catch (error) {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return errorResponse(res, statusCode, message, error.name || "Error");
  }
};
const viewAllUsers = async (req, res, next) => {
  try {
    const result = await userService.viewAllUsers(req.query);
    return successResponse(res, 200, "Users fetch Successfully", result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return errorResponse(res, statusCode, message, error.name || "Error");
  }
};
const viewUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userService.viewUser(id);
    return successResponse(res, 200, "User fetch successfully", result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return errorResponse(res, statusCode, message, error.name || "Error");
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userService.updateUser(id, req.body);
    
    return successResponse(res, 200, "User updated successfully", result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return errorResponse(res, statusCode, message, error.name || "Error");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await delCachedUsers();

    await userService.deleteUser(id);
    return successResponse(res, 204, "User deleted successfully");
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return errorResponse(res, statusCode, message, error.name || "Error");
  }
};

const getAddresses = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userService.getAddresses(id);
    return successResponse(res, 200, "User Addresses fetch successfully", result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return errorResponse(res, statusCode, message, error.name || "Error");
  }
};

module.exports = {
  createUser,
  viewAllUsers,
  viewUser,
  updateUser,
  deleteUser,
  getAddresses,
};
