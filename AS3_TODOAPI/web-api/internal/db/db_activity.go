package db

import (
	"web-api/internal/util"
)

func InsertActivity(activity util.Activity) error {
	if err := database.Create(&activity).Error; err != nil {
		return err
	}
	return nil
}

func GetActivitiesList(activity *[]util.Activity) error {
	if err := database.Find(activity).Error; err != nil {
		return err
	}
	return nil
}

func GetActivityByID(activity *util.Activity, id string) error {
	if err := database.Where("id=?", id).First(activity).Error; err != nil {
		return err
	}
	return nil
}

func UpdateActivity(activity util.Activity) error {
	if err := database.Where("id=?",activity.ID).Save(activity).Error; err != nil {
		return err
	}
	return nil
} 

func DeleteActivity(activity util.Activity,id string) error {
	if err := database.Where("id=?",id).Delete(activity).Error; err != nil {
		return err
	}
	return nil
} 

