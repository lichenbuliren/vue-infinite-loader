import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
// cnode 公共 API
const domain = 'https://cnodejs.org/api/v1/topics';

export default {
  getList(data, callback) {
    Vue.http.get(domain, {
      params: data
    }).then((response) => {
      callback(null, response.json());
    }).catch((e) => {
      callback(e);
    });
  }
};
