import React, { useState, useEffect } from 'react';

// Dummy data with dates
const dummyData = {
    'Tomato & Basil': [
      { name: 'Tomato Pasta', date: '2024-04-25', ingredients: ['Tomato', 'Basil', 'Pasta', 'Olive oil'] },
      { name: 'Caprese Salad', date: '2024-04-24', ingredients: ['Tomato', 'Basil', 'Mozzarella', 'Olive oil'] },
      { name: 'Bruschetta', date: '2024-04-22', ingredients: ['Tomato', 'Basil', 'Garlic', 'Baguette', 'Olive oil'] },
    ],
    'Garlic & Onion': [
      { name: 'Garlic Chicken', date: '2024-04-23', ingredients: ['Chicken', 'Garlic', 'Onion', 'Thyme'] },
      { name: 'French Onion Soup', date: '2024-04-21', ingredients: ['Onion', 'Beef stock', 'Butter', 'Thyme', 'Baguette', 'Cheese'] },
    ],
    'Chocolate & Vanilla': [
      { name: 'Chocolate Cake', date: '2024-04-18', ingredients: ['Chocolate', 'Flour', 'Sugar', 'Vanilla', 'Baking Powder'] },
      { name: 'Vanilla Chocolate Chip Ice Cream', date: '2024-04-15', ingredients: ['Milk', 'Sugar', 'Vanilla', 'Chocolate Chips'] },
    ],
    'Chicken & Rice': [
      { name: 'Chicken Fried Rice', date: '2024-04-26', ingredients: ['Chicken', 'Rice', 'Egg', 'Peas', 'Carrots', 'Soy Sauce'] },
      { name: 'Chicken Risotto', date: '2024-04-19', ingredients: ['Chicken', 'Risotto Rice', 'Onion', 'White Wine', 'Chicken Stock'] },
    ],
    'Beef & Mushroom': [
      { name: 'Beef Stroganoff', date: '2024-04-16', ingredients: ['Beef', 'Mushrooms', 'Onion', 'Sour Cream', 'Butter', 'Flour'] },
      { name: 'Mushroom Beef Burger', date: '2024-04-17', ingredients: ['Beef', 'Mushrooms', 'Bread Buns', 'Lettuce', 'Tomato'] },
    ],
    'Fish & Lemon': [
      { name: 'Grilled Salmon', date: '2024-04-20', ingredients: ['Salmon', 'Lemon', 'Dill', 'Butter'] },
      { name: 'Lemon Herbed Cod', date: '2024-04-23', ingredients: ['Cod', 'Lemon', 'Parsley', 'Thyme'] },
    ],
    // ... continue adding more combinations and recipes
  };
  

export default function RecipeList() {
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [openCombos, setOpenCombos] = useState({});

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(dummyData);

  const toggleCombo = (combo) => {
    setOpenCombos(prev => ({
      ...prev,
      [combo]: !prev[combo]
    }));
  };



  useEffect(() => {
    const filtered = Object.entries(dummyData)
      .map(([combo, recipes]) => {
        const filteredRecipes = recipes
          .filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date
        return filteredRecipes.length > 0 ? { [combo]: filteredRecipes } : null;
      })
      .filter(Boolean)
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});
    setFilteredRecipes(filtered);
  }, [searchTerm]);

  const handleComboClick = (combo) => {
    setSelectedCombo(selectedCombo === combo ? null : combo);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-5">
        <h1 className="text-3xl font-bold text-center mb-6">Delicious Recipes</h1>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full p-4 text-lg rounded shadow-inner"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(filteredRecipes).map(([combo, recipes]) => (
            <div key={combo} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div
                className="p-5 cursor-pointer hover:bg-blue-100"
                onClick={() => toggleCombo(combo)}
              >
                <h2 className="text-xl font-bold text-blue-600">{combo}</h2>
              </div>
              <div className={`transition-height duration-500 ease-in-out ${openCombos[combo] ? 'max-h-80' : 'max-h-0'} overflow-hidden`}>
                {recipes.map((recipe, index) => (
                  <div key={index} className="border-t border-gray-200">
                    <div className="p-5">
                      <h3 className="font-bold">{recipe.name}</h3>
                      <p className="text-gray-500 text-sm">{new Date(recipe.date).toLocaleDateString()}</p>
                      <ul className="list-disc list-inside">
                        {recipe.ingredients.map((ingredient, idx) => (
                          <li key={idx} className="text-gray-600">{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
