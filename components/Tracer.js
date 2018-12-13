
class Tracer extends Component{
    constructor(color, max, offset, rotation) {
        super(color, offset, rotation)

        this.color = color;
        this.max = max;
        this.points = [];
        this.name = "line" + Math.random() * 100000;

        var geometry = new THREE.SphereGeometry(2.9, 32, 32);
        var material = new THREE.MeshPhongMaterial( {color: this.color });
        this.mesh = new THREE.Mesh(geometry, material);
    }

    update() {
        if (this.points.length >= this.max) {
            this.points.shift()
        }

        var worldPos = new THREE.Vector3();
        worldPos.setFromMatrixPosition(this.mesh.matrixWorld);
        this.points.push(worldPos);

    }

    draw() {
        var geometry = new THREE.Geometry();
        var material = new THREE.LineBasicMaterial({ color: this.color, linewidth: 10 });
        geometry.vertices = this.points;
        this.line = new THREE.Line(geometry, material)
        this.line.name = this.name
        scene.remove(scene.getObjectByName(this.name));
        scene.add(this.line);
    }

    getVars() {
        var vars = super.getVars();
        vars.tracerColor = this.color;
        vars.tracerLength = this.max;

        return vars;
    }
}
