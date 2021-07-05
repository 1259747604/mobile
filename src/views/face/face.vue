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
					id="video"
					class="face_video"
					playsinline
					autoplay
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
export default {
	data() {
		return {
			operationTip: '',
		};
	},
	mounted() {
		getUserMedia(stream => {
			const video = document.getElementById('video');
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
</style>
