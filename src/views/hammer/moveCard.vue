<template>
	<div>
		<div v-show="toggle" class="container" ref="swipe" v-hammer:swipe="hammerObj">
			<div
				class="item"
				:data-index="index"
				:class="[`item${index}`]"
				v-for="(item, index) of list"
				:key="item.index"
				:style="item.style"
			>
				{{ item.text }}
			</div>
		</div>

    <div @click="toggle = !toggle">toggle</div>
	</div>
</template>

<script>
import hammer from 'hammerjs';
export default {
	data() {
		return {
			list: [], //显示list;
			todoList: [], //待使用list
			hammerObj: {
				defaults: {
					domEvents: true,
				},
				recognizer: 'Swipe',
				event: this.createSwipe,
				recognizerOptions: {
					velocity: 0.5,
					direction: hammer.DIRECTION_LEFT,
				},
			},
      toggle: true
		};
	},
	mounted() {
		this.getDt();
		// this.createSwipe();
	},
	watch: {
		todoList(val) {
			if (val.length < 5) {
				this.todoList = [...val, ...this.createItem(10)];
			}
		},
	},
	methods: {
		getDt() {
			this.todoList = this.createItem(10);
			this.list = this.todoList.splice(0, 4);
		},
		/**
		 * @param num 数量
		 */
		createItem(num) {
			let arr = [];
			const arr1 = [
				'A',
				'B',
				'C',
				'D',
				'E',
				'F',
				'G',
				'H',
				'I',
				'J',
				'K',
				'L',
				'M',
				'N',
				'O',
				'P',
				'Q',
				'R',
				'S',
				'T',
				'U',
				'V',
				'W',
				'X',
				'Y',
				'Z',
			];
			for (let i = 0; i < num; i++) {
				let obj = {
					text: `${arr1[_.random(0, 25)]}${arr1[_.random(0, 25)]}${
						arr1[_.random(0, 25)]
					}`,
					style: {
						background: `rgba(${_.random(0, 255)},${_.random(0, 255)},${_.random(
							0,
							255
						)},1)`,
					},
					index: _.random(0, 1, true),
				};
				arr.push(obj);
			}
			return arr;
		},

		createSwipe(manager, e) {
			if (e.target.className !== 'container' && Number(e.target.dataset.index) === 0) {
				let index = Number(e.target.dataset.index);
				// let handle = () => {
				// 	this.list.splice(0, 1);
				// 	this.$nextTick(() => {
				// 		this.todoList.length && this.list.push(this.todoList.splice(0, 1)[0]);
				// 	});
				// };

				// e.target.addEventListener('transitionend', handle);
				this.list[index].style = {
					...this.list[index].style,
					transform: `translate3d(-150%, -50%, 50px)`,
				};
				let timer = setTimeout(() => {
					this.list.splice(0, 1);
					this.$nextTick(() => {
						this.todoList.length && this.list.push(this.todoList.splice(0, 1)[0]);
					});
					clearTimeout(timer);
				}, 300);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 700px;
	height: 700px;
	border: 1px solid;
	perspective: 800px;
	perspective-origin: 86% 50%;
}
.item {
	transform-style: preserve-3d;
	position: absolute;
	top: 50%;
	left: 50%;
	width: 400px;
	height: 250px;
	border-radius: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 50px;
	font-weight: 600;
	transition: 300ms linear;
	transform: translate3d(-40%, -50%, -150px);
	z-index: 1;
}
.item0 {
	transform: translate3d(-50%, -50%, 50px);
	z-index: 4;
}
.item1 {
	transform: translate3d(-45%, -50%, -50px);
	z-index: 3;
}
.item2 {
	transform: translate3d(-40%, -50%, -150px);
	z-index: 2;
}
</style>
