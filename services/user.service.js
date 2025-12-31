const { getCachedUsers, setCachedUsers, delCachedUsers } = require("../helpers/cache.helper");
const logger = require("../logger");
const { User, UserAddress } = require("../models");
const { getAllUsers, getUserById } = require("../serializers/user.serializer");
const { customError } = require("../utils/errorResponse");
const keyGeneration = require("../utils/keyGenerate");

const createUser = async (payload) => {
  const { name, email, contact } = payload;
  const userInDb = await User.findOne({
    where: { email: email }
  });

  if (userInDb) {
    throw customError(409, "User already exists");
  }

  const newUser = await User.create({
    name,
    email,
    contact,
  });
  return newUser;
};

const viewAllUsers = async (query) => {
  const { page , limit, sort, order } = query;
  let key = keyGeneration(page, limit, sort, order);
  const offset = (page - 1) * limit;

  if (!sort){
    logger.warn("Pagination fields are empty");
  }
  let orderBy = order == -1 ? "DESC" : "ASC"
  const { count, rows: users } = await User.findAndCountAll({
    limit ,
    offset,
    order: [[sort, orderBy]],
    attributes: {
      exclude: ["deleted_at"],
    },
  });

  const totalPages = Math.ceil(count / limit);
  const remainingPages = totalPages - parseInt(page);
  const countOnPage = count > limit ? limit : count;

  let newData = getAllUsers(users);
  await setCachedUsers(key, newData);
  return {
    newData,
    page: parseInt(page),
    count: countOnPage,
    remainingPages
  }
}

const viewUser = async (id) => {
  const userExist = await User.findByPk(id, {
    attributes: {
      exclude: ["deleted_at"],
    },
  });

  if (!userExist) {
    throw customError(404, "User not found");
  }

  return getUserById(userExist);
};

const updateUser = async (id, payload) => {
  const userExist = await User.findByPk(id);

  if (!userExist) {
    throw customError(404, "User not exist");
  }
  await delCachedUsers();
  const updatedUser = await User.update(payload, {
    where: { id },
  });
  console.log(updatedUser);
  return updatedUser;
};

const deleteUser = async (id) => {
  const userExist = await User.findByPk(id);

  if (!userExist) {
    throw customError(404, "User not exist");
  }

  await delCachedUsers();

  await userExist.destroy();
  return;
};

const getAddresses = async (id) => {
  const userExist = await User.findByPk(id);

  if (!userExist) {
    throw customError(404, "User not exist")
  }

  const allData = await UserAddress.findAll({
    where: { user_id: id },
    attributes: {
      exclude: ["deleted_at"],
    },
  });
  return allData;
};

module.exports = {
  createUser,
  viewAllUsers,
  viewUser,
  updateUser,
  deleteUser,
  getAddresses,
};
