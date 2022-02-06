export const MaiEventMixin = superclass => class extends superclass {
	initEvent() {
		this.initDefaultEvent();
	}
}