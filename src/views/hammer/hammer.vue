<template>
	<div class="container">
		<div class="test" ref="test"></div>
	</div>
</template>

<script>
import hammer from 'hammerjs'
export default {
	data() {
		return {}
	},
	mounted() {
		// this.createSwipe()
    this.createPan()
	},
	methods: {
		createSwipe() {
			const manager = new Hammer.Manager(this.$refs.test)

			const Swipe = new Hammer.Swipe({
				velocity: 0.3,
			})
			manager.add(Swipe)
			let deltaX = 0
			let deltaY = 0

			manager.on('swipe', function(e) {
				console.log('🚀 ~ file: hammer.vue ~ line 26 ~ manager.on ~ e', e)
				deltaX = deltaX + e.deltaX
				var direction = e.offsetDirection
				// var translate3d = 'translate3d(' + deltaX + 'px, 0, 0)'

				// if (direction === 4 || direction === 2) {
				// 	e.target.innerText = deltaX
				// 	e.target.style.transform = translate3d
				// }
			})
		},
		createPan() {
			const manager  = new Hammer.Manager(this.$refs.test)
      console.log("🚀 ~ file: hammer.vue ~ line 42 ~ createPan ~ manager", manager)

			const singleTap = new Hammer.Tap({ event: 'singletap',taps: 1})
			const doubleTap = new Hammer.Tap({ event: 'doubletap', taps: 2 })
			const tripleTap = new Hammer.Tap({ event: 'tripletap', taps: 3 })

			manager.add([tripleTap, doubleTap, singleTap])
      // tripleTap运行的时候运行doubleTap, singleTap，下面同理
			tripleTap.recognizeWith([doubleTap, singleTap])
			doubleTap.recognizeWith(singleTap)

      // 只有当tripleTap失败时才去执行doubleTap，下面同理，可以做到点三次不会触发doubleTap，singleTap
			doubleTap.requireFailure(tripleTap)
			singleTap.requireFailure([tripleTap, doubleTap])

      manager .on('singletap', function(e) {
        console.log("🚀 ~ file: hammer.vue ~ line 58 ~ manager.on ~ e", e)
        console.log("singletap")
			})
      manager .on('doubletap', function(e) {
				console.log('doubleTap')
			})
      manager .on('tripletap', function(e) {
				console.log('tripleTap')
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.container {
	margin: 200px auto;
	width: 700px;
	height: 700px;
	border: 1px solid;
	.test {
		width: 60px;
		height: 60px;
		background: #41338c;
	}
}
</style>
