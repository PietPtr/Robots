

class Robot {
    constructor(root) {
        this.root = root;
        scene.add(this.root.mesh);

        this.tracers = []
        this.components = [this.root]
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

    update(delta) {
        for (var tracer of this.tracers) {
            tracer.update();
            tracer.draw();
        }

        for (var comp of this.components) {
            if (comp.rotate) {
                comp.rotate(0.5 * delta);
            }
        }
    }
}
