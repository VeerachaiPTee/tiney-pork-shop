export default {
  checkAuth() {
    return localStorage.getItem('token')
  },

  addProduct({ commit }, data) {
    return this.$axios
      .$post('api/admin/addProduct', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  updateProduct({ commit }, data) {
    return this.$axios
      .$post('api/admin/updateProduct', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
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
  deleteProduct({ commit }, data) {
    return this.$axios
      .$post('api/filter/deleteProduct', data)
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
}
