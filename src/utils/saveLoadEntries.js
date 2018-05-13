import store from './store';

const KEY = 'entries';

export const saveEntries = (entries) => {
  localStorage.setItem(KEY, JSON.stringify(entries));
  const user = store.getValue('user');
  if (user) {
    const database = store.getValue('database');
    database.ref('users/' + user.uid).set({
      entries,
    });
  } else {
    localStorage.setItem(KEY, entries);
  }

};

export const loadEntries = () => {
  const user = store.getValue('user');
  if (user) {
    const database = store.getValue('database');
    return new Promise(async (resolve) => {
      const snapshot = await database.ref('users/' + user.uid).once('value');
      const entries = snapshot.val().entries;
      store.setValue('entries', entries);
      resolve(entries);
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
