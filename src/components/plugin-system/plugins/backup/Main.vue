<template>
<q-page>
  <transition appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut">
      <div class="col-6 weather">
        <div class="inner-content">
        <div>
          <p><file-select v-model="restoreFile" @input="loadRestoreFile"></file-select></p>
          <p v-if="restoreFile"></p>
        </div>
        <q-item>
          <q-btn color="red" style="width: 100%;" v-on:click="debugHomey()" icon="bug_report">&nbsp;&nbsp;Development Debug</q-btn>
        </q-item><br>
        <br>
        <div id="tabs" class="container">
            <div class="tabs">
              <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]">Backup All</a>
              <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]">Restore Alarms</a>
              <a v-on:click="activetab=3" v-bind:class="[ activetab === 3 ? 'active' : '' ]">Restore Apps</a>
              <a v-on:click="activetab=4" v-bind:class="[ activetab === 4 ? 'active' : '' ]">Restore Zones</a>
              <a v-on:click="activetab=5" v-bind:class="[ activetab === 5 ? 'active' : '' ]">Restore Devices</a>
              <a v-on:click="activetab=6" v-bind:class="[ activetab === 6 ? 'active' : '' ]">Restore Folders</a>
              <a v-on:click="activetab=7" v-bind:class="[ activetab === 7 ? 'active' : '' ]">Restore Flows</a>
              <a v-on:click="activetab=8" v-bind:class="[ activetab === 8 ? 'active' : '' ]">Restore Tokens</a>
            </div>
            <div class="content">
                <div v-if="activetab === 1" class="tabcontent">
                  <div class="row">
                    <div class="col-6 weather">
                      <h4>Backup {{ homeyName }}</h4>Use app is at your own risk!
                      There is no Risk when backing up, but restore of data is not officialy supported.
                      There is hardly any risk, as I use the default APIs but Homeys internal structures have manny cross references that I want to fix. All is done on a best effort for the structures that I know.
                      <br>The author of this app does not provide support when flows get corrupt.
                      <br>When you restore a flow, missing and / or re-added devices can lead to broken flows.
                      <br><br>Athom does not support this way of backups and restores.<br><br><br>
                      <div id="app-5">
                        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                        <q-item>
                          <q-btn color="green" style="width: 100%;" v-on:click="createFullBackUp()" icon="archive">&nbsp;&nbsp;Create Full Backup</q-btn>
                        </q-item>
                      </div>
                    </div>
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <h4>Settings</h4>
                        <br><br><br><br><br><br><br>
                        <h4>Done</h4>
                        - Framwork<br>
                        - Tables with everything<br>
                        - Backup to File<br>
                        - Load restore File<br>
                        - <br>
                        <h4>ToDo</h4>
                        - ID check on Homeys<br>
                        - ID check on existing object<br>
                        - Beautify Alarms-Repetitions<br>
                        - Path on Zones/Folders<br>
                        - Restore Zones<br>
                        - Restore Devices<br>
                        - Restore Folders<br>
                        - Restore Flows<br>
                        - Restore Tokens<br>
                        - CrossCheck Flows vs Flows - Triggers<br>
                        - CrossCheck Flows vs Devices<br>
                        - CrossCheck Flows vs Alarms<br>
                        - CrossCheck Flows vs Users<br>

                        <q-item>
                          <q-btn color="black" style="width: 100%;" v-on:click="reloadHomey()" icon="refresh">&nbsp;&nbsp;Reload from {{ homeyName }}</q-btn>
                        </q-item><br>
                      </div>
                    </div>
                </div>
                  <br>
                  <q-item>
                    <q-btn color="black" style="width: 100%;" v-on:click="logoffHomey()" icon="exit_to_app">&nbsp;&nbsp;Logoff from Homey</q-btn>
                  </q-item>
                </div>
                <div v-if="activetab === 2" class="tabcontent">
                  <div class="row">
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <q-table
                          title="Alarms on Homey"
                          :data="this.alarmsAr"
                          :columns="alarmsColumns"
                          row-key="id"
                          :pagination.sync="pagination"
                          :rows-per-page-options=[5,10,15]
                        /><br>
                        <q-item>
                          <q-btn color="black" style="width: 100%;" v-on:click="reloadHomey()" icon="refresh">&nbsp;&nbsp;Reload from {{ homeyName }}</q-btn>
                        </q-item><br>
                      </div>
                    </div>
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <q-table
                          title="Alarms from Backup"
                          :data="this.rAlarmsAr"
                          :columns="alarmsColumns"
                          selection="multiple"
                          :selected.sync="selectedAlarmsList"
                          row-key="id"
                          :pagination.sync="pagination"
                          :rows-per-page-options=[5,10,15]
                        /><br>
                        <q-item>
                          <q-btn color="red" style="width: 100%;" v-on:click="restoreSelectedAlarms()" icon="settings_backup_restore">&nbsp;&nbsp;Restore selected Alarms</q-btn>
                        </q-item>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="activetab === 3" class="tabcontent">
                  <div class="row">
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <q-table
                          title="Apps on Homey"
                          :data="this.appsAr"
                          :columns="appsColumns"
                          row-key="id"
                          :pagination.sync="pagination"
                          :rows-per-page-options=[5,10,15]
                        /><br>
                        <q-item>
                          <q-btn color="black" style="width: 100%;" v-on:click="reloadHomey()" icon="refresh">&nbsp;&nbsp;Reload from {{ homeyName }}</q-btn>
                        </q-item><br>
                      </div>
                    </div>
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <q-table
                          title="Apps from Backup"
                          :data="this.rAppsAr"
                          :columns="appsColumns"
                          selection="multiple"
                          :selected.sync="selectedAppsList"
                          row-key="id"
                          :pagination.sync="pagination"
                          :rows-per-page-options=[5,10,15]
                        /><br>
                        <q-item>
                          <q-btn color="red" style="width: 100%;" v-on:click="restoreSelectedApps()" icon="file_download">&nbsp;&nbsp;Install selected Apps</q-btn>
                        </q-item>

                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="activetab === 4" class="tabcontent">
                  <div class="row">
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <q-table
                          title="Zones on Homey"
                          :data="this.zonesAr"
                          :columns="zonesColumns"
                          row-key="id"
                          :pagination.sync="pagination"
                          :rows-per-page-options=[5,10,15]
                        /><br>
                        <q-item>
                          <q-btn color="black" style="width: 100%;" v-on:click="reloadHomey()" icon="refresh">&nbsp;&nbsp;Reload from {{ homeyName }}</q-btn>
                        </q-item><br>
                      </div>
                    </div>
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <q-table
                          title="Zones from Backup"
                          :data="rZonesAr"
                          :columns="zonesColumns"
                          selection="multiple"
                          :selected.sync="selectedZonesList"
                          row-key="id"
                          :pagination.sync="pagination"
                          :rows-per-page-options=[5,10,15]
                        /><br>
                        <q-item>
                          <q-btn color="red" style="width: 100%;" v-on:click="restoreSelectedZones()" icon="settings_backup_restore">&nbsp;&nbsp;Restore selected Zones</q-btn>
                        </q-item>
                        </div>
                      </div>
                    </div>
                </div>
                <div v-if="activetab === 5" class="tabcontent">
                <div class="row">
                  <div class="col-6 weather">
                    <div class="inner-content">
                      <q-table
                        title="Devices on Homey"
                        :data="devicesAr"
                        :columns="devicesColumns"
                        row-key="id"
                        :pagination.sync="pagination"
                        :rows-per-page-options=[5,10,15]
                      /><br>
                      <q-item>
                        <q-btn color="black" style="width: 100%;" v-on:click="reloadHomey()" icon="refresh">&nbsp;&nbsp;Reload from {{ homeyName }}</q-btn>
                      </q-item><br>
                    </div>
                  </div>
                  <div class="col-6 weather">
                    <div class="inner-content">
                      <q-table
                        title="Devices from Backup"
                        :data="rDevicesAr"
                        :columns="devicesColumns"
                        selection="multiple"
                        :selected.sync="selectedZonesList"
                        row-key="id"
                        :pagination.sync="pagination"
                        :rows-per-page-options=[5,10,15]
                      /><br>
                      <q-item>
                        <q-btn color="red" style="width: 100%;" v-on:click="restoreSelectedDevices()" icon="settings_backup_restore">&nbsp;&nbsp;Restore selected Devices</q-btn>
                      </q-item>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="activetab === 6" class="tabcontent">
                  <div class="row">
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <q-table
                          title="Folders on Homey"
                          :data="foldersAr"
                          :columns="foldersColumns"
                          row-key="id"
                          :pagination.sync="pagination"
                          :rows-per-page-options=[5,10,15]
                        /><br>
                        <q-item>
                          <q-btn color="black" style="width: 100%;" v-on:click="reloadHomey()" icon="refresh">&nbsp;&nbsp;Reload from {{ homeyName }}</q-btn>
                        </q-item><br>
                      </div>
                    </div>
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <q-table
                          title="Folders from Backup"
                          :data="rFoldersAr"
                          :columns="foldersColumns"
                          selection="multiple"
                          :selected.sync="selectedFoldersList"
                          row-key="id"
                          :pagination.sync="pagination"
                          :rows-per-page-options=[5,10,15]
                        /><br>
                        <q-item>
                          <q-btn color="red" style="width: 100%;" v-on:click="restoreSelectedFolders()" icon="settings_backup_restore">&nbsp;&nbsp;Restore selected Folders</q-btn>
                        </q-item>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="activetab === 7" class="tabcontent">
                  <div class="row">
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <q-table
                          title="Flows on Homey"
                          :data="flowsAr"
                          :columns="flowsColumns"
                          row-key="id"
                          :pagination.sync="pagination"
                          :rows-per-page-options=[5,10,15]
                        /><br>
                        <q-item>
                          <q-btn color="black" style="width: 100%;" v-on:click="reloadHomey()" icon="refresh">&nbsp;&nbsp;Reload from {{ homeyName }}</q-btn>
                        </q-item><br>
                      </div>
                    </div>
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <q-table
                          title="Flows from Backup"
                          :data="rFlowsAr"
                          :columns="flowsColumns"
                          selection="multiple"
                          :selected.sync="selectedFlowsList"
                          row-key="id"
                          :pagination.sync="pagination"
                          :rows-per-page-options=[5,10,15]
                        /><br>
                        <q-item>
                          <q-btn color="red" style="width: 100%;" v-on:click="restoreSelectedFlows()" icon="settings_backup_restore">&nbsp;&nbsp;Restore selected Flows</q-btn>
                        </q-item>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="activetab === 8" class="tabcontent">
                  <div class="row">
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <q-table
                          title="Tokens on Homey"
                          :data="tokensAr"
                          :columns="tokensColumns"
                          row-key="id"
                          :pagination.sync="pagination"
                          :rows-per-page-options=[5,10,15]
                        /><br>
                        <q-item>
                          <q-btn color="black" style="width: 100%;" v-on:click="reloadHomey()" icon="refresh">&nbsp;&nbsp;Reload from {{ homeyName }}</q-btn>
                        </q-item><br>
                      </div>
                    </div>
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <q-table
                          title="Tokens from Backup"
                          :data="rTokensAr"
                          :columns="tokensColumns"
                          selection="multiple"
                          :selected.sync="selectedTokensList"
                          row-key="id"
                          :pagination.sync="pagination"
                          :rows-per-page-options=[5,10,15]
                        /><br>
                        <q-item>
                          <q-btn color="red" style="width: 100%;" v-on:click="restoreSelectedTokens()" icon="settings_backup_restore">&nbsp;&nbsp;Restore selected Tokens</q-btn>
                        </q-item>
                      </div>
                    </div>
                  </div>
                </div>
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
import FileSelect from './FileSelect.vue'
import Grid from './Grid'
export default {
  props: {
    value: File
  },
  components: {
    FileSelect,
    Grid
  },
  data () {
    return {
      pagination: {
        sortBy: null, // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      alarmsColumns: [
        {
          name: 'desc',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        },
        {
          name: 'time',
          required: false,
          label: 'Time',
          align: 'left',
          field: 'time',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        },
        {
          name: 'repetition',
          required: false,
          label: 'Repetition',
          align: 'left',
          field: '_repetition',
          sortable: false,
          classes: 'my-class',
          style: 'width: 500px'
        }
      ],
      selectedAlarmsList: [],
      appsColumns: [
        {
          name: 'desc',
          required: true,
          label: 'Name',
          align: 'left',
          field: '_name',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        },
        {
          name: 'version',
          required: false,
          label: 'Version',
          align: 'left',
          field: 'version',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        },
        {
          name: 'channel',
          required: false,
          label: 'Channel',
          align: 'left',
          field: 'channel',
          sortable: false,
          classes: 'my-class',
          style: 'width: 500px'
        }
      ],
      selectedAppsList: [],
      zonesColumns: [
        {
          name: 'desc',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        },
        {
          name: 'id',
          required: false,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        }
      ],
      selectedZonesList: [],

      devicesColumns: [
        {
          name: 'desc',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        },
        {
          name: 'id',
          required: false,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        }
      ],
      selectedDevicesList: [],

      foldersColumns: [
        {
          name: 'desc',
          required: true,
          label: 'Title',
          align: 'left',
          field: 'title',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        },
        {
          name: 'id',
          required: false,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        }
      ],
      selectedFoldersList: [],

      flowsColumns: [
        {
          name: 'desc',
          required: true,
          label: 'Title',
          align: 'left',
          field: 'title',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        },
        {
          name: 'id',
          required: false,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        }
      ],
      selectedFlowsList: [],

      tokensColumns: [
        {
          name: 'desc',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        },
        {
          name: 'id',
          required: false,
          label: 'ID',
          align: 'left',
          field: 'id',
          sortable: true,
          classes: 'my-class',
          style: 'width: 500px'
        }
      ],
      selectedTokensList: [],

      homeyName: 'YourHomey',
      homeyMajorVersion: 0,
      restoreFile: null,
      activetab: 1,
      i18n: ['en', 'nl'],
      alarms: [],
      alarmsAr: [],
      rAlarms: [],
      rAlarmsAr: [],
      apps: [],
      appsAr: [],
      rApps: [],
      rAppsAr: [],
      zones: [],
      zonesAr: [],
      rZones: [],
      rZonesAr: [],
      devices: [],
      rDevices: [],
      devicesAr: [],
      rDevicesAr: [],
      folders: [],
      rFolders: [],
      foldersAr: [],
      rFoldersAr: [],
      flows: [],
      rFlows: [],
      flowsAr: [],
      rFlowsAr: [],
      tokens: [],
      rTokens: [],
      tokensAr: [],
      rTokensAr: []
    }
  },
  mounted () {
  },
  methods: {
    loadRestoreFile (f) {
      var zipContents
      console.log('filename:' + f.name)
      // loadTextFromFile (f) { }

      var backUpInfo = null
      const file = f
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = f => {
        zipContents = f.target.result
        console.log(zipContents)
        var zip = new JSZip()
        var blob = new Blob([zipContents], { type: 'application/zip' })
        zip.loadAsync(blob).then((zip) => {
        // console.log('blob', blob)
          zip.forEach((relativePath, zipEntry) => {
            zipEntry.async('string').then((content) => {
              console.log(relativePath, zipEntry.name, content.length)
              switch (zipEntry.name.toLowerCase()) {
                case 'backupinfo.json':
                  // code block
                  backUpInfo = JSON.parse(content)
                  break
                case 'alarms.json':
                  //
                  this.rAlarms = JSON.parse(content)
                  this.rAlarmsAr = Object.values(this.rAlarms)
                  _(this.rAlarmsAr).forEach(function (alarm) { alarm._repetition = JSON.stringify(alarm.repetition) })
                  break
                case 'apps.json':
                  this.rApps = JSON.parse(content)
                  this.rAppsAr = Object.values(this.rApps)
                  _(this.rAppsAr).forEach(function (app) { app._name = app.name.en })
                  break
                case 'zones.json':
                  this.rZones = JSON.parse(content)
                  this.rZonesAr = Object.values(this.rZones)
                  // _(this.rAppsAr).forEach(function (app) { app._name = app.name.en })
                  break
                case 'devices.json':
                  this.rDevices = JSON.parse(content)
                  this.rDevicesAr = Object.values(this.rDevices)
                  // _(this.rDevicesAr).forEach(function (app) { app._name = app.name.en })
                  break
                case 'folders.json':
                  this.rFolders = JSON.parse(content)
                  this.rFoldersAr = Object.values(this.rFolders)
                  _(this.rFoldersAR).forEach(function (app) {
                    app._name = app.name.en
                  })
                  break
                case 'flows.json':
                  this.rFlows = JSON.parse(content)
                  this.rFlowsAr = Object.values(this.rFlows)
                  // _(this.rFoldersAr).forEach(function (app) { app._name = app.name.en })
                  break
                case 'tokens.json':
                  this.rTokens = JSON.parse(content)
                  this.rTokensAr = Object.values(this.rTokens)
                  // _(this.rTokensAr).forEach(function (app) { app._name = app.name.en })
                  break
                default:
                  // code block
              }

              if ((backUpInfo != null) && (this.rFolders != null) && (this.rFlows != null) && !this.rAlarms && !this.rApps && !this.rZones && !this.rDevices && !this.rTokens) {
                // callback(new BackUp(backUpInfo, folders, flows));
              }
            })
          })
        })
      }
    },
    handleFileChange1 (ev) {
      //       var blob = new Blob([zipContents], { type: 'application/zip' })
      // var byteArray = new Uint8Array(zipContents)
      // var stringArray = Uint8ToString(byteArray);
      // console.log(flows)
      // this.$emit('input', e.target.files[0])
    },
    logoffHomey () {
      this.$athomCloud.logout()
      this.$router.go()
    },
    async reloadHomey () {
      var homeyMajorVersion = 2
      // var system = []
      let system = await this.$homey.system.getInfo()
      this.homeyName = system.hostname
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

      this.alarms = await this.$homey.alarms.getAlarms()
      this.alarmsAr = Object.values(this.alarms)
      _(this.alarmsAr).forEach(function (alarm) { alarm._repetition = JSON.stringify(alarm.repetition) })

      this.apps = await this.$homey.apps.getApps()
      this.appsAr = Object.values(this.apps)
      _(this.appsAr).forEach(function (app) { app._name = app.name.en })
      // console.log('apps  ', JSON.stringify(this.apps))
      // console.log('alarms Ar', JSON.stringify(this.alarmsAr))

      this.zones = await this.$homey.zones.getZones()
      this.zonesAr = Object.values(this.zones)
      // _(this.appsAr).forEach(function (app) { app._name = app.name.en })

      this.devices = await this.$homey.devices.getDevices()
      this.devicesAr = Object.values(this.devices)
      // _(this.appsAr).forEach(function (app) { app._name = app.name.en })

      this.flows = await this.$homey.flow.getFlows()
      this.flowsAr = Object.values(this.flows)
      // _(this.flowsA).forEach(function (app) { app._name = app.name.en })

      this.flows = await this.$homey.flow.getFlows()
      if (homeyMajorVersion === 1) {
        this.folders = await this.$homey.flow.getFolders()
        this.tokens = await this.$homey.flow.getTokens()
      } else {
        this.folders = await this.$homey.flow.getFlowFolders()
        this.tokens = await this.$homey.flowToken.getFlowTokens()
      }
      this.foldersAr = Object.values(this.folders)
      // _(this.appsAr).forEach(function (app) { app._name = app.name.en })
      this.tokensAr = Object.values(this.tokens)
      // _(this.appsAr).forEach(function (app) { app._name = app.name.en })

      // console.log(JSON.stringify(this.flows))
      // console.log(folders)
    },

    async restoreSelectedAlarms () {
      console.log(JSON.stringify(this.selectedAlarmsList))
      let that = this
      _(this.selectedAlarmsList).forEach(function (alarm) {
        console.log(alarm.name)
        let result = that.$homey.alarms.createAlarm({alarm: alarm})
        console.log(result)
      })
    },
    async restoreSelectedApps () {
      console.log(JSON.stringify(this.selectedAppsList))
      let that = this
      _(this.selectedAppsList).forEach(function (app) {
        console.log(app.name)
        // installAppById
        // let result = that.$homey.apps.installFromAppStore({id: app.id, channel: app.channel})
        let result = that.$homey.apps.installAppById({id: app.id, channel: app.channel})
        console.log(result)
      })
    },
    async restoreSelectedZones () {
      console.log(JSON.stringify(this.selectedAppsList))
      let that = this
      _(this.selectedAppsList).forEach(function (app) {
        console.log(app.name)
        // installAppById
        // let result = that.$homey.apps.installFromAppStore({id: app.id, channel: app.channel})
        let result = that.$homey.apps.installAppById({id: app.id, channel: app.channel})
        console.log(result)
      })
    },

    async debugHomey () {
      console.log(JSON.stringify(this.selectedAlarmsList))
      let that = this
      _(this.selectedList).forEach(function (alarm) {
        console.log(alarm.name)
        let result = that.$homey.alarms.createAlarm({alarm: alarm})
        console.log(result)
      })
    },
    async createFullBackUp () {
      this.message = this.message.split('').reverse().join('')
      var homeyMajorVersion = 0
      let system = await this.$homey.system.getInfo()

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

      this.flows = await this.$homey.flow.getFlows()
      this.apps = await this.$homey.apps.getApps()
      console.log(this.apps)
      this.zones = await this.$homey.zones.getZones()
      this.devices = await this.$homey.devices.getDevices()
      this.alarms = await this.$homey.alarms.getAlarms()
      if (homeyMajorVersion === 1) {
        this.folders = await this.$homey.flow.getFolders()
        this.tokens = await this.$homey.flow.getTokens()
      } else {
        this.folders = await this.$homey.flow.getFlowFolders()
        this.tokens = await this.$homey.flowToken.getFlowTokens()
      }
      // console.log(JSON.stringify(this.flows))
      // console.log(folders)

      var zip = new JSZip()
      zip.file('backUpInfo.json', JSON.stringify({
        backUpDate: new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)),
        backUpVersion: 3,
        homeyName: system.hostname
      }))
      zip.file('system.json', JSON.stringify(this.system))
      zip.file('folders.json', JSON.stringify(this.folders))
      zip.file('flows.json', JSON.stringify(this.flows))
      zip.file('apps.json', JSON.stringify(this.apps))
      zip.file('zones.json', JSON.stringify(this.zones))
      zip.file('devices.json', JSON.stringify(this.devices))
      zip.file('alarms.json', JSON.stringify(this.alarms))
      zip.file('tokens.json', JSON.stringify(this.tokens))
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
/* RESET */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
    max-width: 1420px;
    min-width: 420px;
    margin: 40px auto;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9em;
    color: #0;
}

/* Style the tabs */
.tabs {
    overflow: hidden;
  margin-left: 20px;
    margin-bottom: -2px; // hide bottom border
}

.tabs ul {
    list-style-type: none;
    margin-left: 20px;
}

.tabs a{
    float: left;
    cursor: pointer;
    padding: 12px 24px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    border-right: none;
    background-color: #f1f1f1;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
}
.tabs a:last-child {
    border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
    background-color: #aaa;
    color: #fff;
}

/* Styling for active tab */
.tabs a.active {
    background-color: #fff;
    color: #484848;
    border-bottom: 2px solid #fff;
    cursor: default;
}

/* Style the tab content */
.tabcontent {
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1
}
</style>
