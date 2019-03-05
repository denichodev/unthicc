package key

import (
	"context"

	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
	"github.com/mongodb/mongo-go-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func setupService() *Service {
	client, err := mongo.Connect(context.TODO(), "mongodb://root:example@mongo:27017")
	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	keyRepo := NewMongoRepository(client)
	return NewService(keyRepo)
}

// Routes for all keys feature
func Routes() *chi.Mux {
	router := chi.NewRouter()

	keyService := setupService()

	router.Get("/ping", ping(keyService))

	return router
}

func ping(service *Service) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		response := make(map[string]string)
		response["message"] = "success!"

		newId, err := service.Generate()
		if err != nil {
			log.Printf("Error occured, %s", err)
			render.JSON(w, r, response)
		}
		b := newId.(primitive.ObjectID)

		log.Println(b)

		render.JSON(w, r, response)
	}
}
