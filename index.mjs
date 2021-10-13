
import airtable from './airtable.mjs'
import express from 'express';
import path from 'path';
const __dirname = path.resolve();
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/api/:id', async(req, res) => {
    try {
        const baseFA = airtable('app4MqGYcYLzCIZTb')
        const rows = await baseFA('Table 1').select().all()
        const selectedRow = rows.map(x => x.fields).find(x => x['URL'] == 'intelligence.remoteroofing.com' + '/' + req.params.id)
        res.json(selectedRow)
    } catch (err) {
        console.log(err.message);
    }
})

app.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'template.html'))
})

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'))
})

app.listen(process.env.PORT || 4001, () => console.log(`Listening on Port 4001`));