import cluster from 'cluster';
import { cpus } from 'os';
import { pid } from 'process';
import { data } from './models/userModel.js';

if (cluster.isPrimary) {
  let workerData = [];
  let workersArray = [];

  const numOfCpus = cpus().length;

  console.log(`Master pid: ${pid}`);
  console.log(`Starting ${numOfCpus} forks`);

  for (let i = 0; i < numOfCpus; i++) {
    const worker = cluster.fork();
    workersArray.push(worker);
    worker.on('exit', () => {
      console.log(`Worker died pid: ${pid}`);
      cluster.fork();
    });

    worker.on('message', (messageData) => {
      workerData = messageData;
      workersArray.forEach(worker => {
        worker.send(workerData);
      });
    });
  }
}

if (cluster.isWorker) {
  const id = cluster.worker?.id;
  await import('./index.js');
  console.log(`Worker: ${id}, pid: ${pid}`);
}