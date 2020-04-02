package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gorilla/mux"
)

type space struct {
	Key  string `json:"key"`
	Name string `json:"name"`
}

var s = space{
	Key:  "Planet",
	Name: "Earth",
}

func main() {
	// var x = "Hello from foo and from bar"
	// var y = 6
	// f := foo(y, x)
	// fmt.Println(f)

	router := mux.NewRouter()

	router.HandleFunc("/planet", post).Methods("POST")
	router.HandleFunc("/planet", get).Methods("GET")

	srv := &http.Server{
		Handler: router,
		Addr:    ":80",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Println("Starting server at port 80")
	log.Fatal(srv.ListenAndServe())

}

func foo(y int, x string) string {

	f := strings.Fields(x)
	var z string
	for i, v := range f {
		if i == y-1 {
			return v
		}

	}
	return z
}

func post(w http.ResponseWriter, r *http.Request) {

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatalln(err)
		return
	}

	err = json.Unmarshal(body, &s)
	if err != nil {
		log.Fatalln(err)
	}

}

func get(w http.ResponseWriter, r *http.Request) {

	body, err := json.Marshal(s)
	if err != nil {
		log.Fatalln(err)
	}

	_, err = w.Write(body)
	if err != nil {
		log.Fatalln(err)
	}

	req, err := http.NewRequest("GET", "http://localhost:80/planet", nil)
	if err != nil {
		log.Fatalln(err)
	}

	client := &http.Client{}

	resp, err := client.Do(req)
	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode == 200 {
		log.Println("Status code 200")

	}

}
