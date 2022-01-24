import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

const observable = new Observable((subscriber) => {
  try {
    subscriber.next('Hey guys!');
    subscriber.next('How are you?');
    setInterval(() => {
      subscriber.next('I am good');
    }, 2000);
    // subscriber.complete();
    // subscriber.next('This will not send');
  } catch (err) {
    subscriber.error(err);
  }
}).pipe(share());

function addItem(val: any) {
  var node = document.createElement('li');
  var textnode = document.createTextNode(val);
  node.appendChild(textnode);
  document.getElementById('output').appendChild(node);
}

console.log('just before subscribe');
var observer = observable.subscribe({
  next(x) {
    console.log('got value ' + x);
    addItem(x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
    addItem('Completed');
  },
});

console.log('just after subscribe');

setTimeout(() => {
  var observer2 = observable.subscribe({
    next(x) {
      addItem('Subscriber 2: ' + x);
    },
  });
}, 1000);
