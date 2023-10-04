import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      console.log('Data retrieved from DB:', data);
    
      // Ensure that data.value is a string before setting it as the editor value
      if (typeof data.value !== 'string') {
        console.error('Data.value from IndexedDB is not a string:', data.value);
        data.value = '';
      }
    
      // Ensure that localData is a string
      const localDataStr = typeof localData === 'string' ? localData : '';
    
      this.editor.setValue(data.value || localDataStr || header);
    }).catch(error => {
      // Log any errors from getDb
      console.error('Error getting data from IndexedDB:', error);
    });
    

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content')).catch(error => {
        // Log any errors from putDb
        console.error('Error saving data to IndexedDB:', error);
      });
    });
  }
}
