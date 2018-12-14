
class Arm extends Component{
    constructor(color, length, offset, rotation) {
        super(color, offset, rotation);


        this.length = length;
        this.standardOffset = new THREE.Matrix4().makeTranslation(0, this.length / 2, 0)
        this.connectPos = new THREE.Vector3(0, this.length, 0);

        var geometry = this.generateGeometry()//new THREE.CylinderGeometry( 2, 2, this.length, 16 );
        // geometry.applyMatrix(this.standardOffset);
        var material = new THREE.MeshPhongMaterial( {color: this.color} );
        this.mesh = new THREE.Mesh( geometry, material );
    }

    getVars() {
        var vars = super.getVars();
        vars.armColor = numToHexColor(this.color);
        vars.armLength = this.length;

        return vars;
    }

    setVars(vars) {
        super.setVars(vars);
        if (vars.armColor && vars.armLength) {
            this.color = hexToNumColor(vars.armColor);
            this.length = parseFloat(vars.armLength);
        }
    }

    applyVars() {
        this.connectPos = new THREE.Vector3(0, this.length, 0);

        this.mesh.geometry = this.generateGeometry();

        for (var child of this.childComponents) {
            child.originalPosition.set(this.connectPos.x, this.connectPos.y, this.connectPos.z);
            child.applyVars();
        }

        super.applyVars();
    }

    generateGeometry() {
        var geometry = new THREE.CylinderGeometry(2, 2, this.length, 16);
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, this.length / 2, 0))
        return geometry
    }
}
