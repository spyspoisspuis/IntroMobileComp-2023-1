import * as SecureStore from "expo-secure-store"

export const saveSecureValue = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
}

export const getSecureValue = async (key) => {
    return await SecureStore.getItemAsync(key);
}

export const deleteSecureValue = async (key) => {
    await SecureStore.deleteItemAsync(key);
}
