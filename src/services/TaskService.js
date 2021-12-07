import axios from 'axios';

let instance = null;
updateAxiosInstance();

//Récupération de toutes les tâches
export async function getAll() {
  const res = await instance.get('/latest');
  return res.data.record;
}

//MAJ de toutes les tâches
export async function updateAll(newTasks) {
  await instance.put('/', newTasks);
}

//MAJ de l'instance d'axios
export async function updateAxiosInstance() {
  instance = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b/' + localStorage.getItem('jsonBinID'),
    headers: {
      'X-Master-Key': localStorage.getItem('jsonBinKey'),
    },
  });
}
