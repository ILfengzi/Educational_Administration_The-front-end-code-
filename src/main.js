// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import qs from 'qs'
import VueAxios from 'vue-axios'
import {Menu,Icon,Badge,Upload,message,Table,Pagination,Dropdown
  ,Button,Tabs,Select,Form,Drawer,Row,Col,Input,InputNumber,TreeSelect,Modal,Collapse,checkbox,
  Radio,Tooltip,
} from 'ant-design-vue'
import "./assets/styles/css/reset.css"
import "./assets/styles/css/iconfont.css"
import './assets/styles/css/content.css'

Vue.use(Menu);
Vue.use(Icon);
Vue.use(Badge);
Vue.use(message);
Vue.use(Table);
Vue.use(Dropdown);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(Select);
Vue.use(Form);
Vue.use(Drawer);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(TreeSelect);
Vue.use(Modal);
Vue.use(Collapse);
Vue.use(checkbox);
Vue.use(Radio);
Vue.use(Tooltip);
Vue.use(Upload);
Vue.use(Pagination);


Vue.prototype.$form = Form
Vue.prototype.$message = message
Vue.config.productionTip = false
axios.defaults.withCredentials = true //解决sessionId不一致问题：跨域共享session
Vue.prototype.$qs = qs                //qs.stringify()将对象 序列化成URL的形式，以&进行拼接
Vue.use(VueAxios,axios)               //axios结合vue-axios使用
Vue.prototype.url1 = '';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
