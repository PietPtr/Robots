//////////////////////////////////////////////////////////////////////////////////
//		HTML bullshit
//////////////////////////////////////////////////////////////////////////////////
function toggleBuilder() {
    var elem = document.getElementById("builder");
    if (elem.style.display === "none") {
        elem.style.display = "block";
    } else {
        elem.style.display = "none";
    }
}

//////////////////////////////////////////////////////////////////////////////////
//		Initialisation
//////////////////////////////////////////////////////////////////////////////////

var width = window.innerWidth / 2;
var height = window.innerHeight;

container = document.getElementById('threejs');
container.style.width = width + "px";
container.style.height = height + "px";
document.body.appendChild(container);

var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setClearColor(new THREE.Color('#0c0c0c'), 1);
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Array of functions for the rendering loop
var onRenderFcts = [];

// Initialise scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
camera.position.x = 0;
camera.position.y = 40
camera.position.z = 80;
var controls = new THREE.OrbitControls(camera);

//////////////////////////////////////////////////////////////////////////////////
//		Scene setup
//////////////////////////////////////////////////////////////////////////////////

// White directional light at half intensity shining from the top.
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.target.position.set(-1, 0, -1);
scene.add(directionalLight.target);
scene.add( directionalLight );
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );


var root = new Arm(0xffff00, 5);
var robot = new Robot(root);

addRobotTree(robot);

//////////////////////////////////////////////////////////////////////////////////
//		Rendering
//////////////////////////////////////////////////////////////////////////////////

window.addEventListener('resize', function(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}, false);

onRenderFcts.push(function(){
    renderer.render( scene, camera );
});

onRenderFcts.push((delta) => {
    delta = delta
});

onRenderFcts.push((delta) => {
    // var endPointPosition = new THREE.Vector3();
    // endPointPosition.setFromMatrixPosition(cylinder2.matrixWorld);

    robot.update(delta);
});

var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
    requestAnimationFrame(animate);

    lastTimeMsec = lastTimeMsec || nowMsec-1000/60;
    var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
    lastTimeMsec = nowMsec;

    onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec / 1000, nowMsec / 1000)
    });
});
