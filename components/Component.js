
class Component {
    constructor(color, offset, rotation) {
        this.parent = undefined;
        this.color = color;
        this.offset = (offset === undefined) ? new THREE.Vector3(0, 0, 0) : offset;
        this.rotation = (rotation === undefined) ? new THREE.Vector3(0, 0, 0) : rotation;
        this.connectPos = new THREE.Vector3(0, 0, 0);
        this.mesh = undefined;
        this.childComponents = []
    }

    add(component) {
        component.mesh.position.set(
            this.connectPos.x + component.offset.x,
            this.connectPos.y + component.offset.y,
            this.connectPos.z + component.offset.z);
        component.mesh.rotation.set(component.rotation.x, component.rotation.y, component.rotation.z);
        this.mesh.add(component.mesh);
        component.parent = this;
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
            "rotx": this.rotation.x,
            "roty": this.rotation.y,
            "rotz": this.rotation.z
        }
    }

    setVars(vars) {
        if (vars.offsetx && vars.offsety && vars.offsetz && vars.rotx && vars.roty && vars.rotz) {
            this.offset.x = vars.offsetx;
            this.offset.y = vars.offsety;
            this.offset.z = vars.offsetz;
            this.rotation.x = vars.rotx;
            this.rotation.y = vars.roty;
            this.rotation.z = vars.rotz;
        }
    }
}
