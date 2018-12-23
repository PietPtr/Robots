
class Component {
    constructor(args) {
        var offset = args.offset;
        var rotation = args.rotation;

        this.parent = undefined;
        this.offset = (offset === undefined) ? new THREE.Vector3(0, 0, 0) : offset;
        this.rotation = (rotation === undefined) ? new THREE.Vector3(0, 0, 0) : rotation;
        this.connectPos = new THREE.Vector3(0, 0, 0);
        this.originalPosition = new THREE.Vector3(0, 0, 0);
        this.mesh = undefined;
        this.parent = undefined;
        this.childComponents = []
    }

    add(component) {
        component.originalPosition = new THREE.Vector3(this.connectPos.x, this.connectPos.y, this.connectPos.z);
        component.parent = this;
        component.applyVars();

        this.mesh.add(component.mesh);
        component.onAdd(this);

        this.childComponents.push(component);
    }

    remove(component) {
        this.mesh.remove(component.mesh);
        component.onRemove(this);
    }

    onAdd(parent) {

    }

    onRemove(parent) {

    }

    getVars() {
        return {
            "offsetx": this.offset.x,
            "offsety": this.offset.y,
            "offsetz": this.offset.z,
            "rotx": this.rotation.x * 180 / Math.PI,
            "roty": this.rotation.y * 180 / Math.PI,
            "rotz": this.rotation.z * 180 / Math.PI
        }
    }

    setVars(vars) {
        if (vars.offsetx && vars.offsety && vars.offsetz && vars.rotx && vars.roty && vars.rotz) {
            this.offset.x = parseFloat(vars.offsetx);
            this.offset.y = parseFloat(vars.offsety);
            this.offset.z = parseFloat(vars.offsetz);
            this.rotation.x = parseFloat(vars.rotx) * Math.PI / 180;
            this.rotation.y = parseFloat(vars.roty) * Math.PI / 180;
            this.rotation.z = parseFloat(vars.rotz) * Math.PI / 180;
        }
    }

    applyVars() {
        this.mesh.position.set(
            this.originalPosition.x + this.offset.x,
            this.originalPosition.y + this.offset.y,
            this.originalPosition.z + this.offset.z);
        this.mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    }

    toJSON() {
        var children = this.childComponents.map((child) => child.toJSON());

        return {
            type: "Component",
            args: {offset: this.offset, rotation: this.rotation},
            children: children
        }
    }
}
