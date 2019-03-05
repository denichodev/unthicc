package main

import (
	"context"
	"log"
	"net/http"

	"keys/config"
	"keys/key"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/mongo"
)

func setupConfig() {
	viper.SetConfigName("config")
	viper.AddConfigPath(".")
	viper.AddConfigPath("./config/keys")
	var configuration config.Configuration

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading from config file, %s", err)
	}

	if err := viper.Unmarshal(&configuration); err != nil {
		log.Fatalf("Unable to decode to struct, %s", err)
	}
}

func newMongoClient() *mongo.Client {
	client, err := mongo.Connect(context.TODO(), "mongodb://root:example@mongo:27017")
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	return client
}

func main() {
	setupConfig()

	client := newMongoClient()

	router := chi.NewRouter()
	router.Use(render.SetContentType(render.ContentTypeJSON),
		middleware.Logger,
		middleware.DefaultCompress,
		middleware.RedirectSlashes,
		middleware.Recoverer)
	router.Route("/api", func(r chi.Router) {
		keyRepo := key.NewKeyMongoRepository(client)
		keyService := key.NewService(keyRepo)
		r.Mount("/keys", key.Routes(keyService))
	})
	walkFunc := func(method string, route string, handler http.Handler, middlewares ...func(http.Handler) http.Handler) error {
		log.Printf("%s %s\n", method, route)
		return nil
	}
	if err := chi.Walk(router, walkFunc); err != nil {
		log.Panicf("Logging err: %s\n", err.Error())
	}

	Port := viper.GetString("server.port")
	log.Fatal(http.ListenAndServe(":"+Port, router))
}
