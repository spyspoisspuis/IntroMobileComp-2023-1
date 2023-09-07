package main

import (
	"fmt"
	"web-api/internal/db"
	"web-api/internal/router"
)

func main() {
	fmt.Println("Service Available-------------")
	// util.InitViper()
	db.ConnectDB()

	// defer db.DisconnectDB()

	// db.ConnectRedis()
	// defer db.DisconnectRedis()

	r := router.RouterEngine()

	r.Run(fmt.Sprintf(":8100"))
	// viper.GetInt("connection.appPort")
}
