<template>
<q-page>

  <transition appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut">
    <div class="row">
      <div class="col-6 weather">
        <div class="inner-content">
          <h4>Backup</h4>Het gebruik van deze app is op eigen risico.<br>Er is nauwelijks een risico bij het maken van back-ups, maar bij het terugzetten van flows bestaat het risico wel.<br>De auteur van deze app levert geen ondersteuning wanneer flows corrupt raken.<br>Deze app kan niet bij je apparaten. Wanneer je een flow terugzet, kunnen missende en/of opnieuw toegevoegde apparaten leiden tot gebroken flows.<br><br>
          Athom ondersteunt deze manier van back-ups en restores niet.<br><br><br>
          <div id="app-5">
            <p>{{ message }}</p>
            <button v-on:click="createFullBackUp">Create Full Backup</button><br><br>
            <button v-on:click="restoreFromBackUp">Restore Flows from Backup</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</q-page>
</template>

<script>
import JSZip from 'jszip'
import moment from 'moment'
export default {
  components: {},
  data () {
    return {
      message: 'Hello Vue.js!',
      flows: '',
      folders: ''
    }
  },
  mounted () {
  },
  methods: {
    async createFullBackUp () {
      this.message = this.message.split('').reverse().join('')
      let system = await this.$homey.system.getInfo()

      var homeyMajorVersion = 0
      if (!system.homeyVersion && system.homey_version) {
        homeyMajorVersion = 1
        // console.log ( "Version ", homeyMajorVersion, system.homey_version )
      } else {
        if (system.homeyVersion && !system.homey_version) {
          homeyMajorVersion = 2
          // console.log ( "Version ", homeyMajorVersion, system.homeyVersion )
        } else {
          console.log('Error!!', homeyMajorVersion)
        }
      }
      var folders
      var tokens
      let flows = await this.$homey.flow.getFlows()
      let apps = await this.$homey.apps.getApps()
      let zones = await this.$homey.zones.getZones()
      let devices = await this.$homey.devices.getDevices()
      let alarms = await this.$homey.alarms.getAlarms()
      if (homeyMajorVersion === 1) {
        folders = await this.$homey.flow.getFolders()
        tokens = await this.$homey.flow.getTokens()
      } else {
        folders = await this.$homey.flow.getFlowFolders()
        tokens = await this.$homey.flowToken.getFlowTokens()
      }
      // console.log(JSON.stringify(flows))
      // console.log(folders)

      var zip = new JSZip()
      zip.file('backUpInfo.json', JSON.stringify({
        backUpDate: new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)),
        backUpVersion: 3,
        homeyName: system.hostname
      }))
      zip.file('system.json', JSON.stringify(system))
      zip.file('folders.json', JSON.stringify(folders))
      zip.file('flows.json', JSON.stringify(flows))
      zip.file('apps.json', JSON.stringify(apps))
      zip.file('zones.json', JSON.stringify(zones))
      zip.file('devices.json', JSON.stringify(devices))
      zip.file('alarms.json', JSON.stringify(alarms))
      zip.file('tokens.json', JSON.stringify(tokens))
      var zipContents = await zip.generateAsync({type: 'blob', compression: 'deflate', compressionOptions: { level: 9 }})

      var blob = new Blob([zipContents], { type: 'application/zip' })
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      let date = new Date()
      link.download = system.hostname + '-flow-backup-' + moment(date).format('YYYYMMDD-HH_mm_ss') + '.zip'
      document.body.appendChild(link)
      // The actual download
      link.click()
      document.body.removeChild(link)
      return true
    },
    restoreFromBackUp () {
      this.message = 'This is Restored from Backup!!'
    }
  },
  computed: {
    settings: {
      get () {
        return this.$store.state.settings
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.weather
  padding 10px
  .inner-content
    background-color rgba(0, 0, 0, 0.5)
    border-radius 10px
    padding 20px
    color white
    h4
      color rgb(190, 187, 187)
      font-weight 200
      font-size 30px
      text-transform uppercase

</style>
