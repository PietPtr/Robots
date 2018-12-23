
class Root extends Component{
    constructor(args) {
        super(args);
        var color = args.color;

        this.color = color;

        var geometry = new THREE.SphereGeometry(2, 32, 32);
        var material = new THREE.MeshPhongMaterial( {color: this.color });
        this.mesh = new THREE.Mesh(geometry, material);
    }

    getVars() {
        var vars = super.getVars();
        vars.rootColor = numToHexColor(this.color);
        return vars;
    }

    setVars(vars) {
        super.setVars(vars);

        if (vars.rootColor) {
            this.color = hexToNumColor(vars.rootColor);
        }
    }

    toJSON() {
        var json = super.toJSON();
        json.type = "Root";
        json.args.color = this.color;
        return json;
    }
}
