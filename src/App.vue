<template>
  <div class="box">
    <h3>Bing数码商城</h3>
    <div>
      <span>热门城市：</span>
      <select v-model="city_id" @change="changeCity">
        <option value="0">选择城市</option>
        <option v-for="(item, index) in city" :value="item.code" :key="index">{{ item.name }}</option>
      </select>
      &nbsp;
      <select v-model="area_id">
        <option value="0">选择区县</option>
        <option v-for="(item, index) in areaList" :value="item" :key="index">{{ item }}</option>
      </select>
    </div>
  </div>
  <div id="container"></div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, shallowRef } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { $get } from "../utils/request"
let map = shallowRef(null);

const city = ref([])
const city_id = ref('0')
const area_id = ref('0')
const areaList = ref([])
const getCityList = async () => {
  const res = await $get("/api/aj/getcitycode")
  city.value = res.result.hotcity
}

const changeCity = async () => {
  areaList.value = []
  const res = await $get('/api/aj/get_area',{
    citycode: city_id.value
  })
  for (const key in res.result) {
    areaList.value.push(res.result[key])
  }
  console.log(areaList.value);
  
}

onMounted(() => {
  window._AMapSecurityConfig = {
    securityJsCode: "cfb68be80cdc244a91270053407369b3",
  };
  AMapLoader.load({
    key: "a0c0fae218ec9fde6255ab61a432f1a8", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map.value = new AMap.Map("container", {
        // 设置地图容器id
        viewMode: "3D", // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
      });
    })
    .catch((e) => {
      console.log(e);
    });

  getCityList()
});

onUnmounted(() => {
  map.value?.destroy();
});
</script>
<style scoped>
#container {
  padding: 0px;
  margin: 5px;
  box-sizing: border-box;
  width: 100%;
  height: 680px;
}

.box {
  margin: 5px;
  padding: 5px;
  border: 1px solid #cccccc;
}

.box h3 {
  color: #ccc
}
</style>
