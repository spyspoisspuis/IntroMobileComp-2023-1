package router

import (
	"web-api/internal/activity"
	"web-api/internal/authentication"

	"github.com/gin-gonic/gin"
)

func RouterEngine() *gin.Engine {
	r := gin.Default()
	r.Use(CORS())
	r.POST("/user/login", authentication.Authentication)
	r.PUT("/reset-password", authentication.ResetPassword)
	r.POST("/user", authentication.InsertUser)

	r.Use(authentication.AuthMiddleware())
	activities := r.Group("/activities")
	{
		activities.GET("", activity.GetActivities)
		activities.GET("/id/:id", activity.GetActivityByID)
		activities.GET("/user", activity.GetActivitiesByUser)
		activities.POST("", activity.InsertActivity)
		activities.PUT("", activity.UpdateActivity)
		activities.DELETE("/:id", activity.DeleteActivity)
	}
	user := r.Group("/users")
	{
		user.GET("", authentication.GetUsersList)
		user.GET("/:id", authentication.GetUserByID)
		user.DELETE("/:id", authentication.DeleteUser)
	}

	return r
}

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		// targets := viper.GetString("cors.target")
		targets := "http://127.0.0.1:5173"
		c.Writer.Header().Set("Access-Control-Allow-Origin", targets)
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
