package activity

import (
	"web-api/internal/models"

	"gorm.io/gorm"
)

func InsertActivityDB(db *gorm.DB, activity *models.Activity) (int, error) {
	if err := db.Create(&activity).Error; err != nil {
		return 0, err
	}
	return activity.ID, nil
}

func GetActivitiesList(db *gorm.DB) ([]*models.Activity,error) {
	var activities []*models.Activity
	if err := db.Find(&activities).Error; err != nil {
		return nil,err
	}
	return activities,nil
}

func GetActivityByIDDB(db *gorm.DB,  id string) (*models.Activity,error) {
	var activity *models.Activity
	if err := db.Where("id=?", id).First(&activity).Error; err != nil {
		return nil,err
	}
	return activity,nil
}

func UpdateActivityDB(db *gorm.DB, activity *models.Activity) error {
	return db.Where("id=?", activity.ID).Save(&activity).Error
}

func DeleteActivityDB(db *gorm.DB, id string) error {
	return db.Where("id=?", id).Delete(&models.Activity{}).Error
}
