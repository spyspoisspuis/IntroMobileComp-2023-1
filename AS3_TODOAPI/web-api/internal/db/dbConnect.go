package db

import (
	"github.com/spf13/viper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var database *gorm.DB

func ConnectDB() {
	dbUrl := viper.GetString("connection.dbUrl")
	// db, err := gorm.Open(mysql.Open("root:admin@tcp(localhost:3406)/ToDo?parseTime=True"), &gorm.Config{})
	db, err := gorm.Open(mysql.Open(dbUrl), &gorm.Config{})

	if err != nil {
		panic("failed to connect to database")
	}
	database = db
}

func GetDB() *gorm.DB {
	return database
}
