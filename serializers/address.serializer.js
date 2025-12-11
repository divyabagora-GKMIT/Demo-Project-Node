const getAllAddresses = (data) => {
  return data.map((item) => {
    return {
      id: item.id,
      userId: item.user_id,
      addressLine: item.address_line,
      city: item.city,
      state: item.state,
      zip: item.zip,
      country: item.country,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    };
  });
};

const getAddressById = (data) => {
  return {
    id: data.id,
    userId: data.user_id,
    addressLine: data.address_line,
    city: data.city,
    state: data.state,
    zip: data.zip,
    country: data.country,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

module.exports = {
  getAllAddresses,
  getAddressById,
};
