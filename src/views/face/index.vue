<template>
	<div>
		<div>人脸识别</div>
        <input class="card_input" v-on:change="appCapture($event)" type="file" accept="image/*" capture="camera" />
		<div class="video-container">
			<div @click="moveToCameraAVG()" v-cloak>
				<img v-if="!imginfo" :src="imginfo" />
				<div class="warm_title2">点击自拍一张头像</div>
			</div>
			<video
				id="video"
				class="pic_video"
				playsinline
				autoplay
				x5-video-player-type="h5"
				style="object-fit:fill"
			></video>
			<canvas id="canvas" class="canvas_pic" style="margin: 0;padding: 0;"></canvas>
			<div class="bottom_div" style="position: fixed">
				<div @click="captureAvg">拍照</div>
			</div>
		</div>
	</div>
</template>

<script>
import getUserMedia from './util';
export default {
	data() {
		return {
			imginfo: '',
            localMediaStream: ''
		};
	},
	methods: {
		moveToCameraAVG() {
			getUserMedia(stream => {
				var video = document.getElementById('video');
				try {
					window.stream = stream;
					video.srcObject = stream;
				} catch (error) {
					video.src = window.URL.createObjectURL(stream);
				}
				this.localMediaStream = stream;
				video.play();
			});
		},
		//停止摄像机
		stopCapture: function() {
			var video = document.getElementById('video');
			if (!video.srcObject) return;
			let stream = video.srcObject;
			let tracks = stream.getTracks();
			tracks.forEach(track => {
				track.stop();
			});
		},
		// 头像照片
		captureAvg() {
			var vm = this;
			var video = document.getElementById('video');
			var canvas = document.getElementById('canvas'),
				ctx = canvas.getContext('2d'),
				CHeight = video.clientHeight, //获取屏幕大小让canvas自适应
				CWidth = video.clientWidth;
			canvas.width = CWidth;
			canvas.height = CHeight;
			if (vm.localMediaStream) {
				ctx.drawImage(video, 0, 0, CWidth, CHeight);
				var dataURL = canvas.toDataURL('image/jpeg'); //dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA'
				vm.imginfo = dataURL;
				// 停止摄像机
				video.pause();
				this.stopCapture();
			}
		},
        appCapture(e) {
            console.log("🚀 ~ file: index.vue ~ line 79 ~ appCapture ~ e", e)
        }
	},
	mounted() {
		// this.init();
		// getUserMedia();
	},
};
</script>

<style lang="scss" scoped>
.video-container {
	width: 500px;
	height: 500px;
	border-radius: 50%;
	overflow: hidden;
	video {
		width: 100%;
		height: 100%;
	}
}
</style>
