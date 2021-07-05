/**媒体采集 */
// import adapter from 'webrtc-adapter/out/adapter';
// console.log("🚀 ~ file: util.js ~ line 3 ~ adapter", adapter)
// console.log("🚀 ~ file: util.js ~ line 3 ~ adapter", window.adapter)

// 兼容
const adapter = () => {
	if (navigator.mediaDevices === undefined) {
		navigator.mediaDevices = {};
	}
	if (navigator.mediaDevices.getUserMedia === undefined) {
		navigator.mediaDevices.getUserMedia = function(constraints) {
			var getUserMedia =
				navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia ||
				navigator.oGetUserMedia;
			if (!getUserMedia) {
				return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
			}
			return new Promise(function(resolve, reject) {
				getUserMedia.call(navigator, constraints, resolve, reject);
			});
		};
	}
};

const getUserMedia = cb => {
	adapter();
	if (window.stream) {
		window.stream.getTracks().forEach(track => {
			track.stop();
		});
	}
	const constraints = (window.constraints = {
		audio: false,
		video: {
			sourceId: 'default',
			facingMode: { exact: 'user' },
		},
	});
	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(function(stream) {
			cb(stream);
		})
		.catch(function(err) {
			console.log(err.name + ': ' + err.message);
		});
};

export default getUserMedia;
