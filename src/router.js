import Vue from 'vue'
import VueRouter from 'vue-router'

// Components
import Devices from '@/Devices'
import Dashboard from '@/Dashboard'
import Spotify from '@/Spotify'
import Alarm from '@/Alarm'

// Sidebars
import Devices_sidebar from '@/base/sidebars/Devices_sidebar'

// Toolbars
import DashboardToolbar from '@/base/toolbars/DashboardToolbar'
import BasicToolbar from '@/base/toolbars/BasicToolbar'

const {
  AthomCloudAPI,
  HomeyAPI
} = require('athom-api')

Vue.use(VueRouter)

/*
 * Uncomment this section and use "load()" if you want
 * to lazy load routes.
function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}
*/

const router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  // mode: 'history',
  routes: [
  {
    name: 'Devices',
    path: '/devices/:zone?',
    components: {
      main: Devices,
      toolbar: BasicToolbar,
      sidebar: Devices_sidebar
    }
  },
  {
    name: 'Dashboard',
    path: '/',
    components: {
      main: Dashboard,
      toolbar: DashboardToolbar,
      sidebar: null
    }
  },
  {
    name: 'Spotify',
    path: '/spotify',
    components: {
      main: Spotify,
      toolbar: BasicToolbar,
      sidebar: null
    }
  },
  {
    name: 'Alarm',
    path: '/alarm',
    components: {
      main: Alarm,
      toolbar: BasicToolbar,
      sidebar: null
    }
  }]
});




export default router
