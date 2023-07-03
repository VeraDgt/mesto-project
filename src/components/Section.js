export default class Section {
  constructor ({ renderer }, sectionSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(sectionSelector);
  }

  renderItems(data) {
    data.reverse().forEach(item => this._renderer(item));
  }

  addItem(el) {
    this._container.prepend(el);
  }
}