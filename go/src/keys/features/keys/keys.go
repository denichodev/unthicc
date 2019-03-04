package keys

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/render"
)

// Routes for all keys feature
func Routes() *chi.Mux {
	router := chi.NewRouter()

	router.Get("/ping", ping)

	return router
}

func ping(w http.ResponseWriter, r *http.Request) {
	response := make(map[string]string)
	response["message"] = "success!"

	render.JSON(w, r, response)
}
