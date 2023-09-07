package authentication

import (
	"net/http"
	"web-api/internal/db"
	"web-api/internal/util"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Authentication(c *gin.Context) {
	var inp util.User
	if err := c.ShouldBind(&inp); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "ErrBadRequest"})
	}
	isUserNameExists, err := checkUsernameExists(inp.Username)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	if !isUserNameExists {
		c.JSON(http.StatusNotFound, gin.H{"message1": "username or password incorrect"})
		return
	}

	var user util.User
	err = db.GetUserByUsername(&user, inp.Username)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	salt := user.Salt
	saltedpassword := inp.Password + salt


	if er := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(saltedpassword)); er != nil {
		c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "username or password incorrect"})
		return
	}
	token, err := GenerateJWTToken(user.Username)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK,gin.H{"token":token})

}

func InsertUser(c *gin.Context) {
	var inp util.User
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

	err = insertUser(inp.Username, inp.Password)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusCreated)
}

func DeleteUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user util.User
	err := db.DeleteUser(user, id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.Status(http.StatusOK)
}

func GetUsersList(c *gin.Context) {
	var users []util.User
	err := db.GetUserList(&users)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": users})
}

func GetUserByUsername(c *gin.Context) {
	username := c.Params.ByName("username")
	var user util.User
	err := db.GetUserByUsername(&user, username)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": user})

}
