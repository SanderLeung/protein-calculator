import React, { useState } from 'react';

const GroceryList = () => {
    const [name, setName] = useState('');
    const [protein, setProtein] = useState('');
    const [calories, setCalories] = useState('');
    const [servings, setServings] = useState('');
    const [cost, setCost] = useState('');
    const [leannessData, setLeannessData] = useState([]);
    const [costEffectivenessData, setCostEffectivenessData] = useState([]);

    const submitForm = () => {
        // Get values from input fields
        const leannessPercentage = (parseFloat(protein) / parseFloat(calories)) * 4;
        const costEffectivenessPercentage = parseFloat(cost) / (parseFloat(protein) * parseFloat(servings));

        // Create new data entries
        setLeannessData([...leannessData, { name, percentage: leannessPercentage }]);
        setCostEffectivenessData([...costEffectivenessData, { name, percentage: costEffectivenessPercentage }]);

        // Clear input fields
        setName('');
        setProtein('');
        setCalories('');
        setServings('');
        setCost('');
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="protein">Protein:</label>
                <input type="number" id="protein" value={protein} onChange={(e) => setProtein(e.target.value)} />

                <label htmlFor="calories">Calories:</label>
                <input type="number" id="calories" value={calories} onChange={(e) => setCalories(e.target.value)} />

                <label htmlFor="servings">Servings:</label>
                <input type="number" id="servings" value={servings} onChange={(e) => setServings(e.target.value)} />

                <label htmlFor="cost">Cost:</label>
                <input type="number" id="cost" value={cost} onChange={(e) => setCost(e.target.value)} />

                <button onClick={submitForm}>Submit</button>
            </div>

            <div style={{ marginTop: '20px' }}>
                <div>
                    <h2>Leanness</h2>
                    {leannessData.map((entry, index) => (
                        <div key={index} className="bar">
                            <span>{entry.name}</span>
                            <div style={{ width: `${entry.percentage * 100}%`, backgroundColor: '#4caf50', height: '20px' }}></div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '20px' }}>
                    <h2>Cost Effectiveness</h2>
                    {costEffectivenessData.map((entry, index) => (
                        <div key={index} className="bar">
                            <span>{entry.name}</span>
                            <div style={{ width: `${entry.percentage * 100}%`, backgroundColor: '#4caf50', height: '20px' }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GroceryList;
