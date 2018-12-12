
function addRobotTree(robot) {
    console.log(robot.components);
    var div = document.getElementById("robottree");
    console.log(div)
    var currentComponent = robot.root;

    for (var child of robot.root.childComponents) {
        console.log(child);
    }
}
