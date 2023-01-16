import View from './view';
import previewView from './preview.view';

class BookmarksView extends View {
  _message = '';
  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it ;)`;
  _parentElement = document.querySelector('.bookmarks__list');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
