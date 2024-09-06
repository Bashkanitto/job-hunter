import axios from 'axios';
import React, { useState } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap } from 'react-flow-renderer';

const initialElements = [
  { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Consultation' }, position: { x: 250, y: 100 } },
  { id: '3', data: { label: 'Contact Method' }, position: { x: 250, y: 200 } },
  { id: '4', data: { label: 'Phone' }, position: { x: 150, y: 300 } },
  { id: '5', data: { label: 'Message' }, position: { x: 350, y: 300 } },
  { id: '6', type: 'output', data: { label: 'End' }, position: { x: 250, y: 400 } },
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e5-6', source: '5', target: '6' },
];
const

const App = () => {
  const [elements, setElements] = useState(initialElements);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  const saveFlow = () => {
    const data = { elements };
    axios.post('/api/saveFlow', data)
      .then(response => alert('Flow saved!'))
      .catch(error => alert('Error saving flow'));
  };

  return (
    <div style={{ height: 500 }}>
      <ReactFlow elements={elements} onElementsRemove={onElementsRemove} onConnect={onConnect}>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <button onClick={saveFlow}>Сохранить</button>
    </div>
  );
};

export default App;
