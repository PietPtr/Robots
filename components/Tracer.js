
class Tracer extends Component{
    constructor(args) {
        super(args);
        var color = args.color;
        var max = args.max;

        this.color = color;
        this.max = max;
        this.points = [];

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
        vars.tracerColor = numToHexColor(this.color);
        vars.tracerLength = this.max;
        return vars;
    }

    setVars(vars) {
        super.setVars(vars);

        if (vars.tracerColor && vars.tracerLength) {
            this.color = hexToNumColor(vars.tracerColor);
            this.max = parseFloat(vars.tracerLength);
        }
    }

    toJSON() {
        var json = super.toJSON();
        json.type = "Tracer";
        json.args.color = this.color;
        json.args.max = this.max;
        return json;
    }
}
