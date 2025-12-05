var express = require('express');
var router = express.Router();
const {hobbiesList, nationalities} = require('../constants');
const { faker } = require('@faker-js/faker');
const { Worker } = require('worker_threads');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hobbies listing. */
router.get('/hobbies', function(req, res, next) {
  
  res.json({hobbies:hobbiesList});
  
  // res.send({'Name': randomName, 'Email': randomEmail, 'Address': randomAddress });
});

/* GET hobbies listing. */
router.get('/nationalities', function(req, res, next) {
  
  res.json({nationalities:nationalities});
  
  // res.send({'Name': randomName, 'Email': randomEmail, 'Address': randomAddress });
});


/* GET hobbies listing. */
router.get('/longText', async function(req, res, next) {
  const longText = faker.lorem.paragraphs(32);

  res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

    // Flush headers immediately
    res.flushHeaders();

    let i = 0;
    const intervalId = setInterval(() => {
        if (i < longText.length) {
            res.write(`data: ${longText[i]}\n\n`); // Send each character as an SSE event
            i++;
        } else {
            clearInterval(intervalId);
            console.log("Ending stream response");
            res.end(); // End the SSE connection when all characters are sent
        }
    }, 10); // Adjust delay as needed
  
});

router.get('/process-queued-requests', (req, res) => {
  
  res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });

  res.flushHeaders();

  res.status(202).write(`data: Pending\n\n`);

  // Path to the worker script
  const workerPath = path.join(__dirname, '../worker.js');
  const worker = new Worker(workerPath);

  // Send the FASTQ data to the worker thread
  // For large files, you might pass a file path instead of raw data to avoid memory issues
  worker.postMessage('test'); 

  // Listen for messages (results) from the worker
  worker.on('message', (result) => {
    console.log('Worker finished processing. Sending response.');
    // Send the final result back to the client
    res.status(200).write(`data: ${result}\n\n`);
    // Terminate the worker if it is no longer needed
    worker.terminate();
    res.end(); 
  });

  // Handle errors from the worker
  worker.on('error', (err) => {
    console.error('Worker error:', err);
    res.status(500).send('An error occurred during processing.');
  });

  // Handle worker exit
  worker.on('exit', (code) => {
    if (code !== 0)
      console.error(`Worker stopped with exit code ${code}`);
  });
});

module.exports = router;
