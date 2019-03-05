package main

import (
	"log"
	"net/http"

	"keys/key"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/render"
)

func routes() *chi.Mux {
	router := chi.NewRouter()

	router.Use(render.SetContentType(render.ContentTypeJSON),
		middleware.Logger,
		middleware.DefaultCompress,
		middleware.RedirectSlashes,
		middleware.Recoverer)

	router.Route("/api", func(r chi.Router) {
		r.Mount("/keys", key.Routes())
	})

	return router
}

// CreateRouter creates a new router with generic middlewares
func CreateRouter() *chi.Mux {
	router := routes()

	walkFunc := func(method string, route string, handler http.Handler, middlewares ...func(http.Handler) http.Handler) error {
		log.Printf("%s %s\n", method, route)
		return nil
	}

	if err := chi.Walk(router, walkFunc); err != nil {
		log.Panicf("Logging err: %s\n", err.Error())
	}

	return router
}
