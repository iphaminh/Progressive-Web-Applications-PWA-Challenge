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
    
      let editorData = header; // default value
      
      if (data && typeof data === 'object' && typeof data.value === 'string') {
        // If data is an object and data.value is a string, use it
        editorData = data.value;
      } else if (typeof localData === 'string') {
        // If localData is a string, use it
        editorData = localData;
      } // else use the default value (header)
    
      this.editor.setValue(editorData);
    }).catch(error => {
      // Log any errors from getDb
      console.error('Error getting data from IndexedDB:', error);
    });