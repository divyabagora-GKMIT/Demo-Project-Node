const { getCachedAddresses, setCachedAddresses, delCachedAddresses } = require("../helpers/addressCache.helper");
const { UserAddress } = require("../models");
const { getAddressById, getAllAddresses } = require("../serializers/address.serializer");
const { customError } = require("../utils/errorResponse");
const keyGeneration = require("../utils/keyGenerate");

const addAddress = async (payload) => {
  const { userId, addressLine, city, state, zip, country } = payload;
  const newAddress = await UserAddress.create({
    user_id: userId,
    address_line: addressLine,
    city,
    state,
    zip,
    country,
  });
  return newAddress;
};

const viewAllAddresses = async (query) => {
  const { page, limit, sort = "created_at", order = -1 } = query;
  console.log(sort, order);
  let key = keyGeneration(page, limit, sort, order);
  const offset = (page - 1) * limit;
  const orderBy = order === -1 ? "DESC" : "ASC";

  const cachedAddresses = await getCachedAddresses(key);
  if (cachedAddresses) return cachedAddresses;

  const addresses = await UserAddress.findAll({
    limit,
    offset,
    order: [[sort, orderBy]],
    attributes: {
      exclude: ["deleted_at"],
    },
    raw: true,
  });

  const allAddresses = getAllAddresses(addresses);
  await setCachedAddresses(key, allAddresses);
  return allAddresses;
};

const viewAddress = async (id) => {
  const addressExist = await UserAddress.findByPk(id, {
    attributes: {
      exclude: ["deleted_at"],
    },
  });

  if (!addressExist) {
    throw customError(404, "Address not found");
  }

  const address = getAddressById(addressExist);
  return address;
};

const updateAddress = async (id, payload) => {
  const addressExist = await UserAddress.findByPk(id);

  if (!addressExist) {
    throw customError(404, "Address not exist");
  }

  await delCachedAddresses();
  const updatedAddress = await UserAddress.update(payload, {
    where: { id },
  });
  return updatedAddress;
};

const deleteAddress = async (id) => {
  const addressExist = await UserAddress.findByPk(id);

  if (!addressExist) {
    throw customError(404, "Addresses not exist");
  }
  await delCachedAddresses();

  await addressExist.destroy();
  return;
};

module.exports = {
  addAddress,
  viewAllAddresses,
  viewAddress,
  updateAddress,
  deleteAddress,
};
