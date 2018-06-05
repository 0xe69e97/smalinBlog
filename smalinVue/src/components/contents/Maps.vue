<template>
    <div id = "map">
    </div>
</template>

<script>
export default {
  name: "Maps",
  data() {
    return {
      map: null,
      latLng: null,
    };
  },
  methods: {
    showPosition(position) {
      var lat = position.coords.latitude; //纬度
      var lag = position.coords.longitude; //经度
      this.latLng = [lat, lag];
      L.marker(this.latLng).addTo(this.map).bindPopup('你在这!')
    .openPopup();;
      this.map.setView(this.latLng, this.map.getZoom());
    },
    showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("定位失败,用户拒绝请求地理定位");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("定位失败,位置信息是不可用");
          break;
        case error.TIMEOUT:
          console.log("定位失败,请求获取用户位置超时");
          break;
        case error.UNKNOWN_ERROR:
          console.log("定位失败,定位系统失效");
          break;
      }
    }
  },
  mounted() {
    // debugger
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.showPosition,
        this.showError
      );
    } else {
      alert("浏览器不支持地理定位。");
    }
    this.map = L.map("map", {
      center: [39.89945, 116.40769],
      zoom: 9
    });
    // L.tileLayer(
    //   `https://api.mapbox.com/styles/v1/smalin0020/cjd587s9c14qk2rvhrgxp3rtd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic21hbGluMDAyMCIsImEiOiJjamQzd2tqNDQwOGF2MndxcmRscm1zOHUwIn0.t4JONh4lXUzCuNcUgg8lJQ`
    // ).addTo(this.map);
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ).addTo(this.map);

    // let geoJson = null;
    L.geoJSON(bj, {
    style: function (feature) {
        return {color: feature.properties.color};
    }
}).bindPopup(function (layer) {
    return layer.feature.properties.description;
}).addTo(this.map);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
