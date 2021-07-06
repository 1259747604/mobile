<template>
	<div class="face-container">
		<!-- 识别框 -->
		<div class="frame" id="frame">
			<img id="faceimg" src="./imgs/tag_friends.jpg" alt="" />
		</div>
		<div
			class="rect"
			v-for="item in profile"
			:style="{
				width: item.width + 'px',
				height: item.height + 'px',
				left: item.left + 'px',
				top: item.top + 'px',
			}"
		></div>
	</div>
</template>

<script>
import getUserMedia from './util';
import 'tracking/build/tracking-min';
import 'tracking/build/data/face-min';
export default {
	data() {
		return {
			operationTip: '',
			profile: [],
		};
	},
	mounted() {
		// getUserMedia((stream) => {
		// 	const video = this.$refs.facevideo;
		// 	try {
		// 		window.stream = stream;
		// 		video.srcObject = stream;
		// 	} catch (error) {
		// 		video.src = window.URL.createObjectURL(stream);
		// 	}
		// 	this.localMediaStream = stream;
		// 	video.onloadedmetadata = () => {
		// 		video.play();
		// 		this.initTrack();
		// 	};
		// });
		this.initTrack();
	},
	methods: {
		initTrack() {
			this.tracker = new window.tracking.ObjectTracker(['face']); // tracker实例
			this.tracker.setInitialScale(4);
			this.tracker.setStepSize(2);
			this.tracker.setEdgesDensity(0.1);
			this.tracker.on('track', this.handleTracked); // 绑定监听方法
			try {
				window.tracking.track('#faceimg', this.tracker); // 开始追踪
			} catch (e) {
				this.operationTip = '访问用户媒体失败，请重试';
			}
		},
		handleTracked(e) {
      console.log("🚀 ~ file: imgface.vue ~ line 60 ~ handleTracked ~ e", e)
			e.data.forEach(this.plot);
		},
		plot({ x, y, width: w, height: h }) {
			// 创建框对象
			this.profile.push({ width: w, height: h, left: x, top: y });
		},
	},
};
</script>

<style lang="scss" scoped>
.face-container {
	font-family: PingFangSC-Medium;
}

.frame {
	position: relative;
	width: 100%;
	height: 500px;
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
.rect {
	border: 2px solid #0aeb08;
	position: fixed;
	z-index: 3;
}
</style>
