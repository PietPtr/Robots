
class Servo extends Component{
    constructor(color, offset, rotation) {
        super(color, offset, rotation);

        var geometry = new THREE.CylinderGeometry(3, 3, 5, 16);
        geometry.rotateX(0.5 * Math.PI);
        var material = new THREE.MeshPhongMaterial( {color: this.color})
        this.mesh = new THREE.Mesh(geometry, material);
    }

    rotate(delta) {
        this.mesh.rotation.z += delta;
    }
}
