import Vue from 'vue';
import App from './app.vue';

import './assets/images/background-image.jpg';
import './assets/styles/stylus_css.styl';

const Root = document.createElement('div');
document.body.appendChild(Root);

new Vue({
  render:(h)=>h(App)
}).$mount(Root);