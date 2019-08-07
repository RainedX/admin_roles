import Vue from 'vue'
import {
    Button,
    Container,
    Message,
    Loading,
    Icon,
    Card,
    Header,
    Aside,
    Main,
    Input,
    Form,
    FormItem,
    Footer
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Card)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message;

// // background-color: rgb(16, 17, 23);