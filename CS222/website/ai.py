from openai import OpenAI
import openai
from dotenv import load_dotenv
import os
def call_ai(ingredients): 
  load_dotenv() 
  openai_api_key = os.getenv("OPENAI_API_KEY")
  print("here")
  client = OpenAI(api_key=openai_api_key)
  try:
    #ingredients = input("Input ingredients, separated by commas: ")
    items = [item.strip() for item in ingredients]
    for item in items:
      if len(item) >= 20:
        raise ValueError("Please limit each item to less than or equal to 20 characters long")
  
    ingredients_str = ', '.join(ingredients)
    prompt = f"Given these ingredients: {ingredients_str}, what are some recipes I can make?"

    response = client.chat.completions.create(
    model="gpt-3.5-turbo", 
    messages=[
        {"role": "system", "content": "Sure."},
      {"role": "user", "content": f"Given these ingredients: {ingredients_str}, what are 5 recipes I can make? Please put them in numbered order."}
    ]
  )
    print(response.choices[0].message)
    return response.choices[0].message.content
    
  except ValueError as e:
    print(e)
    
#ingredients = input("Input ingredients, separated by commas: ")
#call_ai(ingredients)