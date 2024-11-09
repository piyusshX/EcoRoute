import pandas as pd
import os
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error, r2_score


# Directory of the current file
base_dir = os.path.dirname(__file__)

# Use base_dir for consistent file access
DATA_PATH = os.path.join(base_dir, 'vehicle_emission_data.csv')

# File paths
MODEL_PATH = os.path.join(base_dir, 'emission_model.pkl')

# Load data
data = pd.read_csv(DATA_PATH)

# Separate features (X) and target variable (y)
X = data[["vehicle_type", "fuel", "distance", "halt"]]
y = data["emission"]

# Define the pipeline for preprocessing and model
pipeline = Pipeline([
    ("preprocessor", ColumnTransformer([
        ("onehot", OneHotEncoder(), ["vehicle_type", "fuel"])
    ], remainder="passthrough")),
    ("regressor", RandomForestRegressor(random_state=0))
])

def train_and_save_model():
    """Train the model if not already saved, then save it to .pkl file. Returns model and accuracy metrics."""
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, "rb") as file:
            model = pickle.load(file)
        print("Model loaded from emission_model.pkl")

        # Evaluate model on the entire dataset to get accuracy metrics
        y_pred = model.predict(X)
        mse = mean_squared_error(y, y_pred)
        r2 = r2_score(y, y_pred)
    else:
        # Split data into training and test sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
        
        # Train model
        model = pipeline.fit(X_train, y_train)
        
        # Save the model
        with open(MODEL_PATH, "wb") as file:
            pickle.dump(model, file)
        print("Model trained and saved to emission_model.pkl")
        
        # Evaluate model on the test set for accuracy
        y_pred = model.predict(X_test)
        mse = mean_squared_error(y_test, y_pred)
        r2 = r2_score(y_test, y_pred)

    return model, mse, r2

def predict_emission(input_data):
    """Return predicted emission for given input data."""
    # Ensure model is loaded
    model, _, _ = train_and_save_model()

    # Convert input_data to a DataFrame with the same structure as the original training data
    input_df = pd.DataFrame([input_data], columns=["vehicle_type", "fuel", "distance", "halt"])
    
    # Predict the emission
    prediction = model.predict(input_df)
    return prediction[0]

if __name__ == "__main__":
    # Train or load model and retrieve accuracy
    model, mse, r2 = train_and_save_model()
    
    # Print accuracy metrics
    print(f"Mean Squared Error: {mse}")
    print(f"R² Score: {r2}")
    
    # Test with an example input
    example_input = ["Scooter", "electric", 1500, 3]  # Example: vehicle_type, fuel, distance, halt
    example_prediction = predict_emission(example_input)
    
    print(f"Example Prediction for input {example_input}: {example_prediction} grams of CO₂")
