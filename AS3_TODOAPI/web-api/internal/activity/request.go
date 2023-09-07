package activity

import (
	"net/http"
	"web-api/internal/db"
	"web-api/internal/util"

	"github.com/gin-gonic/gin"
)

func GetActivities(c *gin.Context) {
	var activities []util.Activity
	err := db.GetActivitiesList(&activities)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, activities)

}

func GetActivityByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var activity util.Activity
	err := db.GetActivityByID(&activity, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
		return
	}

	c.JSON(http.StatusOK, activity)

}

func InsertActivity(c *gin.Context) {
	var inp util.Activity
	if err := c.ShouldBind(&inp); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
	}

	err := db.InsertActivity(inp)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusCreated)
}

func UpdateActivity(c *gin.Context) {
	id := c.Params.ByName("id")
	var inp util.Activity
	if err := c.ShouldBind(&inp); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
	}
	err := db.UpdateActivity(inp, id)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusOK)
}

func DeleteActivity(c *gin.Context) {
	id := c.Params.ByName("id")
	var activity util.Activity
	err := db.DeleteActivity(activity, id)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusOK)
}	
