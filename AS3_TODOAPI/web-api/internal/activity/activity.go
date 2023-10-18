package activity

import (
	"errors"
	"net/http"
	"web-api/internal/db"
	"web-api/internal/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetActivities(c *gin.Context) {
	activities, err := GetActivitiesList(db.GetDB())
	if errors.Is(gorm.ErrRecordNotFound, err) {
		c.JSON(http.StatusOK, nil)
		return
	}
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, activities)

}

func GetActivityByID(c *gin.Context) {
	id := c.Params.ByName("id")
	activity, err := GetActivityByIDDB(db.GetDB(), id)
	if errors.Is(gorm.ErrRecordNotFound, err) {
		c.JSON(http.StatusOK, nil)
		return
	}
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusOK, activity)
}

func InsertActivity(c *gin.Context) {
	var inp models.Activity
	if err := c.ShouldBind(&inp); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
		return
	}

	id, err := InsertActivityDB(db.GetDB(), &inp)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.JSON(http.StatusCreated, gin.H{"ID": id})
}

func UpdateActivity(c *gin.Context) {
	var inp models.Activity
	if err := c.ShouldBind(&inp); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	activities, err := GetActivitiesList(db.GetDB())

	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	for _, activity := range activities {
		if activity.ID == inp.ID {
			err := UpdateActivityDB(db.GetDB(), &inp)
			if err != nil {
				c.AbortWithStatus(http.StatusInternalServerError)
				return
			}
			c.Status(http.StatusOK)
			return
		}
	}
	c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
}

func DeleteActivity(c *gin.Context) {
	id := c.Params.ByName("id")
	err := DeleteActivityDB(db.GetDB(), id)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusOK)
}
