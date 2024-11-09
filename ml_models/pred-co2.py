import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import joblib

# Load the dataset
data = pd.read_csv('vehicle_emission_data.csv')

# One-hot encode the categorical variables 'vehicle_type' and 'fuel'
data = pd.get_dummies(data, columns=['vehicle_type', 'fuel'], drop_first=True)

# Split data into features (X) and target variable (y)
X = data.drop('emission', axis=1)  # Features (input)
y = data['emission']  # Target variable (output)

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the RandomForestRegressor model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict emissions on the test set
predictions = model.predict(X_test)

# Evaluate the model using Mean Squared Error
mse = mean_squared_error(y_test, predictions)
print(f"Mean Squared Error: {mse}")

# Save the trained model to a file for future use
joblib.dump(model, 'ep.pkl')

# Load the model for prediction
model = joblib.load('ep.pkl')

# Example new data for prediction (without one-hot encoding)
new_data = pd.DataFrame({
    'vehicle_type': "Motorcycle", 
    'fuel': "Petrol",
    'distance': [150],
    'halt': [1.0],
    'speedcap': [90],
})

# One-hot encode the new data, same as we did for training data
new_data = pd.get_dummies(new_data)

# Get the list of columns that were used in the training dataset
missing_cols = set(X.columns) - set(new_data.columns)

# Add missing columns to the new data, and set them to 0
for col in missing_cols:
    new_data[col] = 0

# Ensure the new data has the same column order as the training data
new_data = new_data[X.columns]

# Predict the emission for the new data
emission_prediction = model.predict(new_data)
print(f"Predicted Carbon Emission: {emission_prediction[0]}")

