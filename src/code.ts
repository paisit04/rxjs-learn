import { Observable } from 'rxjs';

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
});

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

var observer2 = observable.subscribe({
  next(x) {
    console.log('got value ' + x);
    addItem(`2: ${x}`);
  },
});
console.log('just after subscribe');

observer.add(observer2);
setTimeout(() => {
  observer.unsubscribe();
  console.log('unsubscribe');
}, 6001);
