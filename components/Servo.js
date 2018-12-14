
class Servo extends Component{
    constructor(color, offset, rotation) {
        super(color, offset, rotation);

        this.connectPos = new THREE.Vector3(0, 0, 4);

        var rotorGeom = new THREE.CylinderGeometry(3, 3, 4, 16);
        rotorGeom.rotateX(0.5 * Math.PI);
        rotorGeom.translate(0, 0, 4);
        var material = new THREE.MeshPhongMaterial( {color: this.color})
        this.mesh = new THREE.Mesh(rotorGeom, material);

        var holderGeom = new THREE.CylinderGeometry(3, 3, 4, 16);
        holderGeom.rotateX(0.5 * Math.PI);
        this.holderMesh = new THREE.Mesh(holderGeom, material);
    }

    rotate(delta) {
        this.mesh.rotation.z += delta;
    }

    onAdd(parent) {
        super.onAdd(parent);
        parent.mesh.add(this.holderMesh)

        this.holderMesh.position.set(
            parent.connectPos.x + this.offset.x,
            parent.connectPos.y + this.offset.y,
            parent.connectPos.z + this.offset.z);
        this.holderMesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }

    onRemove(parent) {
        parent.mesh.remove(this.holderMesh);
    }

    getVars() {
        var vars = super.getVars();
        vars.servoColor = numToHexColor(this.color);

        return vars;
    }

    setVars(vars) {
        super.setVars(vars);

        if (vars.servoColor) {
            this.color = hexToNumColor(vars.servoColor);
        }
    }

    applyVars() {
        super.applyVars();

        this.holderMesh.position.set(
            this.parent.connectPos.x + this.offset.x,
            this.parent.connectPos.y + this.offset.y,
            this.parent.connectPos.z + this.offset.z);
        this.holderMesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }
}
