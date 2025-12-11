const keyGeneration = (value, page, limit, sort = "created_at", order = -1) => {
    return `${value}/:${page}:${limit}:${sort}:${order}`;
}

module.exports = keyGeneration