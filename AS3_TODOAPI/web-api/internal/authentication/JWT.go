package authentication

import (
	"errors"
	"time"
	"web-api/internal/db"

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

func ExtractClaimsFromJWTToken(tokenString string) (jwt.MapClaims, error) {
	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("Unexpected signing method")
		}
		return []byte(JWT_SEC_KEY), nil
	})

	// Check for errors during parsing
	if err != nil {
		return nil, err
	}

	// Check if the token is valid
	if !token.Valid {
		return nil, errors.New("Invalid token")
	}

	// Extract and return the claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("Invalid claims")
	}

	return claims, nil
}

func GetUserIDFromToken(tokenString string) (int, error) {
	claims, err := ExtractClaimsFromJWTToken(tokenString)
	if err != nil {
		return 0, err
	}

	users, err := GetUserByUsername(db.GetDB(), claims["username"].(string))
	if err != nil {
		return 0, err
	}

	return users.ID, nil

}
