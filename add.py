from pymongo import MongoClient

def add_kural_numbers(mongo_uri, database_name, collection_name):
    # Create a MongoDB client
    client = MongoClient(mongo_uri)
    
    # Access the specified database and collection
    db = client[database_name]
    collection = db[collection_name]
    
    # Fetch all documents from the collection
    documents = collection.find()
    
    # Initialize a counter for Kural numbers
    kural_number = 1
    
    for doc in documents:
        # Update each document with a new Kural number
        collection.update_one(
            {'_id': doc['_id']},  # Match document by unique _id
            {'$set': {'KuralNumber': kural_number}}
        )
        kural_number += 1
    
    print("Kural numbers added to the MongoDB collection!")

mongo_uri = 'mongodb+srv://preethi:kuralbot@cluster0.fp877.mongodb.net'  # Your MongoDB URI
database_name = 'thirukural'  # Your database name
collection_name = 'KuralDetails' 

# Call the function to add Kural numbers
add_kural_numbers(mongo_uri, database_name, collection_name)
