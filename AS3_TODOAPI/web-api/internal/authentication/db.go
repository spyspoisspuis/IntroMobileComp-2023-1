package authentication

import (
	"web-api/internal/models"

	"gorm.io/gorm"
)

func GetUserList(db *gorm.DB) ([]*models.User, error) {
	var users []*models.User
	if err := db.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}
func GetUserByIDDB(db *gorm.DB, id int) (*models.User, error) {
	var user *models.User
	if err := db.Where("id=?", id).First(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func GetUserByUsername(db *gorm.DB, username string) (*models.User, error) {
	var user *models.User
	if err := db.Where("username=?", username).First(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func InsertUserDB(db *gorm.DB, user *models.User) error {
	if err := db.Create(&user).Error; err != nil {
		return err
	}
	return nil
}

func DeleteUserDB(db *gorm.DB, id string) error {
	if err := db.Where("id=?", id).Delete(&models.User{}).Error; err != nil {
		return err
	}
	return nil
}
