from website import create_app
app = create_app()
#run main.py to run the program
if __name__ == '__main__':
    app.run(debug=True, port=5001)