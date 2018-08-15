/**
 * @author richt / http://richt.me
 * @author WestLangley / http://github.com/WestLangley
 *
 * W3C Device Orientation control (http://w3c.github.io/deviceorientation/spec-source-orientation.html)
 */

THREE.DeviceOrientationControls = function ( object ) {

	var scope = this;

	this.object = object;
	this.object.rotation.reorder( "YXZ" );

	this.enabled = true;

	this.deviceOrientation = {};
	this.screenOrientation = 0;

	this.isInit = false;
	this.alpha  = 0;
	this.beta   = 0;
	this.gamma  = 0;
	this.orient  = 0;

	this.x = 0;

	var onDeviceOrientationChangeEvent = function ( event ) {

		scope.deviceOrientation = event;

		scope.update();

	};

	var onScreenOrientationChangeEvent = function () {

		scope.screenOrientation = window.orientation || 0;

		scope.update();

	};

	// The angles alpha, beta and gamma form a set of intrinsic Tait-Bryan angles of type Z-X'-Y''

	var setObjectQuaternion = function () {

		var zee = new THREE.Vector3( 0, 0, 1 );

		var euler = new THREE.Euler();

		var q0 = new THREE.Quaternion();

		var q1 = new THREE.Quaternion( - Math.sqrt( 0.5 ), 0, 0, Math.sqrt( 0.5 ) ); // - PI/2 around the x-axis

		return function ( quaternion, alpha, beta, gamma, orient ) {

			euler.set( beta, alpha, - gamma, 'YXZ' );                       // 'ZXY' for the device, but 'YXZ' for us

			quaternion.setFromEuler( euler );                               // orient the device

			quaternion.multiply( q1 );                                      // camera looks out the back of the device, not the top

			quaternion.multiply( q0.setFromAxisAngle( zee, - orient ) );    // adjust for screen orientation

		}

	}();

	this.connect = function() {

		scope.enabled = true;

		onScreenOrientationChangeEvent(); // run once on load



		window.addEventListener( 'orientationchange', onScreenOrientationChangeEvent, true );
		window.addEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, true );




	};
	this.disconnect = function() {

		scope.enabled = false;

		window.removeEventListener( 'orientationchange', onScreenOrientationChangeEvent, false );
		window.removeEventListener( 'deviceorientation', onDeviceOrientationChangeEvent, false );



	};

	this.update = function () {

		if ( scope.enabled === false ) return;


		var alpha  = scope.deviceOrientation.alpha ? THREE.Math.degToRad( Math.max( 0, Math.min( 0, scope.deviceOrientation.alpha )) ) : 0; // Z
		var beta   = scope.deviceOrientation.beta  ? THREE.Math.degToRad( Math.max( 90, Math.min( 90, scope.deviceOrientation.beta + 90 ))  ) : Math.PI/2; // X
		var gamma  = scope.deviceOrientation.gamma ? THREE.Math.degToRad( Math.max( -2, Math.min( 2, scope.deviceOrientation.gamma )) ) : 0; // Y''
		var orient = scope.screenOrientation       ? THREE.Math.degToRad( scope.screenOrientation       ) : 0; // O


console.log(gamma);
scope.object.position.x = scope.x + gamma*1000;
		setObjectQuaternion( scope.object.quaternion, alpha, beta, gamma, orient );

	};


	this.reset = function() {

		setObjectQuaternion( scope.object.quaternion, 0, Math.PI/2, 0, 0 );

	};


	this.dispose = function () {

		this.disconnect();

	};

	this.connect();

};
