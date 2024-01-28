/* function submitForm() {
    // Get values from input fields
    const name = document.getElementById('name').value;
    const protein = parseFloat(document.getElementById('protein').value);
    const calories = parseFloat(document.getElementById('calories').value);
    const servings = parseFloat(document.getElementById('servings').value);
    const cost = parseFloat(document.getElementById('cost').value);

    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('protein').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('servings').value = '';
    document.getElementById('cost').value = '';

    // Calculate leanness and cost effectiveness percentages
    const leannessPercentage = (protein / calories) * 4;
    const costEffectiveness = (protein * servings) / cost;

    // Create bar entries for graphs
    createBarEntry('leanness', name, leannessPercentage);
    createBarEntry('cost-effectiveness', name, costEffectiveness);
} */

async function submitForm() {
    const name = document.getElementById('name').value;
    const protein = parseFloat(document.getElementById('protein').value);
    const calories = parseFloat(document.getElementById('calories').value);
    const servings = parseFloat(document.getElementById('servings').value);
    const cost = parseFloat(document.getElementById('cost').value);

    document.getElementById('name').value = '';
    document.getElementById('protein').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('servings').value = '';
    document.getElementById('cost').value = '';

    try {
        const response = await fetch('http://localhost:3000/grocery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, protein, calories, servings, cost }),
        });

        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error(error);
    } finally {
        // Refresh the graph data
        await fetchGraphData();
    }
}

function createBarEntry(graphId, name, percentage) {
    const graph = document.getElementById(graphId);
    const bar = document.createElement('div');
    bar.classList.add('bar');

    const label = document.createElement('span');
    label.textContent = name;

    const progressBar = document.createElement('div');
    if (graphId === 'leanness') {
        progressBar.textContent = `${(percentage * 100).toFixed(2)}%`;
        progressBar.style.width = `${percentage * 100}%`;
        progressBar.style.direction = 'rtl';
    } else {
        progressBar.textContent = `${percentage.toFixed(2)}g/$`;
        progressBar.style.width = `${percentage}%`;
    }
    progressBar.style.textAlign = 'right';
    progressBar.style.backgroundColor = '#4caf50';
    progressBar.style.height = '20px';

    bar.appendChild(label);
    bar.appendChild(progressBar);
    graph.appendChild(bar);
}

async function fetchGraphData() {
    try {
        const response = await fetch('http://localhost:3000/groceries');
        const data = await response.json();

        // Clear existing entries
        document.getElementById('leanness').innerHTML = '<h2>Leanness</h2>';
        document.getElementById('cost-effectiveness').innerHTML = '<h2>Cost Effectiveness</h2>';

        // Create new entries
        data.forEach(entry => {
            createBarEntry('leanness', entry.name, (entry.protein / entry.calories) * 4);
            createBarEntry('cost-effectiveness', entry.name, (entry.protein * entry.servings) / entry.cost);
        });
    } catch (error) {
        console.error(error);
    }
}

async function deleteEntry(id) {
    try {
        const response = await fetch(`/delete/${id}`, {
            method: 'DELETE',
        });

        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error(error);
    } finally {
        // Refresh the graph data after deletion
        await fetchGraphData();
    }
}