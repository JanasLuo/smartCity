/*
 * @Descripttion:
 * @version:
 * @Author: luolei
 * @Date: 2021-04-22 14:36:09
 * @LastEditors: luolei
 * @LastEditTime: 2021-04-22 14:40:22
 */
(function () {
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ODRlYzNmMS0yNDIwLTQ2NmMtYTc3Zi0wMzM4NmQ0YjYzMTIiLCJpZCI6MzA5NjgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTQ2NDk0OTJ9.Zv-IGFXrfy8a1gJmwGBqgXEZAuNKJ-UGcjjDy-Mbass';
  var viewer = new Cesium.Viewer('cesiumContainer', {
    scene3DOnly: true,
    selectionIndicator: false,
    baseLayerPicker: false
  });
  viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
  var url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({ url }));
  viewer.scene.globe.enableLighting = true;

  // Create an initial camera view
  // var initialPosition = new Cesium.Cartesian3.fromDegrees(113.954422, 30.920587, 2631.082799425431); // 孝感
  // var initialPosition = new Cesium.Cartesian3.fromDegrees(114.29797053337097, 30.50787510375684, 6631.082799425431); // 武汉
  var initialPosition = new Cesium.Cartesian3.fromDegrees(121.5021463849818, 31.236440277115648, 6631.082799425431); // 上海
  var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(0.1077496389876024807, -30.987223091598949054, 0.025883251314954971306);
  var homeCameraView = {
    destination: initialPosition,
    orientation: {
      heading: initialOrientation.heading,
      pitch: initialOrientation.pitch,
      roll: initialOrientation.roll
    }
  };
  // Set the initial view
  viewer.scene.camera.setView(homeCameraView);

  // Add some camera flight animation options
  homeCameraView.duration = 2.0;
  homeCameraView.maximumHeight = 2000;
  homeCameraView.pitchAdjustHeight = 2000;
  homeCameraView.endTransform = Cesium.Matrix4.IDENTITY;
  // Override the default home button
  viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
    e.cancel = true;
    viewer.scene.camera.flyTo(homeCameraView);
  });

  // Set up clock and timeline.
  viewer.clock.shouldAnimate = true; // default
  viewer.clock.startTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
  viewer.clock.stopTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:20:00Z");
  viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
  viewer.clock.multiplier = 2; // sets a speedup
  viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER; // tick computation mode
  viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // loop at the end
  viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime); // set

  var tileset = new Cesium.Cesium3DTileset({
    url: '/output/sh-fbx/tileset.json'//改成你自己的服务地址
  });
  viewer.scene.primitives.add(tileset);

  viewer.zoomTo(tileset)

}());
