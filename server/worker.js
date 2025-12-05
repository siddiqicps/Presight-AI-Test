const { parentPort } = require('worker_threads');
const {faker} = require('@faker-js/faker');

// Listen for messages (the FASTQ data) from the main thread
parentPort.on('message', (fastqData) => {
  try {
    // Send the results back to the main thread
    setTimeout(() => {
        parentPort.postMessage(faker.lorem.text());
    }, 2000)
  } catch (error) {
    // Post an error message back to the main thread if something goes wrong
    parentPort.postMessage({ error: error.message });
  }
});
