from flask import Blueprint, render_template, jsonify, request
from markupsafe import escape
from .ai import call_ai
from flask_login import current_user
from .models import Recipe, db
from flask_cors import CORS, cross_origin
base = Blueprint('base', __name__)
CORS(base)
@base.route('/recipe', methods=['POST'])
@cross_origin()
def recipe_generator():
    data = request.json
    # Check if data is a dictionary and has 'ingredients' key which is a list
    if not isinstance(data, dict) or 'ingredients' not in data or not isinstance(data['ingredients'], list):
        return jsonify({'error': 'Invalid request format'}), 400
    
    # Extract 'name' from each ingredient dictionary, ensuring 'name' key is present
    ingredients_names = [ingredient['name'] for ingredient in data['ingredients'] if 'name' in ingredient]
    
    # Call your AI function to process the ingredients names
    result = call_ai(ingredients_names)
    
    # Create a new Recipe object
    new_recipe = Recipe(
        ingredients=str(ingredients_names),
        result=result,
    )
    db.session.add(new_recipe)
    db.session.commit()
    
    # Return the result in JSON format
    return jsonify(result=result)
