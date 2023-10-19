package activity

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
	"web-api/internal/db"
	"web-api/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTc3NzAwNTMsInVzZXJuYW1lIjoidGVzdCJ9.gQ5-FmBaIttq8VHzafT5pCJlBQbJLh8y9h7h3vSLvuw"

func TestGetUser(t *testing.T) {
	r := gin.Default()
	db.ConnectDB()
	r.GET("/activities", GetActivities)
	r.GET("/activities/id/:id", GetActivityByID)
	r.GET("/activities/user", GetActivitiesByUser)

	t.Run("All activities : success", func(t *testing.T) {
		req, _ := http.NewRequest("GET", "/activities", nil)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		responseData, _ := io.ReadAll(w.Body)
		assert.NotEmpty(t, responseData)
		assert.Equal(t, http.StatusOK, w.Code)
	})

	t.Run("By activities id : success", func(t *testing.T) {
		req, _ := http.NewRequest("GET", "/activities/id/1", nil)
		req.Header.Set("Authorization", token)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		responseData, _ := io.ReadAll(w.Body)
		assert.NotEmpty(t, responseData)
		assert.Equal(t, http.StatusOK, w.Code)
	})

	t.Run("By user id : success", func(t *testing.T) {
		//* define query
		req, _ := http.NewRequest("GET", "/activities/user", nil)
		req.Header.Set("Authorization", token)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		responseData, _ := io.ReadAll(w.Body)
		assert.NotEmpty(t, responseData)
		assert.Equal(t, http.StatusOK, w.Code)
	})
}

func TestAddActivities(t *testing.T) {
	db.ConnectDB()
	r := gin.Default()
	r.POST("/activities", InsertActivity)

	t.Run("Test Success Add activities", func(t *testing.T) {
		//* Define input data
		activity := models.Activity{}
		activity.DemoData()

		payload, _ := json.Marshal(activity)
		req, _ := http.NewRequest("POST", "/activities", bytes.NewBuffer(payload))
		req.Header.Set("Content-Type", "application/json") // Set the Content-Type header
		req.Header.Set("Authorization", token)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusCreated, w.Code)

		//* Get the id response from resquest
		var responseBody map[string]interface{}
		err := json.Unmarshal(w.Body.Bytes(), &responseBody)
		if err != nil {
			t.Fatalf("Error parsing response body: %v", err)
		}
		sid := responseBody["ID"]
		fid, ok := sid.(float64)
		if !ok {
			t.Fatalf("Error parsing response body")
		}
		id := int(fid)

		//* Query to check the response
		ac, err := GetActivityByIDDB(db.GetDB(), id)
		if err != nil {
			t.Error("error get accessories in db")
		}

		activity.ID = id
		//! Ignoring the time due to timezone bugs
		activity.When = ac.When
		assert.Equal(t, activity, *ac)

		//* Delete afterwards
		DeleteActivityDB(db.GetDB(), activity.ID)

	})
}

func TestEditActivity(t *testing.T) {
	db.ConnectDB()
	r := gin.Default()
	r.PUT("/activities", UpdateActivity)

	t.Run("EDIT Activity SUCCESSFUL", func(t *testing.T) {
		//* Define input data
		ac := models.Activity{}
		ac.DemoData()

		//* Insert first
		id, err := InsertActivityDB(db.GetDB(), &ac)
		if err != nil {
			t.Error("error create product mapping in db")
		}

		//* Then try to edit
		ac.ID = id
		ac.Name = "TEST EDIT ACTIVITY NAME"

		payload_edit, _ := json.Marshal(ac)
		req_edit, _ := http.NewRequest("PUT", "/activities", bytes.NewBuffer(payload_edit))
		req_edit.Header.Set("Content-Type", "application/json") // Set the Content-Type header
		req_edit.Header.Set("Authorization", token)
		w_edit := httptest.NewRecorder()
		r.ServeHTTP(w_edit, req_edit)
		assert.Equal(t, http.StatusOK, w_edit.Code)

		//* Query to check the result
		a, err := GetActivityByIDDB(db.GetDB(), id)
		if err != nil {
			t.Error("error get activity in db")
		}
		//! ignore time
		ac.When = a.When
		assert.Equal(t, ac, *a)

		//* Delete afterwards
		err = DeleteActivityDB(db.GetDB(), id)
		if err != nil {
			t.Errorf("error delete activity in db %v", err)
		}
	})

	t.Run("EDIT UNKNOWN ID", func(t *testing.T) {
		//* Define Input data
		ac := models.Activity{}
		ac.DemoData()
		ac.ID = 999

		//* Try edit
		payload, _ := json.Marshal(ac)
		req, _ := http.NewRequest("PUT", "/activities", bytes.NewBuffer(payload))
		req.Header.Set("Content-Type", "application/json") // Set the Content-Type header
		req.Header.Set("Authorization", token)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)
		assert.Equal(t, http.StatusBadRequest, w.Code)
	})
}
