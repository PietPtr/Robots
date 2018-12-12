
class Arm extends Component{
    constructor(color, length, offset, rotation) {
        super(color, offset, rotation);


        this.length = length;
        this.standardOffset = new THREE.Matrix4().makeTranslation(0, this.length / 2, 0)
        this.connectPos = new THREE.Vector3(0, this.length, 0);

        var geometry = new THREE.CylinderGeometry( 2, 2, this.length, 16 );
        geometry.applyMatrix(this.standardOffset);
        var material = new THREE.MeshPhongMaterial( {color: this.color} );
        this.mesh = new THREE.Mesh( geometry, material );
    }
}
