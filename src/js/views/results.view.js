import View from './view';
import previewView from './preview.view';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _message = '';
  _errorMessage = `No recipies found for youre query! Please try again.`;
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
