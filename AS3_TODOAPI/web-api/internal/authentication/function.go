package authentication

import (
	"crypto/rand"
	"fmt"
	"web-api/internal/db"
	"web-api/internal/models"

	"golang.org/x/crypto/bcrypt"
)

func insertUser(username, password string) (int,error) {
	newUser, err := GenerateNewUserModels(0, username, password)
	if err != nil {
		return 0,err
	}

	id,err := InsertUserDB(db.GetDB(), newUser)
	if err != nil {
		return 0,err
	}
	return id,nil
}

func GenerateHashedPassword(password, salt string) (string, error) {
	// Combine password and salt
	saltedPassword := password + salt

	// Hash the salted password using bcrypt
	hashedPassword, err := HashPassword(saltedPassword)
	if err != nil {
		return "", err
	}
	return hashedPassword, nil
}

// GenerateSalt generates a random salt
func GenerateSalt() (string, error) {
	// Generate a random salt of length 16 bytes
	salt := make([]byte, 16)
	_, err := rand.Read(salt)
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%x", salt), nil
}

// HashPassword hashes a password using bcrypt
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func checkUsernameExists(username string) (bool, error) {
	users, err := GetUserList(db.GetDB())
	if err != nil {
		return false, err
	}
	for _, user := range users {
		if username == user.Username {
			return true, nil
		}
	}
	return false, nil
}

func GenerateNewUserModels(id int, username, password string) (*models.User, error) {
	// Generate a random salt
	salt, err := GenerateSalt()
	if err != nil {
		return nil, err
	}
	hashedPassword, err := GenerateHashedPassword(password, salt)
	if err != nil {
		return nil, err
	}
	// Insert the user record into the database
	// Replace this part with your database insert logic
	newUser := &models.User{
		ID:       id,
		Username: username,
		Password: hashedPassword,
		Salt:     salt,
	}
	return newUser, nil
}
