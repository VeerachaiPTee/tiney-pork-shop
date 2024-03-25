export default {
  login({ commit }, data) {
    return this.$axios
      .$post('api/login/user', data)
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  listProduct({ commit }, data) {
    return this.$axios
      .$get('api/filter/listProduct')
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
}
