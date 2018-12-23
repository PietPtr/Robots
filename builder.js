
const idToClass = {"servoEditor": Servo, "armEditor": Arm, "tracerEditor": Tracer};

function onSelectorChange(component, index) {
    for (var id of Object.keys(idToClass)) {
        var element = document.getElementById(id);
        if (element) {
            if (component instanceof idToClass[id]) {
                element.style.display = ""
            } else {
                element.style.display = "none"
            }
        }
    }

    document.getElementById("componentIndex").value = index

    var varObj = component.getVars();
    for (var id of Object.keys(varObj)) {
        document.getElementById(id).value = varObj[id];
    }
}

function confirmEdit() {
    var vars = {};

    for (var id of Object.keys(idToClass)) {
        var div = document.getElementById(id);
        if (div.style.display == "") {
            for (var node of div.childNodes) {
                if (node.nodeName == "INPUT") {
                    vars[node.id] = node.value;
                }
            }
        }
    }

    var offRotDiv = document.getElementById("RotOffEditor");
    for (var node of offRotDiv.childNodes) {
        if (node.nodeName == "INPUT") {
            vars[node.id] = node.value;
        }
    }

    var index = parseInt(document.getElementById("componentIndex").value);
    robot.components[index].setVars(vars);
    robot.components[index].applyVars();

}

const typeToClass = {"Arm": Arm, "Servo": Servo, "Tracer": Tracer};

function exportRobot(robot) {
    textarea = document.getElementById("robotJSON");
    textarea.value = JSON.stringify(robot.root.toJSON());
}

function importRobot(robot) {
    textarea = document.getElementById("robotJSON");
    json = JSON.parse(textarea.value);
    // TODO: add real invisible root to the robot, instead of small arm
    robot.root = new typeToClass[json.type](json.args)
    // console.log(robot.root)
    console.log(test([[json, {}]]));

}

function test(queue) {
    var current = queue.shift();
    if (current === undefined) {
        return;
    }

    for (var child of current[0].children) {
        queue.push([child, current[0]]);
    }

    console.log(current[1].type, current[0].type, current[0].children.length);



    test(queue);

}
