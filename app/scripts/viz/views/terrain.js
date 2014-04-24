define([
  'scripts/common/views/three-base',
  'three',
  'terrainLoader',
  'trackballControls'
], function(ThreeBaseView, THREE) {

  return ThreeBaseView.extend({

     webglEl: '#webgl',

    _terrainData: null,

    config: {
      camera: {
        fov: 45,
        aspect: 1,
        near: 0.1,
        far: 10000
      }
    },

    initialize: function() {
      var terrainLoader;

      ThreeBaseView.prototype.initialize.apply(this, arguments);

      terrainLoader = new THREE.TerrainLoader();
      terrainLoader.load('images/dembathy.bin',
        _.bind(this.onTerrainData, this));
    },

    initThree: function() {
      ThreeBaseView.prototype.initThree.apply(this, arguments);

      this._renderer.setClearColor(0x7BB5FF);
      this._camera.position.set(0, -100, 50);
      this._controls = new THREE.TrackballControls(this._camera);

      this.initMaterials();
      this.initLighting();
    },

    onTerrainData: function(data) {
      this._terrainData = data;
      this.initGeometries();
      this.render();
    },

    initMaterials: function() {
      this._terrainMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/tahoe_texture.jpg')
      });
    },

    initLighting: function() {

      // ambient light
      this._ambientLight = new THREE.AmbientLight(0xffffff, 1);
      this._scene.add(this._ambientLight);
    },

    initGeometries: function() {
      this._terrainGeometry = new THREE.PlaneGeometry(100, 240, 174, 420);
      this._terrainGeometry.vertices =
        _.map(this._terrainGeometry.vertices, function(vertex, i) {
          vertex.z = this._terrainData[i] / 65535 * 9.449;
          return vertex;
        }, this);

      this._terrain = new THREE.Mesh(this._terrainGeometry,
        this._terrainMaterial);
      this._scene.add(this._terrain);
    },

    updateControls: function(controls) {
      controls.update();
    },

    getIntersections: function() {}
  });
});