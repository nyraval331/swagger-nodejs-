const express = require('express');
const path = require('path');
const app = express(),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    port = 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

let datas = [
    {
        id: 1,
        task: 'data1',
        assignee: 'umang',
        status: 'completed'
    },
    {
        id: 2,
        task: 'data2',
        assignee: 'shahjaha',
        status: 'completed'
    },
    {
        id: 3,
        task: 'data3',
        assignee: 'ankit',
        status: 'completed'
    },
    {
        id: 4,
        task: 'data4',
        assignee: 'vikas',
        status: 'completed'
    },
];

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/api/todos', (req, res) => {
    res.json(datas);
});

app.post('/api/addtodo', (req, res) => {
    const data = req.body.task;
    datas.push(data);
    res.json(datas); 
});

app.delete('/api/deletetodo/:id', (req, res) => {
    datas = datas.filter(t => t.id != req.params.id);
    res.json(datas);
});

app.put('/api/updateotodo', (req, res) => {
    let taskToUpdate = req.body.task;
    datas = datas.map(x => {
        if(x.id == taskToUpdate.id) x = taskToUpdate;
        return x;
    });
    res.json(datas);
});

app.get('/', (req,res) => {
    res.send(`<h1>API Sucessfully host on this port: ${port}</h1>`);
});

app.listen(port, () => {
    console.log(`port--->${port}`);
});











