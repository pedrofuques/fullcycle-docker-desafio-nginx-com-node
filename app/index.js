const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

const peopleNames = [
  "Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hannah", "Ivy", "Jack",
  "Kathy", "Leo", "Mona", "Nina", "Oscar", "Paul", "Quincy", "Rita", "Sam", "Tina",
  "Uma", "Victor", "Wendy", "Xander", "Yara", "Zane", "Abby", "Brian", "Cathy", "Derek",
  "Ella", "Fred", "Gina", "Harry", "Isla", "Jake", "Karen", "Liam", "Mia", "Noah",
  "Olivia", "Peter", "Quinn", "Rachel", "Steve", "Tara", "Umar", "Vera", "Will", "Xena",
  "Yvonne", "Zack", "Amelia", "Ben", "Clara", "Dan", "Elsa", "Finn", "Gloria", "Hank",
  "Iris", "James", "Kate", "Luke", "Megan", "Nathan", "Olive", "Phil", "Queenie", "Rob",
  "Sara", "Tom", "Ursula", "Vince", "Willa", "Xavier", "Yasmin", "Zoe", "Aiden", "Blake",
  "Celine", "Dylan", "Ethan", "Faith", "George", "Hazel", "Ian", "Jill", "Kyle", "Laura"
];

function getRandomName(peopleNames) {
  const randomIndex = Math.floor(Math.random() * peopleNames.length);
  return peopleNames[randomIndex];
}

app.get('/people', async (req, res) => {
  try {

    // Insere no Banco de Dados
    const name = getRandomName(peopleNames)
    await db.execute('INSERT INTO people (name) VALUES (?)', [name]);

    const [rows] = await db.execute('SELECT * FROM people');
    res.status(200)
    res.setHeader('Content-Type', 'text/html');
    
    let peopleHtml = '<ul>';
    rows.forEach(row => {
    peopleHtml += `<li>${row.name}</li>`;
    });
    peopleHtml += '</ul>';

    const html = `
      <h1>Full Cycle Rocks!</h1>
      <h2>Lista de nomes:</h2>
      ${peopleHtml}          
    `;    

    res.end(html)

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
