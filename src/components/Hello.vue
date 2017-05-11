<template>
  <div class="hello">
    <div class="bar">
      <br>
      <h2> &nbsp;&nbsp;&nbsp; FITM WIFI Monitoring</h2>
    </div>
    <div class="left">
      <h1>Scanwifi</h1><hr>
      <div v-for="show in data">
        <h4>name :         {{show.ssid}}        </h4>
        <h4>mac Address :  {{show.mac}}         </h4>
        <progress :value="(100+show.rssi)" max="100" class="rssi"></progress>
        <h4>rssi :         {{show.rssi}}     dBm</h4>
        <h4>Channel :      {{show.channel}}     </h4>
        <hr>
      </div>
    </div>
    <div class="right">
      <h1>Monitor Access Point</h1>
      AP1: <B>{{data2[40].port}}</B>&emsp;AP2: <B>{{data2[41].port}}</B>&emsp;AP3: <B>{{data2[42].port}}</B>&emsp;
      AP4: <B>{{data2[43].port}}</B>&emsp;AP5: <B>{{data2[44].port}}</B>&emsp;AP6: <B>{{data2[45].port}}</B>&emsp;AP7: <B>{{data2[46].port}}</B>&emsp;AP8: <B>{{data2[47].port}}</B><hr>
      <div>
        <div class="content">
          <h2>AP1</h2><br>
          Port:&emsp;&emsp;{{data2[40].int}} <br>
          Status:&emsp;{{data2[40].port}} <br>
          UpTime:&emsp; {{data2[40].time}} <br>
          Inbound:&emsp;{{data2[40].inbound}} <br>
          Outbound: {{data2[40].outbound}} <br><hr>
        </div>
        <div class="content">
          <h2>AP2</h2><br>
          Port:&emsp;&emsp;{{data2[41].int}} <br>
          Status:&emsp;{{data2[41].port}} <br>
          UpTime:&emsp; {{data2[41].time}} <br>
          Inbound:&emsp;{{data2[41].inbound}} <br>
          Outbound: {{data2[41].outbound}} <br><hr>
        </div>
        <div class="content">
          <h2>AP3</h2><br>
          Port:&emsp;&emsp;{{data2[42].int}} <br>
          Status:&emsp;{{data2[42].port}} <br>
          UpTime:&emsp; {{data2[42].time}} <br>
          Inbound:&emsp;{{data2[42].inbound}} <br>
          Outbound: {{data2[42].outbound}} <br><hr>
        </div>
        <div class="content">
          <h2>AP4</h2><br>
          Port:&emsp;&emsp;{{data2[43].int}} <br>
          Status:&emsp;{{data2[43].port}} <br>
          UpTime:&emsp; {{data2[43].time}} <br>
          Inbound:&emsp;{{data2[43].inbound}} <br>
          Outbound: {{data2[43].outbound}} <br><hr>
        </div>
        <div class="content">
          <h2>AP5</h2><br>
          Port:&emsp;&emsp;{{data2[44].int}} <br>
          Status:&emsp;{{data2[44].port}} <br>
          UpTime:&emsp; {{data2[44].time}} <br>
          Inbound:&emsp;{{data2[44].inbound}} <br>
          Outbound: {{data2[44].outbound}} <br><hr>
        </div>
        <div class="content">
          <h2>AP6</h2><br>
          Port:&emsp;&emsp;{{data2[45].int}} <br>
          Status:&emsp;{{data2[45].port}} <br>
          UpTime:&emsp; {{data2[45].time}} <br>
          Inbound:&emsp;{{data2[45].inbound}} <br>
          Outbound: {{data2[45].outbound}} <br><hr>
        </div>
        <div class="content">
          <h2>AP7</h2><br>
          Port:&emsp;&emsp;{{data2[46].int}} <br>
          Status:&emsp;{{data2[46].port}} <br>
          UpTime:&emsp; {{data2[46].time}} <br>
          Inbound:&emsp;{{data2[46].inbound}} <br>
          Outbound: {{data2[46].outbound}} <br><hr>
        </div>
        <div class="content">
          <h2>AP8</h2><br>
          Port:&emsp;&emsp;{{data2[47].int}} <br>
          Status:&emsp;{{data2[47].port}} <br>
          UpTime:&emsp; {{data2[47].time}} <br>
          Inbound:&emsp;{{data2[47].inbound}} <br>
          Outbound: {{data2[47].outbound}} <br><hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      data: [],
      data2: []
    }
  },
  mounted () {
    var vm = this
    setInterval(function () {
      axios.get('http://localhost:4000/scan').then(res => {
        vm.data = res.data
      })
      axios.get('http://localhost:4000/AP').then(res => {
        vm.data2 = res.data
      })
    }, 5000)
    console.log(vm.data2)
  },
}
</script>

<style>
  .bar {
    color: white;
    height: 15vh;
    background-color: #01579b;
    margin-bottom: 5vh;
  }
  .left {
    float: left;
    width: 25%;
    padding-left: 2%
  }
  .right {
    float: left;
    width: 70%;
    padding-left: 3%;
  }
  .content {
    float: left;
    width: 49%;
    /*padding-left: %;*/
  }
.rssi {
  background-color: blue;
}
</style>
