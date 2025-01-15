/**
 * 选项卡参数配置
 */
class Tabs {
	// #defaultConfig = {};
	#tabsListElem = document.querySelectorAll('.mobile-tabs');
	constructor(setConfig = {}) {
		// this.config = { ...this.#defaultConfig, ...setConfig };
		this.#init();
	}
	//初始化
	#init() {
		//默认下标
		let index = 0;
		this.#create();
		for (let i = 0; i < this.#tabsListElem.length; i++) {
			this.#isMask(this.#tabsListElem[i]);
		}
		for (let i = 0; i < this.#tabsListElem.length; i++) {
			let tabsUlElem = this.#tabsListElem[i].querySelector('.tabs-list');
			let tabsItemElem = tabsUlElem.querySelectorAll('.tabs-item');
			this.#setDisabled(tabsUlElem);
			if (this.#isDisabled(tabsItemElem[index])) {
				index++;
				if (index > tabsItemElem.length - 1) {
					index = 0;
				}
			}
			this.#setPosition(tabsItemElem[index]);
			this.#contentSwitch(this.#tabsListElem[i], index);
		}
		this.#bindEvent();
	}
	/**
	 * 判断元素是否禁用状态
	 */
	#isDisabled(element) {
		return element.hasAttribute('disabled');
	}
	//设置元素禁用状态
	#setDisabled(tabsListElem) {
		let listItem = tabsListElem.querySelectorAll('.tabs-item');
		for (let i = 0; i < listItem.length; i++) {
			if (this.#isDisabled(listItem[i])) {
				listItem[i].style.pointerEvents = 'none';
				listItem[i].style.color = '#999';
				return true;
			} else {
				delete listItem[i].style.pointerEvents;
				delete listItem[i].style.color;
			}
		}
	}
	//给当前点击元素添加激活状态
	#addActive(item) {
		item.parentElement.querySelector('.tabs-item.active').classList.remove('active');
		item.classList.add('active');
	}
	//设置内容切换
	#contentSwitch(parentElem, index) {
		parentElem.querySelector('.tabs-content div.tabs-show').classList.remove('tabs-show');
		parentElem.querySelectorAll('.tabs-content>div')[index].classList.add('tabs-show');
	}
	//创建所需结构
	#create() {
		for (let i = 0; i < this.#tabsListElem.length; i++) {
			let leftMask = document.createElement('div');
			let rightMask = document.createElement('div');
			let listParent = document.createElement('div');
			let line = document.createElement('i');
			let list = this.#tabsListElem[i].querySelector('.tabs-list');
			line.className = 'tabs-line';
			leftMask.className = 'tabs-left-mask';
			rightMask.className = 'tabs-right-mask';
			listParent.className = 'tabs-list-parent';
			list.appendChild(line);
			listParent.appendChild(list);
			listParent.appendChild(leftMask);
			listParent.appendChild(rightMask);
			this.#tabsListElem[i].querySelector('.tabs-head').insertAdjacentElement('afterbegin', listParent);
		}
	}

	/**
	 * 判断是否显示左右遮罩
	 * @param {element} tabsListElem 目标元素
	 */
	#isMask(tabsListElem) {
		let scrollLeft = tabsListElem.querySelector('.tabs-list').scrollLeft;
		let scrollWidth = tabsListElem.querySelector('.tabs-list').scrollWidth;
		let clientWidth = tabsListElem.querySelector('.tabs-list').clientWidth;
		if (scrollLeft === 0) {
			tabsListElem.querySelector('.tabs-left-mask').style.display = 'none';
		} else {
			tabsListElem.querySelector('.tabs-left-mask').style.display = 'block';
		}
		if (scrollLeft + clientWidth + 1 >= scrollWidth) {
			tabsListElem.querySelector('.tabs-right-mask').style.display = 'none';
		} else {
			tabsListElem.querySelector('.tabs-right-mask').style.display = 'block';
		}
	}
	/**
	 * 计算线的位置
	 * @param {element} item 目标元素
	 */
	#linePoint(item) {
		const lineElem = item.parentElement.querySelector('.tabs-line');
		// 下划线位置 = 选项卡左偏移(相对与父元素,每个元素都是固定的偏移,不会因为滚动而影响偏移量) + 选项卡宽度的一半 - 下划线宽度的一半
		let offsetLeft = item.offsetLeft + item.clientWidth / 2 - lineElem.clientWidth / 2;
		lineElem.style.transform = `translate3d(${offsetLeft}px, 0px, 0px)`;
	}
	/**
	 * 计算滚动条中间位置
	 * @param {element} item 目标元素
	 */
	#scrollCenter(item) {
		const tabsListElem = item.parentElement;
		let win_center = window.innerWidth;
		//计算滚动条最大滚动值
		let scrollWidth = tabsListElem.scrollWidth - tabsListElem.offsetWidth;
		let rect = tabsListElem.getBoundingClientRect();
		//滚动位置 = 选项卡左偏移(相对与父元素,每个元素都是固定的偏移,不会因为滚动而影响偏移量) - （可视窗口宽度的一半 - 选项卡宽度的一半）+ 容器距离视口的距离
		let setScrollPoin = item.offsetLeft - (win_center / 2 - item.clientWidth / 2) + rect.left;
		if (setScrollPoin < 0) {
			setScrollPoin = 0;
		} else if (setScrollPoin > scrollWidth) {
			setScrollPoin = scrollWidth;
		}
		tabsListElem.scrollLeft = setScrollPoin;
	}
	//设置位置
	#setPosition(item) {
		this.#linePoint(item);
		this.#scrollCenter(item);
		this.#addActive(item);
	}
	/**
	 * 通过id和index设置位置
	 * @param {string} id 父元素id
	 * @param {number} index 目标元素的索引
	 */
	setPositionByIndex(id, index) {
		let element = document.querySelector(id);
		if (this.#isDisabled(element)) {
			throw new Error('不可设置禁用状态的选项');
		}
		this.#setActive(element.querySelectorAll('.tabs-item')[index]);
		this.#contentSwitch(element, index);
	}
	/**
	 * 设置元素激活状态
	 * @param {element} elem 目标元素
	 */
	#setActive(elem) {
		if (elem.classList.contains('tabs-item')) {
			this.#setPosition(elem);
		}
	}
	//获取元素索引
	#getIndex(elem, item) {
		let children = elem.querySelectorAll('.tabs-item');
		//获取的DOM集合转为数组，才能使用indexOf方法
		let index = [...children].indexOf(item);
		return index;
	}
	//默认事件函数
	#onClick(e) {
		if (e.target.classList.contains('tabs-item')) {
			let index = this.#getIndex(e.target.parentElement, e.target);
			this.#setActive(e.target);
			this.#contentSwitch(e.currentTarget, index);
		}
	}
	//自定义监听事件
	on(id, callback) {
		let element = document.querySelector(id);
		element.removeEventListener('click', this.#onClick);
		element.addEventListener('click', (e) => {
			if (e.target.classList.contains('tabs-item')) {
				let index = this.#getIndex(e.target.parentElement, e.target);
				this.#setPosition(e.target);
				this.#contentSwitch(element, index);
				let item = {
					index: index, //当前点击元素下标
					item: e.target, //当前点击元素节点
					parentElement: element, //当前选项卡父元素
					data: e.target.dataset, //当前点击元素上的data数据
				};
				callback(item);
			}
		});
	}
	//事件绑定
	#bindEvent() {
		let tabsListElem = this.#tabsListElem;
		//默认事件
		for (let i = 0; i < this.#tabsListElem.length; i++) {
			tabsListElem[i].addEventListener('click', this.#onClick.bind(this));
		}
		//添加滚动事件
		for (let i = 0; i < this.#tabsListElem.length; i++) {
			this.#tabsListElem[i].querySelector('.tabs-list').addEventListener('scroll', (e) => {
				this.#isMask(e.target.parentElement);
			});
		}
	}
}
