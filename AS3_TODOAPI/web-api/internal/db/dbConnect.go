package db

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var database *gorm.DB

func ConnectDB() {
	//TODO : change to .env routing when running on docker 
	db, err := gorm.Open(mysql.Open("root:admin@tcp(localhost:3406)/ToDo?parseTime=True"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to database")
	}
	database = db
}

func GetDB() *gorm.DB {
	return database
}
