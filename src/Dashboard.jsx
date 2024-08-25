import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FiBarChart2 } from 'react-icons/fi'; // Graph icon from react-icons
import 'react-circular-progressbar/dist/styles.css';

// Example data
const initialData = {
  categories: [
    {
      id: 'cspm-executive-dashboard',
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 'widget-1', name: 'Cloud Accounts', type: 'chart', data: { connected: 3, notConnected: 2 }},
        { id: 'widget-2', name: 'Cloud Account Risk Assessment', type: 'chart', data: { total: 7253, riskLevels: { critical: 1698, high: 68, medium: 36, low: 7253 }}}
      ]
    },
    {
      id: 'cwpp-dashboard',
      name: 'CWPP Dashboard',
      widgets: [
        { id: 'widget-4', name: 'Top 5 Namespace Specific Alerts', type: 'text', data: {} },
        { id: 'widget-5', name: 'Workload Alerts', type: 'text', data: {} },
        { id: 'widget-6', name: 'Image Risk Assessment', type: 'text', data: { vulnerabilities: 1470, colors: { red: 20, orange: 40, yellow: 30, grey: 10 }} }
      ]
    }
  ]
};

const Dashboard = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWidget, setNewWidget] = useState({ name: '', type: 'chart', categoryId: '' });

  // Handle opening modal to add widget
  const openModal = (categoryId) => {
    setNewWidget({ name: '', type: 'chart', categoryId });
    setIsModalOpen(true);
  };

  // Handle adding a new widget
  const handleAddWidget = () => {
    setData(prevData => {
      return {
        categories: prevData.categories.map(category => {
          if (category.id === newWidget.categoryId) {
            return {
              ...category,
              widgets: [
                ...category.widgets,
                {
                  id: `widget-${Date.now()}`, // Unique ID
                  name: newWidget.name,
                  type: newWidget.type,
                  data: {} // Placeholder data
                }
              ]
            };
          }
          return category;
        })
      };
    });
    setIsModalOpen(false); // Close modal after adding widget
  };

  // Handle removing a widget
  const handleRemoveWidget = (categoryId, widgetId) => {
    setData(prevData => {
      return {
        categories: prevData.categories.map(category => {
          if (category.id === categoryId) {
            return {
              ...category,
              widgets: category.widgets.filter(widget => widget.id !== widgetId)
            };
          }
          return category;
        })
      };
    });
  };

  // Search filter for widgets
  const filteredWidgets = (widgets) => {
    return widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search Widgets"
          className="px-4 py-2 border rounded-lg shadow-sm w-1/3"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Dashboard Categories */}
      {data.categories.map(category => (
        <div key={category.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>

          {/* Widgets */}
          <div className="grid grid-cols-3 gap-4">
            {filteredWidgets(category.widgets).map(widget => (
              <div key={widget.id} className="relative p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium mb-2">{widget.name}</h3>

                {/* First Widget: Cloud Accounts */}
                {widget.id === 'widget-1' && (
                  <div className="flex">
                    <div style={{ width: 80, height: 80, marginRight: 20 }}>
                      <CircularProgressbar
                        value={(widget.data.connected / (widget.data.connected + widget.data.notConnected)) * 100}
                        text={`${widget.data.connected}`}
                        styles={buildStyles({
                          pathColor: `#3498db`,
                          textColor: '#3498db',
                          trailColor: '#d6d6d6',
                        })}
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          
                          readOnly
                          className="mr-2"
                        />
                        <span className="text-gray-700">Connected ({widget.data.connected})</span>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          readOnly
                          className="mr-2"
                        />
                        <span className="text-gray-700">Not Connected ({widget.data.notConnected})</span>
                      </div>
                    </div>
                  </div>
                )}

                
                {widget.id === 'widget-2' && (
                  <div className="flex">
                    <div style={{ width: 80, height: 80, marginRight: 20 }}>
                      <CircularProgressbar
                        value={(widget.data.riskLevels.critical / widget.data.total) * 100}
                        text={`${widget.data.total}`}
                        styles={buildStyles({
                          pathColor: `	#008000`,
                          textColor: '#e74c3c',
                          trailColor: '#d6d6d6',
                        })}
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      
                      <div className="flex items-center mb-2">
                        <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                        <div className="text-gray-700">Failed ({widget.data.riskLevels.critical})</div>
                      </div>

                      
                      <div className="flex items-center mb-2">
                        <span className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
                        <div className="text-gray-700">Warning ({widget.data.riskLevels.high})</div>
                      </div>

                      
                      <div className="flex items-center mb-2">
                        <span className="w-4 h-4 bg-gray-500 rounded-full mr-2"></span>
                        <div className="text-gray-700">Not Available ({widget.data.riskLevels.medium})</div>
                      </div>

                    
                      <div className="flex items-center mb-2">
                        <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                        <div className="text-gray-700">Passed ({widget.data.riskLevels.low})</div>
                      </div>
                    </div>
                  </div>
                )}

                
                {widget.id === 'widget-4' && (
                  <div className="flex items-center justify-center flex-col text-center py-10">
                    <FiBarChart2 className="text-4xl text-gray-400 mb-2" />
                    <p className="text-gray-600">No graph data available</p>
                  </div>
                )}

                {widget.id === 'widget-5' && (
                  <div className="flex items-center justify-center flex-col text-center py-10">
                    <FiBarChart2 className="text-4xl text-gray-400 mb-2" />
                    <p className="text-gray-600">No graph data available</p>
                  </div>
                )}

                
                {widget.id === 'widget-6' && (
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-600 mb-4">1470 Total Vulnerabilities</p>

                   
                    <div className="flex h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: '20%' }}></div>
                      <div className="h-full bg-orange-500" style={{ width: '40%' }}></div>
                      <div className="h-full bg-yellow-500" style={{ width: '30%' }}></div>
                      <div className="h-full bg-gray-400" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                )}

                
                <button
                  onClick={() => handleRemoveWidget(category.id, widget.id)}
                  className="absolute top-2 right-2 text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            
            <button
              onClick={() => openModal(category.id)}
              className="flex items-center justify-center p-4 bg-blue-100 border-2 border-dashed border-blue-500 rounded-lg text-blue-500 hover:bg-blue-50"
            >
              Add Widget
            </button>
          </div>
        </div>
      ))}

     
      {isModalOpen && (
  <div className="fixed inset-0 flex items-start justify-end bg-black bg-opacity-50">
    <div className="bg-white h-screen w-1/3 p-6 rounded-l-lg shadow-lg relative">
      
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
      >
        &times;
      </button>
      
      
      <div className="bg-blue-100 py-4 px-6 border-b border-blue-500">
        <h2 className="text-xl font-semibold text-blue-700 ">Add New Widget</h2>
      </div>

     
      <div className="flex-1 overflow-y-auto p-6">
        <input
          type="text"
          placeholder="Widget Name"
          className="w-full px-4 py-2 border border-blue-300 rounded-lg mb-4"
          value={newWidget.name}
          onChange={e => setNewWidget({ ...newWidget, name: e.target.value })}
        />
        <select
          className="w-full px-4 py-2 border border-blue-300 rounded-lg mb-4"
          value={newWidget.type}
          onChange={e => setNewWidget({ ...newWidget, type: e.target.value })}
        >
          <option value="chart">Chart</option>
          <option value="text">Text</option>
        </select>
      </div>

      
      <div className="flex justify-end p-6 border-t border-blue-500">
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleAddWidget}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Dashboard;
