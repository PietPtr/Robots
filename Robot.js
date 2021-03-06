

class Robot {
    constructor() {
        this.root = new Root({color: 0xffff00});

        this.tracers = []
        this.components = [this.root]

        this.selector = 0;
        this.updateBuilder();

        this.code = "";
    }

    addToScene(scene) {
        scene.add(this.root.mesh);
    }

    removeFromScene(scene) {
        scene.remove(this.root.mesh);
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
            if (comp === this.components[this.selector]) {
                comp.mesh.material.emissive.setHex(0x003300);
            } else {
                comp.mesh.material.emissive.setHex(0x000000);
            }
        }

        eval("var delta = " + delta + ";\n" + robot.code);
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
                break;
            }
        }

        this.removeFromLists(toBeRemoved);

        this.selectLast();
    }

    removeFromLists(component) {
        var index = this.components.findIndex(x => x.name == component.name);
        this.components.splice(index, 1);

        for (var child of component.childComponents) {
            this.removeFromLists(child);
        }
    }

    getCurrentComponent() {
        return this.components[this.selector]
    }

    removeSelected() {
        this.remove(this.selector);
    }

    updateBuilder() {
        onSelectorChange(this.getCurrentComponent(), this.selector);
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

    setSelector(index) {
        this.selector = index;
        this.updateBuilder();
    }

    fromJSON(json) {
        this.components = [];
        this.root = new Root({color: 0xffff00});

        this.code = json.code;
        this.parseJSON([[json.robot, this.root]]);
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

    toJSON() {
        return {
            robot: this.root.toJSON(),
            code: this.code
        }
    }

    // Convenience functions for programming the robot as a user
    // These functions have short, clear names.
    partByIndex(index) {
        return this.components(index);
    }

    part(name) {
        return this.components.filter(x => x.name == name)[0]
    }
}
