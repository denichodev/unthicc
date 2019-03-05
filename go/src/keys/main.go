package main

import (
	"log"
	"net/http"

	"keys/config"

	"github.com/spf13/viper"
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

func main() {
	setupConfig()

	router := CreateRouter()

	Port := viper.GetString("server.port")
	log.Fatal(http.ListenAndServe(":"+Port, router))
}
