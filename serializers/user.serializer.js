const getAllUsers = (data) => {
  return data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      contact: item.contact,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    };
  });
};

const getUserById = (item) => {
 return {
    id: item.id,
    name: item.name,
    email: item.email,
    contact: item.contact,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
};

module.exports = {
  getAllUsers,
  getUserById,
};
