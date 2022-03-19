import Vue from 'vue'
import { Container, Header, Main, Aside, ColorPicker, Slider, Message, Drawer, Image, Dialog, Button, Select, Option, Loading } from 'element-ui'
import 'element-ui/lib/theme-chalk/fonts/element-icons.ttf'
import 'element-ui/lib/theme-chalk/icon.css'
import 'element-ui/lib/theme-chalk/container.css'
import 'element-ui/lib/theme-chalk/header.css'
import 'element-ui/lib/theme-chalk/main.css'
import 'element-ui/lib/theme-chalk/aside.css'
import 'element-ui/lib/theme-chalk/color-picker.css'
import 'element-ui/lib/theme-chalk/slider.css'
import 'element-ui/lib/theme-chalk/drawer.css'
import 'element-ui/lib/theme-chalk/image.css'
import 'element-ui/lib/theme-chalk/message.css'
import 'element-ui/lib/theme-chalk/dialog.css'
import 'element-ui/lib/theme-chalk/button.css'
import 'element-ui/lib/theme-chalk/select.css'
import 'element-ui/lib/theme-chalk/option.css'
import 'element-ui/lib/theme-chalk/loading.css'

Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(ColorPicker)
Vue.use(Slider)
Vue.use(Drawer)
Vue.use(Image)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Loading)

Vue.prototype.$message = Message
