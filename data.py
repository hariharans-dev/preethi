import pandas as pd
from pymongo import MongoClient

def upload_csv_to_mongodb(csv_file_path, mongo_uri, database_name, collection_name):
    # Read CSV file into a pandas DataFrame
    df = pd.read_csv(csv_file_path)

    # Create a MongoDB client
    client = MongoClient(mongo_uri)

    # Access the specified database
    db = client[database_name]

    # Access the specified collection
    collection = db[collection_name]

    # Convert DataFrame to a list of dictionaries
    data = df.to_dict(orient='records')

    # Insert data into the collection
    collection.insert_many(data)

    print("Data successfully uploaded to MongoDB!")

# Replace these values with your details
csv_file_path = 'dataset.csv'  # Path to your CSV file
mongo_uri = 'mongodb+srv://preethi:kuralbot@cluster0.fp877.mongodb.net'  # Your MongoDB URI
database_name = 'thirukural'  # Your database name
collection_name = 'KuralDetails'  # Your collection name

# Call the function to upload data
upload_csv_to_mongodb(csv_file_path, mongo_uri, database_name, collection_name)
