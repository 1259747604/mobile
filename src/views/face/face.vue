<template>
	<div class="face-container">
		<!-- 文字及提示 -->
		<div class="top">
			<div class="top-t">展示脸部正面</div>
			<div class="top-b">{{ operationTip }}</div>
		</div>
		<!-- 识别框 -->
		<div class="frame">
			<div class="inner">
				<img src="../../assets/imgs/table.png" alt="" />
				<video
					ref="facevideo"
					id="video"
					class="face_video"
					autoplay
                    playsinline
					x5-video-player-type="h5"
				></video>
			</div>
		</div>
		<!-- 文字 -->
		<div class="middle">我们正在收集您的面部特征信息</div>
		<!-- 底部 -->
		<div></div>
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
		getUserMedia((stream) => {
			const video = this.$refs.facevideo;
			try {
				window.stream = stream;
				video.srcObject = stream;
			} catch (error) {
				video.src = window.URL.createObjectURL(stream);
			}
			this.localMediaStream = stream;
			video.onloadedmetadata = () => {
				video.play();
				// this.initTrack();
			};
		});
	},
	methods: {
		initTrack() {
			this.tracker = new window.tracking.ObjectTracker(['face']); // tracker实例
			this.tracker.setInitialScale(4);
			this.tracker.setStepSize(2);
			this.tracker.setEdgesDensity(0.1);
			this.tracker.on('track', this.handleTracked); // 绑定监听方法
			try {
				window.tracking.track('#video', this.tracker); // 开始追踪
			} catch (e) {
				this.operationTip = '访问用户媒体失败，请重试';
			}
		},
		handleTracked(e) {
			if (e.data.length === 0) {
				this.operationTip = '未检测到人脸';
			} else {
				if (!this.tipFlag) {
					this.operationTip = '检测成功，正在拍照，请保持不动2秒';
				}
				// 1秒后拍照，仅拍一次
				if (!this.flag) {
					this.operationTip = '拍照中...';
					// this.flag = true;
					// this.removePhotoID = setTimeout(() => {
					// 	this.tackPhoto();
					// 	this.tipFlag = true;
					// }, 2000);
				}
				e.data.forEach(this.plot);
			}
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

.top {
	margin-top: 108px;
	height: 150px;
	.top-t {
		font-size: 48px;
		color: #333333;
		letter-spacing: 0;
		font-weight: 500;
	}
	.top-b {
		margin-top: 24px;
		font-size: 28px;
		color: #ff6257;
		font-weight: 400;
	}
}

.frame {
	margin: 60px auto 0;
	padding: 40px;
	width: 544px;
	height: 544px;
	border-radius: 50%;
	overflow: hidden;
	background: url('../../assets/imgs/out.png') no-repeat;
	background-size: 100% 100%;
	.inner {
		position: relative;
		width: 100%;
		height: 100%;
	}
	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 2;
	}
	.face_video {
		width: 100%;
		height: 100%;
		object-position: center;
		object-fit: cover;
		border-radius: 50%;
		transform: rotateY(180deg);
	}
}

.middle {
	margin-top: 57px;
	font-size: 28px;
	color: #666666;
	text-align: center;
	font-weight: 400;
}

.rect {
	border: 2px solid #0aeb08;
	position: fixed;
	z-index: 3;
}
</style>
