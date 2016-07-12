import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
// cnode 公共 API
const domain = 'https://cnodejs.org/api/v1/topics';

export default {
  getList(data, callback) {
    Vue.resource.get(domain, data).then((response) => {
      callback(null, response);
    }).catch((e) => {
      callback(e);
    });
  }
}