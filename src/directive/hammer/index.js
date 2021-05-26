import hammerjs from 'hammerjs';
import recognizertNames from './recognizertNames';

// 创建对应识别器
const RecognizerInterFace = {
	Swipe: (options = {}) => {
		return new hammerjs.Swipe(options);
	},
	Pan: (options = {}) => {
		return new hammerjs.Pan(options);
	},
	Press: (options = {}) => {
		return new hammerjs.Press(options);
	},
	Rotate: (options = {}) => {
		return new hammerjs.Rotate(options);
	},
	Pinch: (options = {}) => {
		return new hammerjs.Pinch(options);
	},
	Tap: (options = {}) => {
		return new hammerjs.Tap(options);
	},
};

// 修改hammer默认配置
function EditHammerDefaults(options) {
	hammerjs.defaults = { ...hammerjs.defaults, ...options };
}

/**
 * binding.value:传入对象
 * {
 * 		defaults：hammerjs.defaults 全局配置,
 *    recognizer: 识别器名称
 * 		event：监听的事件,
 * 		recognizerOptions:识别器配置
 * }
 */

const hammer = {
	bind: function(el, binding, vnode) {
		// 传入值
		const VALUE_OBJ = binding.value;

		// 全局默认配置
		VALUE_OBJ.defaults && EditHammerDefaults(VALUE_OBJ.defaults);
		// 参数事件名
		const eventName = binding.arg || recognizertNames[VALUE_OBJ.recognizer];
		const manager = new hammerjs.Manager(el);

		const Recognizer = RecognizerInterFace[VALUE_OBJ.recognizer](VALUE_OBJ.recognizerOptions);
		manager.add(Recognizer);
		manager.on(eventName, VALUE_OBJ.event.bind(null, manager));
	},
	inserted: function(el, binding, vnode) {},
	update: function(el, binding, vnode, oldVnode) {},
	componentUpdated: function(el, binding, vnode, oldVnode) {},
	unbind: function(el, binding, vnode) {},
};
export { hammer };
