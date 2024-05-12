package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func makeRequest(url string) (string, error) {
	response, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return "", err
	}

	return string(body), nil
}

func search(term string) error {
	searchURL := fmt.Sprintf("https://www.google.md/search?q=%s", term)
	response, err := http.Get(searchURL)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	doc, err := goquery.NewDocumentFromReader(response.Body)
	if err != nil {
		return err
	}

	// Extract top 10 results and print them
	doc.Find("a").Each(func(i int, s *goquery.Selection) {
		if i >= 16 && i < 26 {
			fmt.Printf("%d. %s - %s\n", i-15, strings.TrimSpace(s.Text()), s.AttrOr("href", ""))
		}
	})

	return nil
}

func main() {
	urlPtr := flag.String("u", "", "Make an HTTP request to the specified URL")
	searchPtr := flag.String("s", "", "Make an HTTP request to search the term using your favorite search engine")
	flag.Parse()

	if *urlPtr == "" && *searchPtr == "" {
		flag.PrintDefaults()
		return
	}

	if *urlPtr != "" {
		response, err := makeRequest(*urlPtr)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println(response)
	} else if *searchPtr != "" {
		err := search(*searchPtr)
		if err != nil {
			log.Fatal(err)
		}
	}
}
