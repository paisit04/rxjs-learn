import { fromEvent } from 'rxjs';

const observable = fromEvent(document, 'mousemove');
setTimeout(() => {
  var observer = observable.subscribe({
    next(x) {
      addItem(x);
    },
  });
});

function addItem(val: any) {
  var node = document.createElement('li');
  var textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById('output').appendChild(node);
}
