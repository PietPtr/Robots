

class Robot {
    constructor() {
        this.root = new Root({color: 0xffffff});
        scene.add(this.root.mesh);

        this.tracers = []
        this.components = [this.root]

        this.selector = 0;
        this.updateBuilder();
    }

    build(id, component) {
        if (component instanceof Tracer) {
            this.tracers.push(component)
        }

        this.components[id].add(component);
        this.components.push(component);
    }

    buildLast(component) {
        this.build(this.components.length-1, component);
    }

    buildAtSelector(component) {
        this.build(this.selector, component);
        this.selectLast();
    }

    update(delta) {
        for (var tracer of this.tracers) {
            tracer.update();
            tracer.draw();
        }

        for (var comp of this.components) {
            if (comp.rotate) {
                comp.rotate(0.5 * delta);
            }
            if (comp === this.components[this.selector]) {
                comp.mesh.material.color.setHex(0x12cc33);
            } else {
                comp.mesh.material.color.setHex(comp.color);
            }
        }

    }

    remove(index) {
        var toBeRemoved = this.components[index];
        var parent = toBeRemoved.parent;

        if (!parent) {
            return;
        }

        for (var child of parent.childComponents) {
            if (child === toBeRemoved) {
                parent.remove(child);
                this.components.splice(index, 1);
                this.selectLast();
                break;
            }
        }
    }

    selectedComp() {
        return this.components[this.selector]
    }

    removeSelected() {
        this.remove(this.selector);
    }

    updateBuilder() {
        onSelectorChange(this.selectedComp(), this.selector);
    }

    selectorUp() {
        this.selector++;
        if (this.selector > this.components.length - 1) {
            this.selector = 0;
        }
        this.updateBuilder();
    }

    selectorDown() {
        this.selector--;
        if (this.selector < 0) {
            this.selector = this.components.length - 1;
        }
        this.updateBuilder();
    }

    selectLast() {
        this.selector = this.components.length - 1;
        this.updateBuilder();
    }

    fromJSON(json) {
        this.components = [];
        this.root = new Root({color: 0xab55ab});
        scene.add(this.root.mesh);

        this.parseJSON([[json, this.root]]);
    }

    parseJSON(queue) {
        var current = queue.shift();
        if (current === undefined) {
            return;
        }
        var parentComponent = current[1];
        var childJSON = current[0];


        var component = parentComponent;
        if (childJSON.type != "Root") {
            component = new typeToClass[childJSON.type](childJSON.args);
        }

        var parentIndex = this.components.findIndex(x => x.name == parentComponent.name)
        if (parentIndex == -1) {
            this.components.push(component);
        } else {
            this.build(parentIndex, component);
        }

        for (var child of childJSON.children) {
            queue.push([child, component]);
        }

        this.parseJSON(queue);

    }
}
