import store from './store';

const KEY = 'entries';

export const saveEntries = (entries) => {
  localStorage.setItem(KEY, JSON.stringify(entries));
  // const user = store.getValue('user');
  // if (user) {
  //   const database = store.getValue('database');
  //   database.ref('entries/' + user.uid).set({
  //     entries,
  //   });
  // } else {
  //   localStorage.setItem(KEY, entries);
  // }

};

export const loadEntries = () => {
  const user = store.getValue('user');
  if (user) {
    const database = store.getValue('database');
    return new Promise(async (resolve) => {
      const snapshot = await database.ref('entries/' + user.uid).once('value');
      resolve(snapshot.val());
    });


  } else {
    let entries;
    try {
      entries = JSON.parse(localStorage.getItem(KEY));
    } catch (error) {}
    store.setValue('entries', entries);
    return Promise.resolve(entries);
  }
};
