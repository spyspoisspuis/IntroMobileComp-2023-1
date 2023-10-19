package authentication

import (
	"errors"
	"net/http"
	"strconv"
	"web-api/internal/db"
	"web-api/internal/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func Authentication(c *gin.Context) {
	var inp models.User
	if err := c.ShouldBind(&inp); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
	}
	isUserNameExists, err := checkUsernameExists(inp.Username)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if !isUserNameExists {
		c.JSON(http.StatusOK, gin.H{"result": false})
		return
	}

	user, err := GetUserByUsername(db.GetDB(), inp.Username)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	salt := user.Salt
	saltedpassword := inp.Password + salt

	if er := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(saltedpassword)); er != nil {
		c.JSON(http.StatusOK, gin.H{"result": false})
		return
	}
	token, err := GenerateJWTToken(user.Username)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"result":true,"token": token})

}

func InsertUser(c *gin.Context) {
	var inp models.User
	if err := c.ShouldBind(&inp); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
	}
	isUserNameExists, err := checkUsernameExists(inp.Username)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if isUserNameExists {
		c.JSON(http.StatusNotAcceptable, gin.H{"message": "Username Already Exists"})
		return
	}

	id, err := insertUser(inp.Username, inp.Password)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"ID": id})
}

func DeleteUser(c *gin.Context) {
	id := c.Params.ByName("id")
	err := DeleteUserDB(db.GetDB(), id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusOK)
}

func GetUsersList(c *gin.Context) {

	users, err := GetUserList(db.GetDB())
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": users})
}

func GetUserByID(c *gin.Context) {
	sid := c.Params.ByName("id")
	id, err := strconv.Atoi(sid)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
		return
	}

	user, err := GetUserByIDDB(db.GetDB(), id)
	if errors.Is(gorm.ErrRecordNotFound, err) {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
		return
	}
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"list": user})

}

func ResetPassword(c *gin.Context) {
	var inp models.User
	if err := c.ShouldBind(&inp); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
		return
	}

	//* Get user id
	users, err := GetUserByUsername(db.GetDB(), inp.Username)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"result": false})
		return
	}

	user, err := GenerateNewUserModels(users.ID, inp.Username, inp.Password)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err = UpdateUserDB(db.GetDB(), user)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	
	token, err := GenerateJWTToken(user.Username)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"result":true,"token": token})

}
