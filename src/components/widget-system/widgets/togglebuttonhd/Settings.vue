<template>
  <div class="col-12">
    <q-list no-border>
      <q-item tag="label">
        <q-item-main>
          <q-input stack-label="Title" placeholder="Your title here e.g. Light" dark color="teal" v-model="widget.settings.name" />
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-item-tile label>Show Room</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-toggle dark color="teal" v-model="widget.settings.room" />
        </q-item-side>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-select filter filter-placeholder="Search device..." dark v-model="widget.settings.onoff" :options="toggledevices" stack-label="Select which onoff or button device to show" />
        </q-item-main>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-uploader dark color="teal" stack-label="Upload SVG icon" :url="'/'" :extensions="'.svg'" no-thumbnails hide-upload-button hide-upload-progress :headers="{'content-type': 'image/svg+xml' }" :send-raw="true" @add="added" />
        </q-item-main>
        <q-item-side right>
          <div id="preview" v-bind:style="{ maskImage: 'url(' + this.widget.settings.icon + ')' }"></div>
          <div class="previewtitle">Icon Preview</div>
        </q-item-side>
      </q-item>
      <q-list-header>Colors</q-list-header>
      <q-item tag="label">
        <q-item-main>
          <q-item-tile label>Off Color</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-color dark color="teal" v-model="widget.settings.offcolor" />
        </q-item-side>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-item-tile label>On Color</q-item-tile>
        </q-item-main>
        <q-item-side right>
          <q-color dark color="teal" v-model="widget.settings.oncolor" />
        </q-item-side>
      </q-item>
      <q-item tag="label">
        <q-item-main>
          <q-input dark v-model="widget.width" type="number" stack-label="Widget Width" />
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: ['widget'],
  data () {
    return {
      toggledevices: []
    }
  },
  created () {
    this.getToggleDevices()
  },
  methods: {
    async getToggleDevices () {
      let devices = await this.$homey.devices.getDevices()
      _.forEach(devices, device => {
        if (device.capabilities.onoff || device.capabilities.button) {
          this.toggledevices.push({
            label: device.name,
            sublabel: device.zone.name,
            value: device.id
          })
        }
      })
    },
    added (files) {
      var file = files[0]
      var reader = new FileReader()

      reader.addEventListener('load', () => {
        this.widget.settings.icon = reader.result
      }, false)

      if (file) {
        reader.readAsDataURL(file)
      }
    }
  }
}
</script>

<style lang="stylus">
  #preview
    display: block
    width: auto
    height: auto
    min-height: 75px
    min-width: 75px
    background-color: #fff
    margin-left: 20px
    -webkit-mask-position center center
    mask-position center center
    -webkit-mask-repeat no-repeat
    mask-repeat no-repeat
    -webkit-mask-size auto 60px
    mask-size auto 60px

  .previewtitle
    background-color: #009688
    color: #fff
    text-align: center
    border-radius: 5px
    margin-top: 6px
    margin-left: 20px
    padding: 4px 8px
</style>
