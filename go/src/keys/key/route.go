package key

import (
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
	"github.com/mongodb/mongo-go-driver/bson/primitive"
)

// func setupService() *Service {
// 	client, err := mongo.Connect(context.TODO(), "mongodb://root:example@mongo:27017")
// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	// Check the connection
// 	err = client.Ping(context.TODO(), nil)

// 	if err != nil {
// 		log.Fatal(err)
// 	}

// 	keyRepo := NewMongoRepository(client)
// 	return NewService(keyRepo)
// }

// KeyHTTPHandler  represent the httphandler for article
type KeyHTTPHandler struct {
	KeyService *Service
}

func Routes(service *Service) *chi.Mux {
	handler := &KeyHTTPHandler{
		KeyService: service,
	}

	router := chi.NewRouter()

	router.Get("/ping", handler.newPing)

	return router
}

// Routes for all keys feature
// func Routes() *chi.Mux {
// 	router := chi.NewRouter()

// 	keyService := setupService()

// 	router.Get("/ping", ping(keyService))

// 	return router
// }

func (handler *KeyHTTPHandler) newPing(w http.ResponseWriter, r *http.Request) {
	response := make(map[string]string)
	response["message"] = "success!"

	newId, err := handler.KeyService.Generate()
	if err != nil {
		log.Printf("Error occured, %s", err)
		render.JSON(w, r, response)
	}

	b := newId.(primitive.ObjectID).Hex()
	response["data"] = b

	render.JSON(w, r, response)
}

// func ping(service *Service) func(w http.ResponseWriter, r *http.Request) {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		response := make(map[string]string)
// 		response["message"] = "success!"

// 		newId, err := service.Generate()
// 		if err != nil {
// 			log.Printf("Error occured, %s", err)
// 			render.JSON(w, r, response)
// 		}
// 		b := newId.(primitive.ObjectID)

// 		log.Println(b)

// 		render.JSON(w, r, response)
// 	}
// }
