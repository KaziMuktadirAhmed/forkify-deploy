import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();

    if (render === false) return markup;

    this._clearParent();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = newDOM.querySelectorAll('*');
    const currentElements = this._parentElement.querySelectorAll('*');

    newElements.forEach((newElem, i) => {
      const currentElem = currentElements[i];
      if (
        !newElem.isEqualNode(currentElem) &&
        newElem.firstChild?.nodeValue.trim() !== ''
      ) {
        currentElem.textContent = newElem.textContent;
      }

      if (!newElem.isEqualNode(currentElem))
        Array.from(newElem.attributes).forEach(attr => {
          currentElem.setAttribute(attr.name, attr.value);
        });
    });
  }

  renderSpninner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
      `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clearParent();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="recipe">
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
          <p>${message}</p>
        </div>
      `;
    this._clearParent();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clearParent() {
    this._parentElement.innerHTML = '';
  }
}
