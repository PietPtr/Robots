
class Component {
    constructor(color, offset, rotation) {
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

        this.childComponents.push(component);
    }
}
