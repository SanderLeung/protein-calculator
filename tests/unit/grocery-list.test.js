import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()

import GroceryList from '../../src/grocery-list'; // Adjust the path based on your project structure

describe('GroceryList component', () => {
  test('renders GroceryList component', () => {
    const { getByLabelText, getByText } = render(<GroceryList />);
    
    expect(getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(getByLabelText(/Protein:/i)).toBeInTheDocument();
    expect(getByLabelText(/Calories:/i)).toBeInTheDocument();
    expect(getByLabelText(/Servings:/i)).toBeInTheDocument();
    expect(getByLabelText(/Cost:/i)).toBeInTheDocument();
    expect(getByText(/Submit/i)).toBeInTheDocument();
    expect(getByText(/Leanness/i)).toBeInTheDocument();
    expect(getByText(/Cost Effectiveness/i)).toBeInTheDocument();
  });

  test('submits form and adds data to graphs', () => {
    const { getByLabelText, getByText, getByTestId } = render(<GroceryList />);
    
    // Fill out the form
    fireEvent.change(getByLabelText(/Name:/i), { target: { value: 'Example Food' } });
    fireEvent.change(getByLabelText(/Protein:/i), { target: { value: '10' } });
    fireEvent.change(getByLabelText(/Calories:/i), { target: { value: '200' } });
    fireEvent.change(getByLabelText(/Servings:/i), { target: { value: '2' } });
    fireEvent.change(getByLabelText(/Cost:/i), { target: { value: '5' } });

    fireEvent.click(getByText(/Submit/i));

    // Check if data is added to the graphs
    expect(getByTestId('leanness-graph')).toContainHTML('Example Food');
    expect(getByTestId('cost-effectiveness-graph')).toContainHTML('Example Food');
  });
});
