package activity

import (
	"errors"
	"net/http"
	"strconv"
	"web-api/internal/authentication"
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
	sid := c.Params.ByName("id")
	id, err := strconv.Atoi(sid)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
		return
	}
	activity, err := GetActivityByIDDB(db.GetDB(), id)
	if errors.Is(gorm.ErrRecordNotFound, err) {
		c.JSON(http.StatusOK, nil)
		return
	}
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	//* Check is user is owner
	tokenString := c.Request.Header.Get("Authorization")
	userID, err := authentication.GetUserIDFromToken(tokenString)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if userID != activity.UserID {
		c.JSON(http.StatusOK, nil)
		return
	}

	c.JSON(http.StatusOK, activity)
}

func GetActivitiesByUser(c *gin.Context) {
	//* Get userID from token
	tokenString := c.Request.Header.Get("Authorization")
	userID, err := authentication.GetUserIDFromToken(tokenString)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	activities, err := GetActivityByUserIDDB(db.GetDB(), userID)
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

func InsertActivity(c *gin.Context) {
	var inp models.Activity
	if err := c.ShouldBind(&inp); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
		return
	}

	//* Get userID from token
	tokenString := c.Request.Header.Get("Authorization")
	userID, err := authentication.GetUserIDFromToken(tokenString)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	inp.UserID = userID

	//* insert
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
	//* Get userID from token
	tokenString := c.Request.Header.Get("Authorization")
	userID, err := authentication.GetUserIDFromToken(tokenString)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	inp.UserID = userID

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
	sid := c.Params.ByName("id")
	id, err := strconv.Atoi(sid)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
		return
	}
	err = DeleteActivityDB(db.GetDB(), id)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}
	c.Status(http.StatusOK)
}
