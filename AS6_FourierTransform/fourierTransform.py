import pandas as pd
import numpy as np

# Replace 'your_excel_file.xlsx' with the actual path to your Excel file
excel_file_path = 'data.xlsx'

# Read the Excel file into a pandas DataFrame
df = pd.read_excel(excel_file_path)

# Extracting time and amplitude columns
time = df['time']
amplitude = df['Sum']

# Parameters
dataLength = len(time)
SamplingRate = 100 
N = 100  # Number of data points

# Initialize arrays
Re_X = np.zeros(dataLength)
Re_X_Bar = np.zeros(dataLength)
Im_X = np.zeros(dataLength)
Im_X_Bar = np.zeros(dataLength)
Frequency = np.zeros(dataLength)

# Compute Fourier Transform
for k in range(N//2):
    for i in range(N-1):
        Re_X[k] += amplitude[i] * np.cos(2 * np.pi * k * i / N)
        Im_X[k] -= amplitude[i] * np.sin(2 * np.pi * k * i / N)

# Normalize and round the values
for k in range(N//2):
    Frequency[k] = round((k/N)*SamplingRate, 2)
    Im_X_Bar[k] = round(-(Im_X[k]/(N/2)), 2)
    if k == 0 or k == N//2:
        Re_X_Bar[k] = round(Re_X[k]/N, 2)
    else:
        Re_X_Bar[k] = round(Re_X[k]/(N/2), 2)

# Create a DataFrame with the results
results_df = pd.DataFrame({
    'time': time,
    'amplitude': amplitude,
    'k': np.arange(dataLength),
    'ReX': Re_X,
    'ImX': Im_X,
    'ReXBar': Re_X_Bar,
    'ImXBar': Im_X_Bar,
    'Frequency': Frequency
})

filename = f'fourier_results_sr{SamplingRate}_N{N}.csv'
results_df.to_csv(filename, index=False)


print(f"Results saved to {filename}")

