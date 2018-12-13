
function addRobotTree(robot) {
    console.log(robot.components);
    var div = document.getElementById("robottree");
    console.log(div)
    var currentComponent = robot.root;

    for (var child of robot.root.childComponents) {
        console.log(child);
    }
}


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
            console.log(node.id, node.value)
            vars[node.id] = node.value;
        }
    }

    
}
