<template>
<q-page>
  <transition appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut">
      <div class="col-6 weather">
        <div class="inner-content">
        <div>
          <p><file-select v-model="file"></file-select></p>
          <p v-if="file"></p>
        </div>
        <button v-on:click="logoffHomey">LogOff from Homey</button><br>
        <div id="tabs" class="container">
            <div class="tabs">
                <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]">Backup All</a>
                <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]">Restore Folders</a>
                <a v-on:click="activetab=3" v-bind:class="[ activetab === 3 ? 'active' : '' ]">Restore Zones</a>
                <a v-on:click="activetab=4" v-bind:class="[ activetab === 4 ? 'active' : '' ]">Restore Devices</a>
                <a v-on:click="activetab=5" v-bind:class="[ activetab === 5 ? 'active' : '' ]">Restore Flows</a>
                <a v-on:click="activetab=6" v-bind:class="[ activetab === 6 ? 'active' : '' ]">Restore Alarms</a>
                <a v-on:click="activetab=7" v-bind:class="[ activetab === 7 ? 'active' : '' ]">Restore Tokens</a>
            </div>
            <div class="content">
                <div v-if="activetab === 1" class="tabcontent">
                <h4>Backup</h4>Het gebruik van deze app is op eigen risico.<br>
                Er is nauwelijks een risico bij het maken van back-ups, maar bij het terugzetten van flows bestaat het risico wel.<br>De auteur van deze app levert geen ondersteuning wanneer flows corrupt raken.<br>Deze app kan niet bij je apparaten. Wanneer je een flow terugzet, kunnen missende en/of opnieuw toegevoegde apparaten leiden tot gebroken flows.<br><br>
                Athom ondersteunt deze manier van back-ups en restores niet.<br><br><br>
                <div id="app-5">
                  <p>{{ message }}</p>
                  <button v-on:click="createFullBackUp">Create Full Backup</button><br><br>
                  </div>
                  </div>
                <div v-if="activetab === 2" class="tabcontent">
                  <div class="row">
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <h4>Today1</h4><br>
                        <grid :data="gridData" :columns="gridColumns"></grid>
                      </div>
                    </div>
                    <div class="col-6 weather">
                      <div class="inner-content">
                        <h4>Forecast</h4><br>
                        <grid :data="gridData" :columns="gridColumns"></grid>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="activetab === 3" class="tabcontent">
                    Content for tab three
                </div>
                <div v-if="activetab === 4" class="tabcontent">
                    Content for tab 4
                </div>
                <div v-if="activetab === 5" class="tabcontent">
                    Content for tab 5
                </div>
                <div v-if="activetab === 6" class="tabcontent">
                    Content for tab 6
                </div>
                <div v-if="activetab === 7" class="tabcontent">
                    tbd Restore of Tokens
                </div>
            </div>
        </div>
      </div>
    </div>
  </transition>
</q-page>
</template>

<script>
import FileSelect from './FileSelect.vue'
import Grid from './Grid'
export default {
  components: {
    FileSelect,
    Grid
  },
  data () {
    return {
      file: null,
      activetab: 1,
      message: 'Hello Vue.js!',
      flows: '',
      folders: '',
      gridData: [
        { name: 'American alligator', location: 'Southeast United States' },
        { name: 'Chinese alligator', location: 'Eastern China' },
        { name: 'Spectacled caiman', location: 'Central & South America' },
        { name: 'Broad-snouted caiman', location: 'South America' },
        { name: 'Jacaré caiman', location: 'South America' },
        { name: 'Black caiman', location: 'South America' }
      ],
      gridColumns: ['name', 'location']
    }
  },
  mounted () {
  },
  methods: {
    logoffHomey () {
      this.$athomCloud.logout()
      this.$router.go()
    },
    async createFullBackUp () {
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
  },
  name: 'app'
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
    max-width: 1220px;
    min-width: 420px;
    margin: 40px auto;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9em;
    color: #888;
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
