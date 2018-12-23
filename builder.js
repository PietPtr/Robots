
const idToClass = {"servoEditor": Servo, "armEditor": Arm, "tracerEditor": Tracer, "rootEditor": Root};

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
        var element = document.getElementById(id)
        if (element) {
            element.value = varObj[id];
        }
    }
}

function confirmEdit() {
    var vars = {};

    for (var id of Object.keys(idToClass)) {
        var div = document.getElementById(id);
        if (div && div.style.display == "") {
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
    textarea.value = JSON.stringify(robot.toJSON());
}

function importRobot() {
    textarea = document.getElementById("robotJSON");
    json = JSON.parse(textarea.value);

    scene.remove(robot.root.mesh);

    robot = new Robot()
    robot.fromJSON(json);
}

function checkRoboCode() {

}

function setRoboCode() {
    robot.code = document.getElementById("roboCode").value;
}

function addSelectedToCode() {
    var codeArea = document.getElementById("roboCode");
    console.log(codeArea.selectionStart, codeArea.selectionEnd);
    var code = codeArea.value;
    code = code.slice(0, codeArea.selectionStart) +
            "robot.part('" + robot.getCurrentComponent().name + "')"
            + code.slice(codeArea.selectionEnd, code.length);

    console.log(code);
    codeArea.value = code;
}
