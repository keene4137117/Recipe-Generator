import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AppleIcon from '@mui/icons-material/Apple';
import IcecreamIcon from '@mui/icons-material/Icecream';
import EggIcon from '@mui/icons-material/Egg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState({ name: '', quantity: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [editMode, setEditMode] = useState({ active: false, index: null });
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendIngredientsToServer = async () => {
    if (ingredients.length === 0) {
      setSnackbarMessage('No ingredients to send!');
      setOpenSnackbar(true);
      return;
    }
  
    setIsLoading(true);
    console.log('Sending Ingredients:', ingredients);
    try {
      const response = await fetch('http://127.0.0.1:5001/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingredients })
      });
  
      if (response.ok) {
        const data = await response.json();
        
        console.log('Response:', data.result); // Ensure you receive the expected data
        setGeneratedRecipe(data.result); // Display the entire JSON response formatted
        setSnackbarMessage('Recipe generated successfully!');
      } else {
        throw new Error('Failed to fetch recipe');
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setSnackbarMessage('Error: ' + error.message);
    } finally {
      setIsLoading(false);
      setOpenSnackbar(true);
    }
  };
  

  const handleIngredientChange = (event) => {
    setCurrentIngredient({ ...currentIngredient, name: event.target.value });
  };

  const handleQuantityChange = (event) => {
    setCurrentIngredient({ ...currentIngredient, quantity: event.target.value });
  };

  const saveOrEditIngredient = () => {
    if (!currentIngredient.name.trim() || !currentIngredient.quantity.trim()) {
      setSnackbarMessage('Please fill in both name and quantity!');
      setOpenSnackbar(true);
      return;
    }

    if (editMode.active) {
      const newIngredients = [...ingredients];
      newIngredients[editMode.index] = currentIngredient;
      setIngredients(newIngredients);
      setSnackbarMessage('Ingredient updated!');
    } else {
      if (ingredients.find(ingredient => ingredient.name === currentIngredient.name)) {
        setSnackbarMessage('This ingredient is already added!');
        setOpenSnackbar(true);
        return;
      }
      setIngredients(prevIngredients => [...prevIngredients, currentIngredient]);
      setSnackbarMessage('Ingredient added!');
    }

    setCurrentIngredient({ name: '', quantity: '' });
    setOpenSnackbar(true);
    setEditMode({ active: false, index: null });
  };

  const deleteIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
    setSnackbarMessage('Ingredient removed!');
    setOpenSnackbar(true);
  };

  const editIngredient = (index) => {
    setCurrentIngredient(ingredients[index]);
    setEditMode({ active: true, index });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      saveOrEditIngredient();
    }
  };

  const getIconForIngredient = (name) => {
    switch (name.toLowerCase()) {
      case 'apple': return <AppleIcon className="text-red-500" />;
      case 'ice cream': return <IcecreamIcon className="text-pink-400" />;
      case 'egg': return <EggIcon className="text-yellow-500" />;
      case 'fast food': return <FastfoodIcon className="text-green-500" />;
      default: return <FastfoodIcon className="text-gray-500" />;
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="container mt-10 mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h4 className="text-2xl font-bold mb-6 text-gray-800">Enter Your Ingredient List</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Enter an ingredient"
                className="input input-bordered w-full p-3 text-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={currentIngredient.name}
                onChange={handleIngredientChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                placeholder="Quantity"
                className="input input-bordered w-full p-3 text-lg border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={currentIngredient.quantity}
                onChange={handleQuantityChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <button
            className="btn btn-primary mt-6 py-3 px-6 text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            onClick={saveOrEditIngredient}
          >
            {editMode.active ? 'Update Ingredient' : 'Save Ingredient'}
          </button>
          {ingredients.length > 0 && (
            <div className="overflow-auto max-h-96 bg-base-100 rounded-lg mt-6 p-4 shadow">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50">
                  <p className="flex-grow text-lg">{`${ingredient.name} - ${ingredient.quantity}`}</p>
                  {getIconForIngredient(ingredient.name)}
                  <button className="btn btn-sm btn-circle" onClick={() => editIngredient(index)}>
                    <EditIcon className="h-5 w-5" />
                  </button>
                  <button className="btn btn-sm btn-circle" onClick={() => deleteIngredient(index)}>
                    <DeleteIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="md:col-span-1">
          <div className="sticky top-4 bg-base-100 rounded-lg p-6 shadow-lg">
            <h5 className="text-lg font-bold mb-4 text-gray-800">Generated Recipe</h5>
            <div className={`prose overflow-auto ${generatedRecipe ? 'prose-stone' : 'text-gray-500'}`} style={{ wordWrap: 'break-word' }}>
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <CircularProgress />
                </div>
              ) : (
                <pre style={{ whiteSpace: 'pre-wrap' }}>{generatedRecipe || 'No recipe generated yet. Try adding some ingredients!'}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary mt-3 py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={sendIngredientsToServer}
      >
        Generate Recipe Ideas
      </button>
    </div>
  );
}

export default Home;
