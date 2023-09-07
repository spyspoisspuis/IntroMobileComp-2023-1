package authentication

import (
    "time"
    "github.com/dgrijalva/jwt-go"
)
var JWT_SEC_KEY = "intro-mobile-asgn3"

func GenerateJWTToken(username string) (string, error) {
    // Create a new token
    token := jwt.New(jwt.SigningMethodHS256)

    // Set claims
    claims := token.Claims.(jwt.MapClaims)
    claims["username"] = username
    claims["exp"] = time.Now().Add(time.Hour * 24).Unix() // Token expiration time (adjust as needed)

    // Sign the token with a secret key
    tokenString, err := token.SignedString([]byte(JWT_SEC_KEY)) // Replace with your secret key
    if err != nil {
        return "", err
    }

    return tokenString, nil
}
