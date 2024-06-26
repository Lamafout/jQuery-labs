package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/rs/cors"
)

type Data struct {
	Height string `json:"height"`
	Sex    string `json:"sex"`
}

type Response struct {
	Weight string `json:"weight"`
}

func main() {
	// Обработчик для корневого пути
	http.Handle("/", http.FileServer(http.Dir("./static")))

	// Обработчик для /backend/a3.go
	http.HandleFunc("/backend/a3.go", handleFunc)

	// Настройка CORS
	handler := cors.Default().Handler(http.DefaultServeMux)

	http.ListenAndServe(":8080", handler)
}

func handleFunc(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Received request:", r.URL.Path)

	if r.Method == http.MethodPost {
		var data Data
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		height, err := strconv.ParseFloat(data.Height, 64)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var idealWeight float64
		if data.Sex == "man" {
			idealWeight = (4*height/2.54 - 128) * 0.453 // формула для мужчин
		} else {
			idealWeight = (3.5*height/2.54 - 108) * 0.453 // формула для женщин
		}

		res := Response{
			Weight: fmt.Sprintf("%.2f", idealWeight),
		}

		json.NewEncoder(w).Encode(res)
	}
}
