package main

import (
	_ "context"
	_ "fmt"

	_ "github.com/anthdm/hollywood/actor"
)

//go:wasmexport add
func add(a int32, b int32) int32 {
	return a + b
}

func main() {}
