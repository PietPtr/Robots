//////////////////////////////////////////////////////////////////////////////////
//		Initialisation
//////////////////////////////////////////////////////////////////////////////////

var width = window.innerWidth / 1.5;
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
camera.position.x = -50;
camera.position.y = 40
camera.position.z = 50;
var controls = new THREE.OrbitControls(camera, container);


var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersected;

//////////////////////////////////////////////////////////////////////////////////
//		Scene setup
//////////////////////////////////////////////////////////////////////////////////

// White directional light at half intensity shining from the top.
var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.target.position.set(-1, 0, -1);
scene.add(directionalLight.target);
scene.add(directionalLight);
var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add(light);

robot = loadRobot();

//////////////////////////////////////////////////////////////////////////////////
//		Rendering
//////////////////////////////////////////////////////////////////////////////////

window.addEventListener('resize', function(){
    width = window.innerWidth / 1.5;
    height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    container = document.getElementById('threejs');
    container.style.width = width + "px";
    container.style.height = height + "px";
}, false);

window.addEventListener('keydown', function() {
	if (event.keyCode == 83 && event.ctrlKey) {
		saveRobot(robot);
		event.preventDefault();
	}
}, true);

container.addEventListener('mousemove', function() {
	event.preventDefault();
    var diffW = window.innerWidth - width
	mouse.x = ((event.clientX) / width) * 2 - 2;
	mouse.y = -(event.clientY / height) * 2 + 1;
}, false);

container.addEventListener('click', function() {
	if (intersected) {
		robot.setSelector(robot.components.findIndex(x => x.mesh.uuid == intersected.uuid));
	}
}, false);

// canvas.addEventListener('keydown', function() {
// 	console.log(event.keyCode)
// 	if (event.keyCode == 127) {
// 		robot.removeSelected();
// 	}
// }, false);



onRenderFcts.push(function(){
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects(robot.components.map(x => x.mesh));

    if (intersects.length > 0) {
        intersected = intersects[0].object;
        intersected.material.emissive.setHex(0x330000);
    }
    else {
        if (intersected) {
            intersected.material.emissive.setHex(0);
        }

		intersected = null;
    }

    renderer.render( scene, camera );
});

onRenderFcts.push((delta) => {
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
